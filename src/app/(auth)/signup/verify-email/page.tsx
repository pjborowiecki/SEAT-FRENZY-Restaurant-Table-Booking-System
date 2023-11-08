import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getUserByEmailVerificationTokenAction } from "@/actions/user"
import { db } from "@/db"
import { users } from "@/db/schemas/auth.schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Email Verification",
  description: "Verify your email address to continue",
}

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps): Promise<JSX.Element> {
  const emailVerificationToken = searchParams.token as string

  if (emailVerificationToken) {
    const user = await getUserByEmailVerificationTokenAction(
      emailVerificationToken
    )

    if (!user) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
          <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
            <CardHeader>
              <CardTitle>Invalid Email Verification Token</CardTitle>
              <CardDescription>
                Please return to the Sign Up page and try again
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                aria-label="Go back to sign in page"
                href="/signup"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                <Icons.arrowLeft className="mr-2 h-4 w-4" />
                <span className="sr-only">Try again</span>
                Try again
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }

    const updatedUserResponse = await db
      .update(users)
      .set({ emailVerified: new Date(), emailVerificationToken: null })
      .where(eq(users.emailVerificationToken, emailVerificationToken))

    if (!updatedUserResponse) redirect("/signup")

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Email successfully verified</CardTitle>
            <CardDescription>
              You can now sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Go back to sign in page"
              href="/signin"
              className={cn(buttonVariants(), "w-full")}
            >
              <span className="sr-only">Go to Sign In page</span>
              Go to Sign In page
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Missing Email Verification Token</CardTitle>
            <CardDescription>
              Please return to the sign up page and try again
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Go back to sign up page"
              href="/signup"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <Icons.arrowLeft className="mr-2 h-4 w-4" />
              <span className="sr-only">Try again</span>
              Try again
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
