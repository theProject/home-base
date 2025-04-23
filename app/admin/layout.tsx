import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-black dark:text-white hover:text-magenta">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Link>
            <h1 className="text-xl font-bold text-black dark:text-white">Admin Dashboard</h1>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
