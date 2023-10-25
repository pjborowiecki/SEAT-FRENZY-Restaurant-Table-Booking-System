"use client"

/**
 * Been using this page to test server actions and validations :')
 */
import { MouseEventHandler, useState } from "react"
import * as cuisineActions from "@/actions/cuisine"
import * as tagActions from "@/actions/tag"
import * as venueActions from "@/actions/venue"
import * as venueTimeActions from "@/actions/venue-time"
import { string } from "zod"

interface AboutPageProps {}

interface CustomButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  label: string
}
const CustomButton = ({ onClick, label }: CustomButtonProps) => (
  <button
    onClick={onClick}
    className="m-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  >
    {label}
  </button>
)

const testVenue = 11

export default function About({}: AboutPageProps) {
  const [output, setOutput] = useState<string | null>(null)

  const addOutput = (message: string) => {
    setOutput(message)
  }

  const addValidVenue = async () => {
    const validInput: venueActions.VenueType = {
      name: "Valid Venue",
      email: "valid@email.com",
      phone: "+441234567890",
      description: "This is a valid description.",
      images: null,
    }
    await venueActions.addVenueAction(validInput)
  }
  const addInvalidVenue = async () => {
    const validInput: venueActions.VenueType = {
      name: "Valid Venue",
      email: "validemail.com",
      phone: "+441234567890",
      description: "This is a valid description.",
      images: null,
    }
    await venueActions.addVenueAction(validInput)
  }
  const getValidVenue = async () => {
    addOutput(await venueActions.getVenueAction(testVenue))
  }
  const getInvalidVenue = async () => {
    const venueId = 100
    addOutput(await venueActions.getVenueAction(venueId))
  }
  const getAllVenues = async () => {
    const result = await venueActions.getAllVenuesAction()
    addOutput(`Count: ${result[1]}`)
  }
  const updateValidDescription = async () => {
    const validInput: venueActions.VenueDescriptionType = "New description"
    addOutput(await venueActions.setDescriptionAction(testVenue, validInput))
  }
  const updateInvalidDescription = async () => {
    const validInput: venueActions.VenueDescriptionType = ""
    addOutput(await venueActions.setDescriptionAction(testVenue, validInput))
  }
  const deleteValidVenue = async () => {
    addOutput(await venueActions.deleteVenueAction(testVenue))
  }
  const deleteInvalidVenue = async () => {
    const venueId = 100
    addOutput(await venueActions.deleteVenueAction(venueId))
  }

  const addValidCuisine = async () => {
    const validInput: cuisineActions.CuisineType = {
      name: "Valid Cuisine",
    }
    addOutput(await cuisineActions.addCuisineAction(validInput))
  }

  const addValidTag = async () => {
    const validInput: tagActions.TagType = {
      name: "Valid Tag",
    }
    addOutput(await tagActions.addTagAction(validInput))
  }

  const addValidVenueTime = async () => {
    const validInput: venueTimeActions.VenueTimeType = {
      venueId: 100,
      day: "Monday",
      openingTime: "01:10:00",
      closingTime: "23:01:52",
    }
    addOutput(await venueTimeActions.addVenueTimeAction(validInput))
  }

  const deleteValidVenueTime = async () => {
    addOutput(await venueTimeActions.deleteVenueTimeAction(1))
  }

  return (
    <div>
      <div>
        <CustomButton onClick={addValidVenue} label="Add valid venue" />
      </div>
      <div>
        <CustomButton onClick={addInvalidVenue} label="Add invalid venue" />
      </div>
      <div>
        <CustomButton onClick={getValidVenue} label="Get valid venue" />
      </div>
      <div>
        <CustomButton onClick={getInvalidVenue} label="Get invalid venue" />
      </div>
      <div>
        <CustomButton onClick={getAllVenues} label="Get all venues" />
      </div>
      <div>
        <CustomButton
          onClick={updateValidDescription}
          label="Update valid description"
        />
      </div>
      <div>
        <CustomButton
          onClick={updateInvalidDescription}
          label="Update invalid description"
        />
      </div>
      <div>
        <CustomButton onClick={deleteValidVenue} label="Delete valid venue" />
      </div>
      <div>
        <CustomButton
          onClick={deleteInvalidVenue}
          label="Delete invalid venue"
        />
      </div>
      <div>
        <CustomButton onClick={addValidCuisine} label="Add valid cuisine" />
      </div>
      <div>
        <CustomButton onClick={addValidTag} label="Add valid tag" />
      </div>
      <div>
        <CustomButton
          onClick={addValidVenueTime}
          label="Add valid venue time"
        />
      </div>
      <div>
        <CustomButton
          onClick={deleteValidVenueTime}
          label="Delete valid venue time"
        />
      </div>
      <div className="mt-4 border p-4">{output}</div>
    </div>
  )
}
