import { headers } from "next/headers"
import { db } from "@/db"
import { users } from "@/db/schema"
import { env } from "@/env.mjs"
import { clerkClient } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"
import { eq } from "drizzle-orm"
import { Webhook } from "svix"

interface Event {
  data: UserInterface
  object: "event"
  type: EventType
}

type EventType = "user.created" | "user.updated" | "user.deleted" | "*"

// these keys are not returned by the webhooks.
type UnwantedKeys =
  | "emailAddresses"
  | "firstName"
  | "lastName"
  | "primaryEmailAddressId"
  | "primaryPhoneNumberId"
  | "phoneNumbers"

// Object with data returned from webhook. Can verify this in Clerk dashboard webhook logs.
interface UserInterface extends Omit<User, UnwantedKeys> {
  email_addresses: {
    email_address: string
    id: string
  }[]
  username: string
  primary_email_address_id: string
  first_name: string | null
  last_name: string | null
  image_url: string
}

// export const runtime = "edge"

export async function POST(req: Request) {
  const payload = await req.json()

  console.log("payload", payload)

  const payloadString = JSON.stringify(payload)
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixIdTimeStamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId)
    console.log("svixIdTimeStamp", svixIdTimeStamp)
    console.log("svixSignature", svixSignature)
    return new Response("Error occured", {
      status: 400,
    })
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  }

  const wh = new Webhook(env.SVIX_AUTHTOKEN)
  let evt: Event | null = null

  try {
    evt = wh.verify(payloadString, svixHeaders) as Event
  } catch (_) {
    console.log("error")
    return new Response("Error occured", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType: EventType = evt.type

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      username,
      email_addresses,
      primary_email_address_id,
      first_name: firstName,
      last_name: lastName,
    } = evt.data

    const emailObject = email_addresses?.find((email) => {
      return email.id === primary_email_address_id
    })

    if (!emailObject) {
      return new Response("Error locating user", {
        status: 400,
      })
    }

    const primaryEmail = emailObject.email_address

    const exists = await db.query.users.findFirst({
      where: eq(users.clerkId, id),
    })

    // If the user already exists in the database, we only update it.
    if (!!exists) {
      await db
        .update(users)
        .set({
          firstName,
          lastName,
          username,
          email: primaryEmail,
        })
        .where(eq(users.clerkId, id))
    } else {
      // if there is no user in the db, create one.
      await db.insert(users).values({
        clerkId: id,
        username,
        email: primaryEmail,
        firstName,
        lastName,
      })

      const createdUser = await db.query.users.findFirst({
        where: eq(users.clerkId, id),
      })

      /**
       * After a user is created in the database, we get the database id
       * and assign it to the clerk user object's metadata, so we can easily
       * access it anywhere.
       */
      if (createdUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            databaseId: createdUser.id,
          },
        })
      }
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data

    await db.delete(users).where(eq(users.clerkId, id))
  }

  return new Response("", {
    status: 201,
  })
}
