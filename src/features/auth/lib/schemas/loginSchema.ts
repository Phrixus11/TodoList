import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email({ error: 'Incorrect email address' }),
  password: z.string().min(3, { error: 'Password must be at least 3 characters long' }),
  rememberMe: z.boolean(),
})

export type loginInputs = z.infer<typeof loginSchema>