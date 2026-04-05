import { Router } from 'express'
import clientPromise, { DB_NAME } from '../lib/mongodb'

const router = Router()

/* ── Helper: "Muhammad N." format ──────────────────────────────────────── */
function displayName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0]
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`
}

/* GET /api/supporters — last 20 verified payments (public, no email) */
router.get('/', async (_req, res) => {
  try {
    const client = await clientPromise
    const docs   = await client
      .db(DB_NAME)
      .collection('processed_payments')
      .find({})
      .sort({ processed_at: -1 })
      .limit(20)
      .toArray()

    res.json(
      docs.map(d => ({
        display_name:  displayName(String(d.name || 'Anonymous')),
        amount:        Number(d.amount),
        note:          d.note ? String(d.note).slice(0, 140) : null,
        processed_at:  d.processed_at,
      })),
    )
  } catch (err) {
    console.error('[supporters GET]', err)
    res.status(500).json({ error: 'Could not load supporters.' })
  }
})

export default router
