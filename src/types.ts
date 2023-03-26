import { z } from 'zod'

export const resultSchema = z.object({
  pageid: z.string(),
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

export type Result = z.infer<typeof resultSchema>

export const searchResultSchema = z.object({
  query: z
    .object({
      pages: z.array(resultSchema).optional()
    })
    .optional()
})

export type SearchResult = z.infer<typeof searchResultSchema>
