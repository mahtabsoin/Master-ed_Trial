'use server'

import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  if (!name || !email || !password || !role) {
    return { error: 'All fields are required' }
  }

  try {
    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as 'STUDENT' | 'TEACHER',
      },
    })

    console.log('User created:', user)

    return { success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    return { error: 'An error occurred while creating your account' }
  }
}