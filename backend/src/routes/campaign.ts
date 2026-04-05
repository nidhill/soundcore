import { Router } from 'express'
import clientPromise, { DB_NAME, CAMPAIGN_COLLECTION } from '../lib/mongodb'

const router = Router()
const TARGET = 7100

router.get('/', async (_req, res) => {
  try {
    const client = await clientPromise
    const col = client.db(DB_NAME).collection(CAMPAIGN_COLLECTION)

    const result = await col.findOneAndUpdate(
      { id: 1 },
      {
        $setOnInsert: {
          id: 1,
          current_amount: 0,
          target_amount: TARGET,
          updated_at: new Date(),
        },
      },
      { upsert: true, returnDocument: 'after' },
    )

    const doc = result ?? { current_amount: 0, target_amount: TARGET }
    res.json({
      current_amount: Number(doc.current_amount ?? 0),
      target_amount: Number(doc.target_amount ?? TARGET),
    })
  } catch (err) {
    console.error('[campaign GET]', err)
    res.status(500).json({ error: 'Database error' })
  }
})

export default router
