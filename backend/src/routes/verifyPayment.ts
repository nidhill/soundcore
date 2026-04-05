import { Router } from 'express'
import { Resend } from 'resend'
import clientPromise, { DB_NAME, CAMPAIGN_COLLECTION } from '../lib/mongodb'

const router  = Router()
const CF_BASE = 'https://api.cashfree.com/pg'
const CF_VER  = '2023-08-01'

/* ── Email HTML ─────────────────────────────────────────────────────────── */
function buildReceiptHtml(name: string, amount: number, orderId: string): string {
  const formatted = amount.toLocaleString('en-IN')
  const remaining = Math.max(0, 7100 - amount)
  const pct       = Math.min(100, Math.round((amount / 7100) * 100))

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Received</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0e0e18;border:1px solid #1e1e2e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;color:#FF1F1F;letter-spacing:0.2em;text-transform:uppercase;">
              ⚡ Q30 PROTEST · soundcore.social
            </p>
            <h1 style="margin:0;font-size:36px;font-weight:400;color:#f5f5f0;letter-spacing:0.12em;text-transform:uppercase;">
              PAYMENT VERIFIED
            </h1>
            <p style="margin:12px 0 0;font-size:13px;color:#6b7280;">
              Receipt · Order ${orderId}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0e0e18;border-left:1px solid #1e1e2e;border-right:1px solid #1e1e2e;padding:40px;">

            <!-- Greeting -->
            <p style="margin:0 0 24px;font-size:15px;color:#c8c8c4;line-height:1.7;">
              Hey <strong style="color:#f5f5f0;">${name}</strong>,
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#9ca3af;line-height:1.8;">
              Your contribution of <strong style="color:#F5C518;font-size:18px;">₹${formatted}</strong> has been
              received and verified. Every rupee you send is a direct message to Soundcore that their
              <strong style="color:#FF1F1F;">15% "solution"</strong> wasn't good enough.
            </p>

            <!-- Amount card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td style="background:#0a0a0f;border:1px solid #1e1e2e;border-left:3px solid #F5C518;border-radius:12px;padding:24px 28px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.15em;">
                    Your Contribution
                  </p>
                  <p style="margin:0;font-size:42px;color:#F5C518;font-weight:400;letter-spacing:0.05em;">
                    ₹${formatted}
                  </p>
                  <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">
                    ~${pct}% of the ₹7,100 justice goal · Order: ${orderId}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Context callout -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td style="background:#1a0a0a;border:1px solid #3d1010;border-radius:12px;padding:20px 24px;">
                  <p style="margin:0 0 8px;font-size:11px;color:#FF1F1F;text-transform:uppercase;letter-spacing:0.15em;">
                    // What this is about
                  </p>
                  <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.8;">
                    The <strong style="color:#f5f5f0;">Soundcore by Anker Life Q30</strong> headband cracked due to
                    a known structural defect — no drops, no misuse, just gravity and time.
                    Soundcore's resolution? A <strong style="color:#FF1F1F;">15% coupon</strong> to buy the same
                    broken product again. The community disagreed.
                  </p>
                </td>
              </tr>
            </table>

            <!-- What happens next -->
            <p style="margin:0 0 12px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.15em;">
              // What happens at ₹7,100?
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td style="font-size:13px;color:#9ca3af;line-height:2.2;padding-left:8px;">
                  → Community goal met: site goes offline within 24h<br/>
                  → Soundcore resolves directly: site goes offline immediately<br/>
                  → Neither happens: site stays up. Indefinitely.<br/>
                  <span style="color:#4b5563;font-size:12px;">// The choice was always theirs.</span>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://www.soundcore.social"
                     style="display:inline-block;background:#FF1F1F;color:#ffffff;text-decoration:none;
                            font-size:16px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;
                            padding:14px 36px;border-radius:10px;">
                    VIEW THE PROTEST
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#080810;border:1px solid #1e1e2e;border-top:none;border-radius:0 0 16px 16px;
                     padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;color:#4b5563;">
              soundcore.social · A Developer's Protest
            </p>
            <p style="margin:0;font-size:11px;color:#374151;">
              This email was sent because you contributed to the Q30 Justice Fund.<br/>
              Payment processed securely via Cashfree.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/* ── POST /api/verify-payment ───────────────────────────────────────────── */
router.post('/', async (req, res) => {
  const { order_id, name, email, amount, note } = req.body as {
    order_id: string
    name?:    string
    email?:   string
    amount?:  number
    note?:    string
  }

  if (!order_id?.trim()) {
    res.status(400).json({ error: 'order_id is required.' }); return
  }

  try {
    /* ── 1. Verify with Cashfree ────────────────────────────────────────── */
    const cfRes = await fetch(`${CF_BASE}/orders/${order_id}`, {
      headers: {
        'x-client-id':     process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version':   CF_VER,
      },
    })
    const cfData = await cfRes.json() as {
      order_status?:    string
      order_amount?:    number
      customer_details?: { customer_name?: string; customer_email?: string }
    }

    if (!cfRes.ok || cfData.order_status !== 'PAID') {
      res.status(400).json({
        error: 'Payment incomplete or verification failed. No funds were deducted.',
      })
      return
    }

    const verifiedAmount = cfData.order_amount ?? amount ?? 0
    const verifiedName   = (name?.trim() || cfData.customer_details?.customer_name  || 'Supporter')
    const verifiedEmail  = (email?.trim() || cfData.customer_details?.customer_email || '')

    /* ── 2. Idempotency check + DB update ───────────────────────────────── */
    const client = await clientPromise
    const db     = client.db(DB_NAME)

    const existing = await db.collection('processed_payments').findOne({ order_id })
    if (existing) {
      // Already processed — return success without double-counting
      res.json({ success: true })
      return
    }

    await db.collection('processed_payments').insertOne({
      order_id,
      amount:       verifiedAmount,
      name:         verifiedName,
      email:        verifiedEmail,
      note:         note?.trim().slice(0, 140) || null,
      processed_at: new Date(),
    })

    await db.collection(CAMPAIGN_COLLECTION).updateOne(
      { id: 1 },
      {
        $inc: { current_amount: verifiedAmount },
        $set: { updated_at: new Date() },
      },
      { upsert: true },
    )

    /* ── 3. Send receipt email via Resend (non-fatal) ───────────────────── */
    if (verifiedEmail && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from:    'Q30 Protest <noreply@soundcore.social>',
          to:      verifiedEmail,
          subject: 'Payment Received: Thank you for funding Justice! ⚡',
          html:    buildReceiptHtml(verifiedName, verifiedAmount, order_id),
        })
      } catch (emailErr) {
        // Email failure is non-fatal — log but don't block the success response
        console.error('[verify-payment] Email send failed:', emailErr)
      }
    }

    res.json({ success: true })
  } catch (err) {
    console.error('[verify-payment POST]', err)
    res.status(500).json({ error: 'Server error during verification.' })
  }
})

export default router
