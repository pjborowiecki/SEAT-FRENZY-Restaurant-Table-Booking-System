import { ErrorCard } from "@/components/error-card"
import { Shell } from "@/components/shells/shell"

export default function ProductNotFound(): JSX.Element {
  return (
    <Shell className="mt-20 max-w-md justify-center">
      <ErrorCard
        title="Venue not found"
        description="The Venue may have been deleted"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  )
}
