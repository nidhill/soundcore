import { NextResponse } from 'next/server'
import clientPromise, { DB_NAME, CAMPAIGN_COLLECTION } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

const TARGET = 7100

export async function GET() {
  try {
    const client = await clientPromise
    const db     = client.db(DB_NAME)
    const col    = db.collection(CAMPAIGN_COLLECTION)

    // Upsert: initialise the doc if it doesn't exist yet
    const result = await col.findOneAndUpdate(
      { id: 1 },
      {
        $setOnInsert: {
          id:             1,
          current_amount: 0,
          target_amount:  TARGET,
          updated_at:     new Date(),
        },
      },
      { upsert: true, returnDocument: 'after' },
    )

    const doc = result ?? { current_amount: 0, target_amount: TARGET }

    return NextResponse.json({
      current_amount: Number(doc.current_amount ?? 0),
      target_amount:  Number(doc.target_amount  ?? TARGET),
    })
  } catch (err) {
    console.error('[campaign GET]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
