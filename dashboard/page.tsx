import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Welcome to Master-ed, {session.user.name}!</h1>
      {session.user.role === 'teacher' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Teacher Dashboard</h2>
          <ul className="list-disc pl-5">
            <li>Set up custom AI environments</li>
            <li>Manage students</li>
            <li>Customize controls</li>
            <li>Analyze student interactions</li>
            <li>Upload scoring rubrics</li>
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Student Dashboard</h2>
          <ul className="list-disc pl-5">
            <li>Access lecture assistance tools</li>
            <li>Create and manage notes</li>
            <li>Track your progress</li>
            <li>Access study plans</li>
            <li>Seek help from professors or peers</li>
          </ul>
        </div>
      )}
    </div>
  )
}