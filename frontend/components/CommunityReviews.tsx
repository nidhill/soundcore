'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Upload, Send, CheckCircle2, AlertTriangle, X, ImageOff } from 'lucide-react'
import { API_URL } from '@/lib/api'

interface Review {
  id: string
  name: string
  description: string
  image: string | null
  created_at: string
}

function timeAgo(dateStr: string) {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-protest-bg-el border border-protest-border rounded-2xl overflow-hidden hover:border-protest-red/30 transition-colors"
    >
      {review.image && !imgError ? (
        <div className="relative h-44 bg-protest-bg overflow-hidden">
          <img
            src={review.image}
            alt={`${review.name}'s issue`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-protest-bg-el/80 to-transparent" />
        </div>
      ) : review.image && imgError ? (
        <div className="h-24 bg-protest-bg flex items-center justify-center">
          <ImageOff className="w-6 h-6 text-protest-muted" />
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-protest-red-dark border border-protest-red/30 flex items-center justify-center flex-shrink-0">
              <span className="font-display text-sm text-protest-red">
                {review.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-sans text-protest-text text-sm font-semibold leading-tight">{review.name}</p>
              <p className="font-mono text-[10px] text-protest-muted">{timeAgo(review.created_at)}</p>
            </div>
          </div>
          <AlertTriangle className="w-4 h-4 text-protest-red flex-shrink-0 mt-0.5" />
        </div>
        <p className="font-sans text-protest-dim text-sm leading-relaxed line-clamp-4">
          {review.description}
        </p>
      </div>
    </motion.div>
  )
}

function SubmitForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageB64, setImageB64] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setError('Image must be under 2 MB.'); return }
    setError('')
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setImageB64(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageB64(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !description.trim()) { setError('Name and description are required.'); return }
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, image: imageB64 }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Submission failed.'); return }
      setSuccess(true)
      setName('')
      setDescription('')
      removeImage()
      setTimeout(() => { setSuccess(false); onSubmitted() }, 3000)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-protest-bg-el border border-protest-border rounded-2xl p-6 space-y-4">
      <h3 className="font-display text-2xl text-protest-text mb-1">
        SHARE YOUR <span className="text-protest-red">STORY</span>
      </h3>
      <p className="font-sans text-protest-muted text-sm">
        Had a similar experience with Soundcore? Let the world know.
      </p>

      <div>
        <label className="font-mono text-[10px] text-protest-muted uppercase tracking-wider mb-1.5 block">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Rahul K."
          maxLength={100}
          className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-red transition-colors placeholder:text-protest-muted/40"
        />
      </div>

      <div>
        <label className="font-mono text-[10px] text-protest-muted uppercase tracking-wider mb-1.5 block">
          Your Experience
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe what happened with your Soundcore product..."
          maxLength={1200}
          rows={4}
          className="w-full bg-protest-bg border border-protest-border rounded-xl px-4 py-3 font-sans text-protest-text text-sm focus:outline-none focus:border-protest-red transition-colors placeholder:text-protest-muted/40 resize-none"
        />
        <div className="text-right font-mono text-[10px] text-protest-muted mt-1">
          {description.length} / 1200
        </div>
      </div>

      <div>
        <label className="font-mono text-[10px] text-protest-muted uppercase tracking-wider mb-1.5 block">
          Photo of the Issue <span className="text-protest-muted/50 normal-case">(optional · max 2 MB)</span>
        </label>

        {preview ? (
          <div className="relative rounded-xl overflow-hidden border border-protest-border">
            <img src={preview} alt="preview" className="w-full h-40 object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-protest-bg/80 border border-protest-border flex items-center justify-center hover:bg-protest-red/20 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-protest-text" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-protest-border hover:border-protest-red/40 rounded-xl py-6 flex flex-col items-center gap-2 transition-colors group"
          >
            <Upload className="w-5 h-5 text-protest-muted group-hover:text-protest-red transition-colors" />
            <span className="font-mono text-xs text-protest-muted">Click to upload image</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      {error && (
        <p className="font-mono text-xs text-protest-red bg-protest-red/5 border border-protest-red/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || success}
        className={`w-full flex items-center justify-center gap-2 font-display text-xl tracking-widest py-4 rounded-xl transition-all ${
          success
            ? 'bg-green-900/40 border border-green-500/30 text-green-400'
            : 'bg-protest-red hover:bg-protest-red-dim text-white active:scale-95'
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {success ? (
          <><CheckCircle2 className="w-5 h-5" /> SUBMITTED — THANK YOU</>
        ) : submitting ? (
          'SUBMITTING...'
        ) : (
          <><Send className="w-5 h-5" /> SUBMIT YOUR STORY</>
        )}
      </button>
    </form>
  )
}

export function CommunityReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/api/reviews`)
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [refreshKey])

  return (
    <section id="community" className="py-28 px-4 bg-protest-bg-card relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FF1F1F 0, #FF1F1F 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-red border border-protest-red/30 bg-protest-red/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Users className="w-3 h-3" />
            Community Reports
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            NOT JUST <span className="text-protest-red">ME</span>
          </h2>
          <p className="font-sans text-protest-dim text-base max-w-xl mx-auto leading-relaxed">
            Others have faced the same broken headband, the same invoice excuse, the same 10% insult.
            <br />
            <span className="text-protest-muted text-sm">Share your story — add to the record.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <SubmitForm onSubmitted={() => setRefreshKey(k => k + 1)} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {loading ? (
              <div className="flex items-center justify-center h-48 text-protest-muted font-mono text-sm">
                Loading reports...
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 border border-dashed border-protest-border rounded-2xl gap-3">
                <Users className="w-8 h-8 text-protest-border" />
                <p className="font-sans text-protest-muted text-sm text-center">
                  No reports yet. Be the first to share your experience.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {reviews.map((review, i) => (
                    <ReviewCard key={review.id} review={review} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
