// pages/api/environments/create.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, baseModel, customTraining, hintControl, learningAids, teacherId } = req.body
      const environment = await prisma.aIEnvironment.create({
        data: {
          name,
          baseModel,
          customTraining,
          hintControl,
          learningAids,
          teacher: { connect: { id: teacherId } }
        }
      })
      res.status(201).json(environment)
    } catch (error) {
      res.status(500).json({ error: 'Unable to create environment' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}