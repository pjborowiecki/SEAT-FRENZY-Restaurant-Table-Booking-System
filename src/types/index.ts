import { type userPrivateMetadataSchema } from "@/validations/auth"
import type { FileWithPath } from "react-dropzone"
import type { z } from "zod"

import type { Icons } from "@/components/icons"

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export interface StoredFile {
  id: string
  name: string
  url: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}
