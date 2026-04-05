'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2, Zap, Mail } from 'lucide-react'
import Link from 'next/link'
import { API_URL } from '@/lib/api'

function PaymentResult() {
  const params  = useSearchParams()
  const orderId = params.get('order_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  useEffect(() => {
    if (!orderId) { setStatus('failed'); return }

    // Use the strict verify-payment endpoint (verifies + updates DB + sends email)
    fetch(`${API_URL}/api/verify-payment`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ order_id: orderId }),
    })
      .then(r => r.json())
      .then((data: { success?: boolean }) => {
        if (data.success) setStatus('success')
        else setStatus('failed')
      })
      .catch(() => setStatus('failed'))
  }, [orderId])

  return (
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
          <p className="font-mono text-protest-muted/40 text-xs">Confirming with Cashfree — please wait</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-5">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <h1 className="font-display text-5xl text-protest-text">THANK YOU</h1>
          <p className="font-sans text-protest-dim text-base leading-relaxed">
            Your contribution has been verified and recorded. Together, we hold them accountable.
          </p>
          <div className="flex items-center justify-center gap-2 bg-protest-bg-el border border-protest-border rounded-xl px-4 py-3">
            <Mail className="w-4 h-4 text-protest-gold" />
            <p className="font-mono text-xs text-protest-muted">Receipt sent to your email</p>
          </div>
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
            Payment incomplete or verification failed. No funds were deducted.
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
  )
}

export default function PaymentResultPage() {
  return (
    <div className="min-h-screen bg-protest-bg flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-protest-muted animate-spin" />
            <p className="font-mono text-protest-muted text-sm">Loading...</p>
          </div>
        }
      >
        <PaymentResult />
      </Suspense>
    </div>
  )
}
