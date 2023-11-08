import * as React from "react"
import { env } from "@/env.mjs"
import { Body } from "@react-email/body"
import { Button } from "@react-email/button"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Html } from "@react-email/html"
import { Preview } from "@react-email/preview"
import { Section } from "@react-email/section"
import { Tailwind } from "@react-email/tailwind"
import { Text } from "@react-email/text"

import { siteConfig } from "@/config/site"

interface ResetPasswordEmailProps {
  email: string
  resetPasswordToken: string
}

export function ResetPasswordEmail({
  email,
  resetPasswordToken,
}: Readonly<ResetPasswordEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} password reset.`

  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hi,</Text>
              <Text className="text-base">
                Someone just requested a password change for your{" "}
                {siteConfig.name}
                account associated with {email}.
              </Text>
              <Text className="text-base">
                If this was you, you can set a new password here:
              </Text>
              <Button
                href={`${env.NEXT_PUBLIC_APP_URL}/signin/password-update?token=${resetPasswordToken}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-8 font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Set new password
              </Button>
            </Section>
            <Section>
              <Text className="text-xs">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-xs">
                To keep your account secure, please don&apos;t forward this
                email to anyone.
              </Text>
            </Section>
            <Section>
              <Text className="text-base font-medium">
                Enjoy{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.name}
                </span>{" "}
                and have a nice day!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
