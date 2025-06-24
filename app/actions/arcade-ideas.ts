"use server"

import { z } from "zod"

const arcadeIdeaSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
  idea: z
    .string()
    .min(10, { message: "Your idea should be at least 10 characters long." })
    .max(500, { message: "Idea cannot exceed 500 characters." }),
})

export interface ArcadeIdeaFormState {
  message: string
  success: boolean
  errors?: {
    name?: string[]
    email?: string[]
    idea?: string[]
  }
  timestamp?: number // To help React re-render on new submissions
}

export async function submitArcadeIdea(
  prevState: ArcadeIdeaFormState,
  formData: FormData,
): Promise<ArcadeIdeaFormState> {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    idea: formData.get("idea") as string,
  }

  const validatedFields = arcadeIdeaSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      message: "Oops! Please check your input.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    }
  }

  // In a real application, you would save this to a database or send an email.
  // For example, using your existing email service:
  // await sendAdminNotification('Arcade Idea Submission', validatedFields.data.email || 'N/A', 'New Game Idea', validatedFields.data.idea);
  console.log("Arcade Idea Submitted:", validatedFields.data)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    message: "Thanks for your awesome idea! We'll beam it to our dev team.",
    success: true,
    timestamp: Date.now(),
  }
}
