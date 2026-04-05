import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import campaignRouter from './routes/campaign'
import reviewsRouter from './routes/reviews'
import donateRouter from './routes/donate'
import verifyPaymentRouter from './routes/verifyPayment'
import supportersRouter from './routes/supporters'

const app = express()
const PORT = process.env.PORT || 4000

const FRONTEND = (process.env.FRONTEND_URL || '').replace(/\/$/, '')

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true
  if (!FRONTEND && process.env.NODE_ENV !== 'production') return true
  if (origin === FRONTEND) return true
  if (origin === 'https://www.soundcore.social') return true
  if (origin === 'https://soundcore.social') return true
  if (/^https:\/\/[a-z0-9-]+-nidhills-projects\.vercel\.app$/.test(origin)) return true
  if (origin === 'http://localhost:3000') return true
  return false
}

app.use(cors({
  origin: (origin, cb) => isAllowedOrigin(origin) ? cb(null, true) : cb(new Error('CORS blocked')),
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))
app.use(express.json({ limit: '4mb' }))

app.use('/api/campaign', campaignRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/donate', donateRouter)
app.use('/api/verify-payment', verifyPaymentRouter)
app.use('/api/supporters', supportersRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
