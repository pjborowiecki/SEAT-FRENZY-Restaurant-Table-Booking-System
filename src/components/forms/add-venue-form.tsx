"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { addVenueAction } from "@/actions/venue"
import { venues } from "@/db/schema"
import type { FileWithPreview } from "@/types"
import { venueSchema } from "@/validations/venue"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError, isArrayOfFile } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileDialog } from "@/components/file-dialog"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

interface AddVenueFormProps {}

type Inputs = z.infer<typeof venueSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function AddVenueForm({}: AddVenueFormProps): JSX.Element {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const { isUploading, startUpload } = useUploadThing("venueImage")

  const form = useForm<Inputs>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: "",
      description: "",
      openTime: "18:00:00.000Z",
      closeTime: "23:00:00.000Z",
      priciness: "regular",
      locationId: 1,
      cuisineId: 1,
    },
  })

  const previews = form.watch("images") as FileWithPreview[] | null

  function onSubmit(data: Inputs): void {
    startTransition(async () => {
      try {
        const images = isArrayOfFile(data.images)
          ? await startUpload(data.images).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.fileKey,
                name: image.fileKey.split("_")[1] ?? image.fileKey,
                url: image.fileUrl,
              }))
              return formattedImages ?? null
            })
          : null

        await addVenueAction({ ...data, images })

        toast.success("Congrats! Venue added successfully")

        form.reset()
        setFiles(null)
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {/* Name */}
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Venue name..."
              {...form.register("name")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>

        {/* Description */}
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Venue description..."
              {...form.register("description")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.description?.message}
          />
        </FormItem>

        {/* OpenTime */}
        <FormField
          control={form.control}
          name="openTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Open Time</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(venues.openTime.enumValues).map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CloseTime */}
        <FormField
          control={form.control}
          name="closeTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Close Time</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(venues.closeTime.enumValues).map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priciness */}
        <FormField
          control={form.control}
          name="priciness"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Priciness</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(venues.priciness.enumValues).map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location ID */}
        <FormItem className="w-full">
          <FormLabel>Location ID</FormLabel>
          <FormControl>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Location Id..."
              {...form.register("locationId", {
                valueAsNumber: true,
              })}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.locationId?.message}
          />
        </FormItem>

        {/* Cuisine ID */}
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Venue name..."
              {...form.register("cuisineId")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>

        {/* Images */}
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {!isUploading && previews?.length ? (
            <div className="flex items-center gap-2">
              {previews.map((file) => (
                <Zoom key={file.name}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>

        {/* Submit button */}
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Venue
          <span className="sr-only">Add Venue</span>
        </Button>
      </form>
    </Form>
  )
}
