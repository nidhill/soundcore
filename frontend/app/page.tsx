'use client'

import { useState } from 'react'
import { Navbar }               from '@/components/Navbar'
import { HeroSection }          from '@/components/HeroSection'
import { EmailThread }          from '@/components/EmailThread'
import { StorySection }         from '@/components/StorySection'
import { JusticeTracker }       from '@/components/JusticeTracker'
import { Calculator }           from '@/components/Calculator'
import { EvidenceGallery }      from '@/components/EvidenceGallery'
import { InvoiceDialogue }      from '@/components/InvoiceDialogue'
import { CommunityReviews }    from '@/components/CommunityReviews'
import { DonationInterface }    from '@/components/DonationInterface'
import { Footer }               from '@/components/Footer'
import { JusticeServedOverlay } from '@/components/JusticeServedOverlay'

export default function HomePage() {
  const [justiceServed, setJusticeServed] = useState(false)
  const [finalAmount,   setFinalAmount]   = useState(0)

  const handleGoalReached = (amount: number) => {
    setFinalAmount(amount)
    setJusticeServed(true)
  }

  return (
    <>
      {/* Justice overlay — shown when target is met */}
      {justiceServed && <JusticeServedOverlay amount={finalAmount} />}

      <div className="relative">
        {/* Film-grain noise */}
        <div className="noise" aria-hidden />

        <Navbar />
        <HeroSection />
        <EmailThread />
        <StorySection />
        <JusticeTracker onGoalReached={handleGoalReached} />
        <Calculator />
        <EvidenceGallery />
        <InvoiceDialogue />
        <CommunityReviews />
        <DonationInterface />
        <Footer />
      </div>
    </>
  )
}
