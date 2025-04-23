"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

type Contact = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/contacts")
        if (!response.ok) {
          throw new Error("Failed to fetch contacts")
        }
        const data = await response.json()
        setContacts(data)
      } catch (err) {
        console.error("Error fetching contacts:", err)
        setError("Failed to load contact submissions. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Contact Form Submissions</h1>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md mb-6 text-red-800 dark:text-red-400">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="h-8 w-8 border-4 border-magenta border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">No contact submissions yet.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left text-black dark:text-white">ID</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Name</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Email</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Subject</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Date</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-black dark:text-white">{contact.id}</td>
                    <td className="py-3 px-4 text-black dark:text-white">{contact.name}</td>
                    <td className="py-3 px-4 text-black dark:text-white">{contact.email}</td>
                    <td className="py-3 px-4 text-black dark:text-white">{contact.subject}</td>
                    <td className="py-3 px-4 text-black dark:text-white">
                      {format(new Date(contact.created_at), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-magenta hover:underline" onClick={() => setSelectedContact(contact)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedContact && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Message Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                    <p className="text-black dark:text-white">
                      {selectedContact.name} ({selectedContact.email})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Subject</p>
                    <p className="text-black dark:text-white">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-black dark:text-white">
                      {format(new Date(selectedContact.created_at), "MMMM d, yyyy h:mm a")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Message</p>
                    <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-black dark:text-white">
                      {selectedContact.message}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-magenta text-white rounded-md hover:bg-magenta/90"
                    onClick={() => setSelectedContact(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
