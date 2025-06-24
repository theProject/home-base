"use client"

import { useActionState, useEffect, useRef } from "react"
import { submitArcadeIdea, type ArcadeIdeaFormState } from "@/actions/arcade-ideas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Send } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export function ArcadeContactForm() {
  const initialState: ArcadeIdeaFormState = { message: "", success: false }
  const [state, formAction, isPending] = useActionState(submitArcadeIdea, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.timestamp) {
      // Check if state has been updated
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset()
      } else if (state.message && state.errors) {
        // Only show general error if field errors exist
        toast.error(state.message)
      } else if (state.message) {
        // For non-validation errors from server
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <form
        action={formAction}
        ref={formRef}
        className="space-y-6 p-6 md:p-8 rounded-xl synthwave-form-bg border border-primary/30 shadow-xl shadow-primary/10"
      >
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-primary-foreground/80 mb-1">
            Your Name (Optional)
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Galactic Gamer"
            className="synthwave-input"
            aria-describedby="name-error"
          />
          {state.errors?.name && (
            <p id="name-error" className="mt-1 text-xs text-red-400">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-primary-foreground/80 mb-1">
            Email (Optional, for updates)
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="synthwave-input"
            aria-describedby="email-error"
          />
          {state.errors?.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="idea" className="block text-sm font-medium text-primary-foreground/80 mb-1">
            Your Awesome Game Idea!
          </Label>
          <Textarea
            id="idea"
            name="idea"
            rows={4}
            placeholder="Describe your dream mini-game or AI feature..."
            required
            className="synthwave-input"
            aria-describedby="idea-error"
          />
          {state.errors?.idea && (
            <p id="idea-error" className="mt-1 text-xs text-red-400">
              {state.errors.idea[0]}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full synthwave-button group">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
          {isPending ? "Sending to the Future..." : "Launch Idea!"}
        </Button>
      </form>
    </>
  )
}
