'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from './actions'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await signUp(formData)

    setIsLoading(false)

    if ('error' in response) {
      alert(response.error)
      return
    }

    alert("Your account has been created.")
    router.push('/login')
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6">Sign Up for Master-ed</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" name="name" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input id="password" name="password" type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <div className="mt-2">
            <div className="flex items-center">
              <input id="student" name="role" type="radio" value="STUDENT" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="student" className="ml-3 block text-sm font-medium text-gray-700">Student</label>
            </div>
            <div className="flex items-center mt-2">
              <input id="teacher" name="role" type="radio" value="TEACHER" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="teacher" className="ml-3 block text-sm font-medium text-gray-700">Teacher</label>
            </div>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  )
}