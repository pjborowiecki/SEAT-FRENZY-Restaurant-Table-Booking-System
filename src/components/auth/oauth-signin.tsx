"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", icon: "google" },
  { name: "Facebook", icon: "facebook" },
] satisfies {
  name: string
  icon: keyof typeof Icons
}[]

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key="oAuthSignIn"
            variant="outline"
            className="w-full bg-background sm:w-auto"
            disabled={isLoading !== null}
          >
            {isLoading === true ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
