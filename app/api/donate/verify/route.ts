import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const CF_BASE = 'https://api.cashfree.com/pg'
const CF_VER  = '2023-08-01'

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('order_id')
  if (!orderId) {
    return NextResponse.json({ error: 'order_id required' }, { status: 400 })
  }

  try {
    const response = await fetch(`${CF_BASE}/orders/${orderId}`, {
      headers: {
        'x-client-id':     process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version':   CF_VER,
      },
    })
    const data = await response.json()
    return NextResponse.json({ order_status: data.order_status })
  } catch (err) {
    console.error('[donate verify]', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
