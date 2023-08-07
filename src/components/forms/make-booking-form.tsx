"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { bookingSchema } from "@/lib/validations/booking"
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
import { Icons } from "@/components/icons"

// type Inputs = z.infer<typeof bookingSchema>

export function MakeBookingForm() {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm({
    // resolver: zodResolver(bookingSchema),
    defaultValues: {
      size: "1 person",
      date: "7 Aug",
      time: "7:00 PM",
    },
  })

  function onSubmit() {}

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Name */}
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.name}
                placeholder="John"
                {...form.register("name")}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.name?.message}
            />
          </FormItem>

          {/* Surname */}
          <FormItem>
            <FormLabel>Surname</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.surname}
                placeholder="Smith"
                {...form.register("surname")}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.surname?.message}
            />
          </FormItem>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Phone */}
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.phone}
                placeholder="0746 116 414"
                {...form.register("phone")}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.phone?.message}
            />
          </FormItem>

          {/* Email */}
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.email}
                placeholder="johnsmith@gmail.com"
                {...form.register("email")}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.email?.message}
            />
          </FormItem>
        </div>

        {/* Party Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Party size</FormLabel>
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
                      {/* {Object.values(bookings.size.enumValues).map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))} */}
                      <SelectItem value="1 person" className="capitalize">
                        1 person
                      </SelectItem>
                      <SelectItem value=" people" className="capitalize">
                        2 people
                      </SelectItem>
                      <SelectItem value="3 people" className="capitalize">
                        3 people
                      </SelectItem>
                      <SelectItem value="4+ people" className="capitalize">
                        4+ people
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date</FormLabel>
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
                        {/* {Object.values(bookings.size.enumValues).map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))} */}
                        <SelectItem value="7 Aug" className="capitalize">
                          7 Aug 2023
                        </SelectItem>
                        <SelectItem value="8 Aug" className="capitalize">
                          8 Aug 2023
                        </SelectItem>
                        <SelectItem value="9 Aug" className="capitalize">
                          9 Aug 2023
                        </SelectItem>
                        <SelectItem value="10 Aug" className="capitalize">
                          10 Aug 2023
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Time</FormLabel>
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
                        {/* {Object.values(bookings.size.enumValues).map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))} */}
                        <SelectItem value="7:00 PM" className="capitalize">
                          7:00 PM
                        </SelectItem>
                        <SelectItem value=" 8:00 PM" className="capitalize">
                          8:00 PM
                        </SelectItem>
                        <SelectItem value="9:00 PM" className="capitalize">
                          9:00 PM
                        </SelectItem>
                        <SelectItem value="9:30 PM" className="capitalize">
                          9:30 PM
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Button */}

        <Button className="mt-2" size="lg" disabled={isPending}>
          {isPending && (
            <Icons.spinner className="mr-2 h-4 w-4" aria-hidden="true" />
          )}
          Make a booking
          <span className="sr-only">Make a booking</span>
        </Button>
      </form>
    </Form>
  )
}
