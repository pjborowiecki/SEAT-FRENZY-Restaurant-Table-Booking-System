import type { IncomingHttpHeaders } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import { headers } from "next/headers"
import { db } from "@/db"
import { users } from "@/db/schema"
import type { WebhookEvent } from "@clerk/nextjs/server"
import type { WebhookRequiredHeaders } from "svix"
import { Webhook } from "svix"

const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET || ""

export async function POST(req: NextApiRequest) {
  const payload = await req.json()
  const payloadString = JSON.stringify(payload)
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixIdTimeStamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response("Error occured", {
      status: 400,
    })
  }
  // Create an object of the headers
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  }
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent
  } catch (_) {
    console.log("error")
    return new Response("Error occured", {
      status: 400,
    })
  }
  const { id } = evt.data

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created") {
    console.log("id: ", id)
    console.log(`User ${id} was ${eventType}`)

    await db.insert(users).values({
      clerkId: id,
      username: evt.data.username,
      email: evt.data.email_addresses[0]?.email_address,
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
    })
  }

  if (eventType === "user.updated") {
    console.log(`User ${id} was ${eventType}`)
  }

  if (eventType === "user.deleted") {
  }

  return new Response("", {
    status: 201,
  })
}
