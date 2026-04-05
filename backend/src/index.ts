import 'dotenv/config'
import express    from 'express'
import cors       from 'cors'
import campaignRouter from './routes/campaign'
import reviewsRouter  from './routes/reviews'
import donateRouter   from './routes/donate'

const app  = express()
const PORT = process.env.PORT || 4000

/* ── Middleware ─────────────────────────────────────────────────────────── */
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}))
app.use(express.json({ limit: '4mb' })) // allow base64 images up to ~3MB

/* ── Routes ─────────────────────────────────────────────────────────────── */
app.use('/api/campaign', campaignRouter)
app.use('/api/reviews',  reviewsRouter)
app.use('/api/donate',   donateRouter)

/* ── Health check ───────────────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})
