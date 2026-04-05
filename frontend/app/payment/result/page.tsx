'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react'
import Link from 'next/link'
import { API_URL } from '@/lib/api'

export default function PaymentResultPage() {
  const params  = useSearchParams()
  const orderId = params.get('order_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  useEffect(() => {
    if (!orderId) { setStatus('failed'); return }

    /* Verify order status via Cashfree */
    fetch(`${API_URL}/api/donate/verify?order_id=${orderId}`)
      .then(r => r.json())
      .then(data => {
        if (data.order_status === 'PAID') setStatus('success')
        else setStatus('failed')
      })
      .catch(() => setStatus('failed'))
  }, [orderId])

  return (
    <div className="min-h-screen bg-protest-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Zap className="w-5 h-5 text-protest-red" />
          <span className="font-display text-xl text-protest-text tracking-wider">
            Q30 <span className="text-protest-red">PROTEST</span>
          </span>
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-protest-muted mx-auto animate-spin" />
            <p className="font-mono text-protest-muted text-sm">Verifying payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-5">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
            <h1 className="font-display text-5xl text-protest-text">THANK YOU</h1>
            <p className="font-sans text-protest-dim text-base leading-relaxed">
              Your contribution has been received. Together, we hold them accountable.
            </p>
            <p className="font-mono text-xs text-protest-muted">Order: {orderId}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-protest-red hover:bg-protest-red-dim text-white font-display text-xl tracking-widest px-8 py-3 rounded-xl transition-colors"
            >
              BACK TO PROTEST
            </Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-5">
            <XCircle className="w-16 h-16 text-protest-red mx-auto" />
            <h1 className="font-display text-5xl text-protest-text">PAYMENT FAILED</h1>
            <p className="font-sans text-protest-dim text-base leading-relaxed">
              Something went wrong or the payment was cancelled. No amount was charged.
            </p>
            <Link
              href="/#donate"
              className="inline-flex items-center gap-2 border border-protest-border hover:border-protest-red text-protest-muted hover:text-protest-red font-display text-xl tracking-widest px-8 py-3 rounded-xl transition-colors"
            >
              TRY AGAIN
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
