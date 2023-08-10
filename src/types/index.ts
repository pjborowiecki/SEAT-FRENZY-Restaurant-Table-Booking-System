import type { FileWithPath } from "react-dropzone"

export interface StoredFile {
  id: string
  name: string
  url: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}
