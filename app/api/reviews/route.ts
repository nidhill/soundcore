import { NextRequest, NextResponse } from 'next/server'
import clientPromise, { DB_NAME } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

const COL = 'reviews'

/* ── GET — fetch latest 30 approved reviews ─────────────────────────── */
export async function GET() {
  try {
    const client = await clientPromise
    const docs = await client
      .db(DB_NAME)
      .collection(COL)
      .find({})
      .sort({ created_at: -1 })
      .limit(30)
      .toArray()

    // Strip MongoDB _id (convert ObjectId → string)
    const reviews = docs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }))

    return NextResponse.json(reviews)
  } catch (err) {
    console.error('[reviews GET]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

/* ── POST — submit a new review ─────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, image } = body

    if (!name?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: 'Name and description are required.' },
        { status: 400 },
      )
    }

    // Reject images > ~2 MB (base64 ~2.7MB encoded)
    if (image && image.length > 2_800_000) {
      return NextResponse.json(
        { error: 'Image must be under 2 MB.' },
        { status: 400 },
      )
    }

    const doc = {
      name:        name.trim().slice(0, 100),
      description: description.trim().slice(0, 1200),
      image:       image ?? null,   // base64 data URL or null
      created_at:  new Date(),
    }

    const client = await clientPromise
    await client.db(DB_NAME).collection(COL).insertOne(doc)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[reviews POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
