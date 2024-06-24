import express, { Express } from 'express'

import dotenv from 'dotenv'
import { auth } from 'express-oauth2-jwt-bearer'
import { handleUser } from './middleware/handleUser'
import routes from './routes'

dotenv.config()

// Auth0 configuration
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
})

const app: Express = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' })
})

app.use('/api', jwtCheck, handleUser, routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
