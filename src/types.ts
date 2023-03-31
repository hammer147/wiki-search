import { z } from 'zod'

export const pageSchema = z.object({
  pageid: z.number(),
  title: z.string(),
  extract: z.string(),
  thumbnail: z
    .object({
      source: z.string(),
      width: z.number(),
      height: z.number()
    })
    .optional()
})

export type Page = z.infer<typeof pageSchema>

export const searchResultSchema = z.object({
  query: z
    .object({
      pages: z.record(pageSchema).optional()
    })
    .optional()
})

export type SearchResult = z.infer<typeof searchResultSchema>
