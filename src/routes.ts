import express from 'express'
import { getCategorizedApplicationsByUser } from './controllers'

const router = express.Router()

router.get('/users/:userId/applications', getCategorizedApplicationsByUser)

export default router
