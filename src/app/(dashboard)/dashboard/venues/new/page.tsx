import type { Metadata } from "next"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddVenueForm } from "@/components/forms/add-venue-form"
import { PageHeader } from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Venue",
  description: "Add a new venue",
}

export default function NewVenuePage(): JSX.Element {
  return (
    <Shell variant="sidebar">
      <PageHeader title="New Venue" description="Add a new venue" size="sm" />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add store</CardTitle>
          <CardDescription>Add a new store to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddVenueForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
