import { Router } from 'express'

const router = Router()
const CF_BASE = 'https://api.cashfree.com/pg'
const CF_VER = '2023-08-01'

router.post('/', async (req, res) => {
  try {
    const { amount, name, email, phone } = req.body

    if (!amount || isNaN(Number(amount)) || Number(amount) < 1) {
      res.status(400).json({ error: 'Invalid amount.' }); return
    }
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      res.status(400).json({ error: 'Name, email and phone are required.' }); return
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      res.status(400).json({ error: 'Enter a valid 10-digit mobile number.' }); return
    }

    const orderId = `protest-${Date.now()}`
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/^http:\/\//, 'https://')
    const returnUrl = `${frontendUrl.replace(/\/$/, '')}/payment/result?order_id={order_id}`

    const payload = {
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: name.trim().slice(0, 100),
        customer_email: email.trim(),
        customer_phone: phone.trim(),
      },
      order_meta: {
        return_url: returnUrl,
      },
      order_note: 'Q30 Protest — Community Support',
    }

    const response = await fetch(`${CF_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': CF_VER,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json() as { payment_session_id?: string; order_id?: string; message?: string }

    if (!response.ok) {
      console.error('[donate POST] Cashfree error:', data)
      res.status(response.status).json({ error: data?.message || 'Could not create payment order.' })
      return
    }

    res.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    })
  } catch (err) {
    console.error('[donate POST]', err)
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/verify', async (req, res) => {
  const orderId = req.query.order_id as string
  if (!orderId) {
    res.status(400).json({ error: 'order_id required' }); return
  }

  try {
    const response = await fetch(`${CF_BASE}/orders/${orderId}`, {
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': CF_VER,
      },
    })
    const data = await response.json() as { order_status?: string }
    res.json({ order_status: data.order_status })
  } catch (err) {
    console.error('[donate verify]', err)
    res.status(500).json({ error: 'Verification failed' })
  }
})

export default router
