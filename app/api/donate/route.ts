import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const CF_BASE  = 'https://api.cashfree.com/pg'
const CF_VER   = '2023-08-01'

/* ── POST — create a Cashfree order and return payment_session_id ─────── */
export async function POST(req: NextRequest) {
  try {
    const { amount, name, email, phone } = await req.json()

    /* Validation */
    if (!amount || isNaN(Number(amount)) || Number(amount) < 1) {
      return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 })
    }
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: 'Name, email and phone are required.' },
        { status: 400 },
      )
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json(
        { error: 'Enter a valid 10-digit mobile number.' },
        { status: 400 },
      )
    }

    const orderId   = `protest-${Date.now()}`
    // Cashfree requires HTTPS — replace http:// regardless of env
    const siteUrl   = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
                        .replace(/^http:\/\//, 'https://')
    const returnUrl = `${siteUrl}/payment/result?order_id={order_id}`

    const payload = {
      order_id:       orderId,
      order_amount:   Number(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id:    `cust_${Date.now()}`,
        customer_name:  name.trim().slice(0, 100),
        customer_email: email.trim(),
        customer_phone: phone.trim(),
      },
      order_meta: {
        return_url:  returnUrl,
        notify_url:  `${siteUrl}/api/donate/webhook`,  // optional: set in Cashfree dashboard too
      },
      order_note: 'Q30 Protest — Community Support',
    }

    const response = await fetch(`${CF_BASE}/orders`, {
      method:  'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-client-id':     process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version':   CF_VER,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[donate POST] Cashfree error:', data)
      return NextResponse.json(
        { error: data?.message || 'Could not create payment order.' },
        { status: response.status },
      )
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id:           data.order_id,
    })
  } catch (err) {
    console.error('[donate POST]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
