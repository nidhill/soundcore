import { Router } from 'express'
import clientPromise, { DB_NAME } from '../lib/mongodb'

const router = Router()
const COL    = 'reviews'

/* GET /api/reviews — latest 30 reviews */
router.get('/', async (_req, res) => {
  try {
    const client = await clientPromise
    const docs   = await client
      .db(DB_NAME)
      .collection(COL)
      .find({})
      .sort({ created_at: -1 })
      .limit(30)
      .toArray()

    const reviews = docs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }))

    res.json(reviews)
  } catch (err) {
    console.error('[reviews GET]', err)
    res.status(500).json({ error: 'Database error' })
  }
})

/* POST /api/reviews — submit a new review */
router.post('/', async (req, res) => {
  try {
    const { name, description, image } = req.body

    if (!name?.trim() || !description?.trim()) {
      res.status(400).json({ error: 'Name and description are required.' })
      return
    }

    if (image && image.length > 2_800_000) {
      res.status(400).json({ error: 'Image must be under 2 MB.' })
      return
    }

    const doc = {
      name:        name.trim().slice(0, 100),
      description: description.trim().slice(0, 1200),
      image:       image ?? null,
      created_at:  new Date(),
    }

    const client = await clientPromise
    await client.db(DB_NAME).collection(COL).insertOne(doc)

    res.status(201).json({ success: true })
  } catch (err) {
    console.error('[reviews POST]', err)
    res.status(500).json({ error: 'Database error' })
  }
})

export default router
