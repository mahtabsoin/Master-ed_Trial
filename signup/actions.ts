'use server'

import { hash } from 'bcryptjs'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const roleString = formData.get('role') as string

  if (!name || !email || !password || !roleString) {
    return { error: 'All fields are required' }
  }

  // Validate and convert role
  let userRole: Role
  if (roleString === 'STUDENT') {
    userRole = Role.STUDENT
  } else if (roleString === 'TEACHER') {
    userRole = Role.TEACHER
  } else {
    return { error: 'Invalid role' }
  }

  try {
    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
      },
    })

    console.log('User created:', user)

    return { success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    if (error instanceof Error && error.message.includes('Unique constraint failed on the fields: (`email`)')) {
      return { error: 'Email already in use' }
    }
    return { error: 'An error occurred while creating your account' }
  }
}