"use client"

import Image from "next/image"
import Link from "next/link"
import type { Venue } from "@prisma/client"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface VenueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  venue: Venue
  variant?: "default" | "alternative"
}

export function VenueCard({
  venue,
  variant = "default",
  className,
  ...props
}: VenueCardProps) {
  return variant === "default" ? (
    <Card
      className={cn(
        "h-auto w-[256px] overflow-hidden rounded-sm border",
        className
      )}
      {...props}
    >
      <Link
        aria-label={`View ${venue.name} details`}
        href={`/venue/{venue.slug}`}
      >
        <CardHeader className="p-0">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={venue.main_image}
              alt={`${venue.name} main promo image`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
              fill
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col gap-4">
          <CardTitle className="font-bold">{venue.name}</CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <div className="flex gap-3 font-medium">
              <p className="mt-[3px]">*****</p>
              <p>9 reviews</p>
            </div>

            <div className="flex gap-3">
              <p>Mediterranean</p>
              <p>$$$$</p>
              <p>Warsaw</p>
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="text-sm font-medium">
          Booked 3 times today
        </CardFooter>
      </Link>
    </Card>
  ) : (
    <p>Alternative Card</p>
  )
}
