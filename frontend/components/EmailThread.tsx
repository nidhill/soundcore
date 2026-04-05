'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ChevronDown, ChevronUp, AlertTriangle, RefreshCw } from 'lucide-react'

/* ── Types ─────────────────────────────────────────────────────────────────── */

type Block =
  | { k: 'p'; t: string }
  | { k: 'list'; ordered: boolean; items: string[] }

interface Email {
  id: string
  ts: string
  dir: 'out' | 'in'
  from: string
  role: string
  subject: string
  blocks: Block[]
  sig?: string
  tag: string
  accent: 'blue' | 'red' | 'gold' | 'gray'
  loopN?: number
  note?: { label: string; body: string; warn: boolean }
  open?: boolean
}

/* ── Accent helpers ─────────────────────────────────────────────────────────── */

const borderHex: Record<string, string> = {
  blue: '#3B82F6',
  red:  '#FF1F1F',
  gold: '#F5C518',
  gray: '#3A3A44',
}

const tagCls: Record<string, string> = {
  blue: 'bg-blue-900/40 text-blue-400 border-blue-500/30',
  red:  'bg-protest-red-dark text-protest-red border-protest-red/30',
  gold: 'bg-protest-gold-dark text-protest-gold border-protest-gold/30',
  gray: 'bg-protest-bg text-protest-muted border-protest-border',
}

/* ── Thread 1: ANKER-TNM638711334 · support.india@anker.com ────────────────── */

const thread1: Email[] = [
  {
    id: 't1-1',
    ts: 'Mon, 30 Mar · 11:18 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.india@anker.com',
    subject: 'Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear Soundcore India Support Team,' },
      { k: 'p', t: 'I am writing to report a manufacturing defect with my Anker Soundcore Life Q30 headphones. The plastic headband of the headphones has developed a crack near the hinge on the left side. I have used the product with extreme care, and this seems to be a structural failure, which I understand is a known issue with this particular model.' },
      { k: 'p', t: 'Since the product is still within the 18-month warranty period, I would like to request a replacement or a repair under warranty.' },
      { k: 'p', t: 'Product Details: Soundcore Life Q30 · Serial Number (SN): AEMN009E28601520' },
      { k: 'p', t: 'I have attached photos of the crack for your reference. Looking forward to a quick resolution.' },
    ],
    sig: 'Best regards, Muhammad Nidhil',
    tag: 'INITIAL CLAIM',
    accent: 'blue',
    open: true,
  },
  {
    id: 't1-2',
    ts: 'Mon, 30 Mar · 11:25 PM',
    dir: 'in',
    from: 'Soundcore India Support',
    role: 'support.india@anker.com · Ticket #ANKER-TNM638711334',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear nidhiljabbar,' },
      { k: 'p', t: 'Thank you for providing the details and photos regarding the issue with your Soundcore Life Q30 headphones. Based on the information provided, it seems that the crack near the hinge might be a structural issue. To proceed with your warranty claim, we need to ensure that the issue is documented properly.' },
      { k: 'p', t: 'Here are some steps you can try to address the issue:' },
      {
        k: 'list', ordered: true, items: [
          'Inspect the Damage: Ensure that the crack is clearly visible in the photos you have provided.',
          'Reset the Headphones: Press and hold the power button for about 10 seconds until the LED indicator blinks red and blue. This will reset the headphones.',
          'Update Firmware: Use the Soundcore app to check for any available firmware updates. Updates often include fixes for various issues.',
        ],
      },
      { k: 'p', t: 'To help you further, please provide: Order Number and the invoice from the purchase · Current shipping address (including the recipient\'s name).' },
    ],
    tag: 'TROUBLESHOOT',
    accent: 'gray',
    note: {
      label: 'READ THIS CAREFULLY',
      body: 'They acknowledge "the crack near the hinge might be a structural issue" — and then tell you to reset the firmware and update the software. For a physical crack. In plastic. The headband has snapped at the hinge joint. There is no firmware fix for that.',
      warn: true,
    },
  },
  {
    id: 't1-3',
    ts: 'Mon, 30 Mar · 11:35 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.india@anker.com',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear Soundcore Support Team,' },
      { k: 'p', t: 'Thank you for your response. Regarding the purchase details, I would like to clarify that these headphones were purchased in Saudi Arabia and given to me as a gift. Since it was a gift, I do not have the original invoice or the order number at the moment.' },
      { k: 'p', t: 'However, I am providing the Serial Number (SN): AEMN009E28601520 for your reference. As Soundcore is a reputable global brand, I believe the warranty and manufacturing details should be verifiable through this serial number in your global database.' },
      { k: 'p', t: 'This headband issue is a well-known structural defect with the Life Q30 model, and it occurred during normal usage. I am currently based in India and would appreciate if the Indian support team could assist me with a replacement or repair under the global warranty policy.' },
      { k: 'p', t: 'My Shipping Details: Name: Muhammad Nidhil · Address: Kunnumpurath house, Koorachundu, Kozhikode, Kerala, India · PIN Code: 673527 · Phone: 6238651917' },
      { k: 'p', t: 'I have attached the photos of the damage again for your review. I hope for a favorable response.' },
    ],
    sig: 'Best regards, Muhammad Nidhil',
    tag: 'GIFT / NO INVOICE',
    accent: 'blue',
  },
  {
    id: 't1-4',
    ts: 'Mon, 30 Mar · 11:46 PM',
    dir: 'in',
    from: 'Soundcore India Support',
    role: 'support.india@anker.com · Ticket #ANKER-TNM638711334',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear nidhiljabbar,' },
      { k: 'p', t: 'Thank you for helping us better understand your situation. We sincerely apologize for the issue you\'ve encountered. Please know we do want to make things right for you and help with a replacement, but we can only process warranty claims when we have the proof of purchase, then we can locate your order in our system.' },
      { k: 'p', t: 'I know it\'s troublesome, but if it is a gift, you could contact the person who gave the gift, perhaps they can provide the proof of purchase so we can proceed. Please get back to us at any time if you are able to get that information so we can move ahead in the warranty process.' },
      { k: 'p', t: 'I remain available to help in any way I can.' },
    ],
    tag: 'INVOICE LOOP',
    accent: 'gray',
    loopN: 1,
  },
  {
    id: 't1-5',
    ts: 'Mon, 30 Mar · 11:52 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.india@anker.com',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear Soundcore Support Team,' },
      { k: 'p', t: 'Thank you for your understanding and for being willing to help. I have reached out to the person who gifted me the headphones, but unfortunately, they are unable to locate the invoice or the original order details as it was purchased some time ago from a retail store in Saudi Arabia.' },
      { k: 'p', t: 'Since I do not have the proof of purchase, I kindly request you to consider this as a special exception. I have provided the Serial Number (SN): AEMN009E28601520, which is unique to this unit. I believe your internal database should be able to verify the authenticity and the approximate manufacturing date using this SN.' },
      { k: 'p', t: 'As this headband cracking is a widely recognized structural issue with the Life Q30 model and not caused by accidental damage or misuse, I sincerely hope you can assist me with a replacement. I am a huge fan of Soundcore products and would love to continue using them.' },
      { k: 'p', t: 'I would be very grateful if you could help me resolve this, even without the invoice, based on the physical condition and the serial number provided.' },
    ],
    sig: 'Best regards, Muhammad Nidhil',
    tag: 'EXCEPTION REQUEST',
    accent: 'blue',
  },
  {
    id: 't1-6',
    ts: 'Tue, 31 Mar · 12:07 AM',
    dir: 'in',
    from: 'Soundcore India Support',
    role: 'support.india@anker.com · Ticket #ANKER-TNM638711334',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear nidhiljabbar,' },
      { k: 'p', t: 'Thank you for reaching out to us. We understand your concern. However, without a valid receipt, we are unable to locate your order information and therefore cannot confirm whether your purchase is covered under our warranty policy. Unfortunately, this means we are unable to provide a replacement or refund at this time.' },
      { k: 'p', t: 'Following are some tips to obtain a copy of your receipt:' },
      {
        k: 'list', ordered: true, items: [
          'If this is an in-store purchase: Contact the retailer to request a reissued receipt.',
          'If this is an online purchase: Log in to your account or check past emails for the order confirmation or invoice.',
          'If this is a gift: If the item was a gift, you may kindly ask the person who purchased it to share the receipt. We understand this may be inconvenient, but it\'s the only way we can confirm warranty coverage.',
        ],
      },
      { k: 'p', t: 'Rest assured that, once we get the order information and verify the warranty, we will be more than happy to provide further assistance. We sincerely apologize for the inconvenience and appreciate your understanding and cooperation.' },
    ],
    tag: 'INVOICE LOOP',
    accent: 'gray',
    loopN: 2,
    note: {
      label: 'SAME ANSWER. DIFFERENT EMAIL.',
      body: 'The gift-giver was already contacted. They already said no. The receipt already cannot be found. Soundcore knows all of this — and responded with new tips for finding a receipt.',
      warn: true,
    },
  },
  {
    id: 't1-7',
    ts: 'Tue, 31 Mar · 7:58 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.india@anker.com',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear Soundcore Support Team,' },
      { k: 'p', t: 'Thank you for your response. I have searched extensively for the purchase invoice, but unfortunately, I am unable to locate it at this time. However, I have the Serial Number (SN): AEMN009E28601520 with me.' },
      { k: 'p', t: 'I would like to emphasize that this is an original Soundcore product. Since I cannot provide the invoice, could you please let me know if there are any other alternative ways to proceed with the warranty claim or repair for this structural issue?' },
      { k: 'p', t: 'I am a loyal user of Soundcore and would appreciate any assistance you can provide based on the product\'s serial number and its current condition. I look forward to your guidance on the next steps.' },
    ],
    tag: 'STILL TRYING',
    accent: 'blue',
  },
  {
    id: 't1-8',
    ts: 'Wed, 1 Apr · 8:51 PM',
    dir: 'in',
    from: 'Rian — Anker Customer Support Engineer',
    role: 'support.india@anker.com · Ticket #ANKER-TNM638711334',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear customer,' },
      { k: 'p', t: 'Thank you for your detailed explanation, and we truly appreciate you taking the time to share the background of your situation. We completely understand that the product was received as a gift and that you may not have access to the original invoice. We\'re also very sorry to hear about the issue with your headphones, and we sincerely understand how frustrating this must be for you.' },
      { k: 'p', t: 'We truly wish to assist you with a suitable resolution. However, we would like to kindly explain that the purchase invoice plays a crucial role in helping us verify the order details, including the date and source of purchase, which are necessary for us to proceed with any warranty-related support.' },
      { k: 'p', t: 'While we understand your point regarding the serial number, please note that our warranty policy requires a valid proof of purchase to confirm eligibility. Additionally, the warranty coverage applies to specific quality-related issues under verified purchases. In this case, without a verifiable invoice, we regret to inform you that we are unable to process a warranty claim.' },
      { k: 'p', t: 'We sincerely apologize for this outcome, as we fully understand that this is not the resolution you were hoping for. If you are able to obtain any proof of purchase in the future, we would be more than happy to reassess your case and assist you further.' },
    ],
    sig: 'Warm regards, Rian · Anker Customer Support Engineer',
    tag: 'CLAIM DENIED',
    accent: 'red',
  },
  {
    id: 't1-9',
    ts: 'Fri, 3 Apr · 11:38 AM',
    dir: 'in',
    from: 'Sunil — Customer Support Manager, Soundcore India',
    role: 'support.india@anker.com · Ticket #ANKER-TNM638711334',
    subject: 'Re: Warranty Claim for Soundcore Life Q30 — Cracked Headband Issue',
    blocks: [
      { k: 'p', t: 'Dear customer,' },
      { k: 'p', t: 'My name is Sunil, and I am the Customer Support Manager for Soundcore in India. I truly appreciate you taking the time to inform us about the issue you have encountered. I wanted to personally step in and follow up on your case to ensure that your concerns are addressed promptly and resolved to your full satisfaction.' },
      { k: 'p', t: 'To begin the warranty verification process, we typically require a copy of the purchase invoice. We understand that this item was received as a gift, and the invoice is not available to you. In such cases, we are able to use the serial number of the product to locate its purchase details and check the warranty status.' },
      { k: 'p', t: 'After reviewing the serial number provided, we found that the product is out of warranty. We sincerely apologize for any disappointment this may cause.' },
      { k: 'p', t: 'Please also be aware that any warranty claims are processed in the country where the product was originally purchased. As you mentioned, this gift was purchased in Saudi Arabia, so any warranty service would need to be handled there. While we are unable to process a warranty claim in India for this product, please know that we remain committed to supporting you with any guidance or information you may need regarding your Soundcore products.' },
    ],
    sig: 'Warm regards, Sunil · Anker Customer Support Manager',
    tag: 'MANAGER: DENIED',
    accent: 'red',
    open: true,
    note: {
      label: 'OUT OF WARRANTY. REGION LOCKED.',
      body: 'The serial number they previously said "couldn\'t verify warranty" has now been checked — and the verdict is: out of warranty. A new wall is also introduced: the product was purchased in Saudi Arabia, so India cannot help. You must contact Saudi Arabia. This thread is closed.',
      warn: true,
    },
  },
]

/* ── Thread 2: ANKER-TNA4738432612 · support.mea@soundcore.com ─────────────── */

const thread2: Email[] = [
  {
    id: 't2-1',
    ts: 'Fri, 3 Apr · 11:56 AM',
    dir: 'in',
    from: 'Soundcore Customer Support Team',
    role: 'support.mea@soundcore.com · Ticket #ANKER-TNA4738432612',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30 (SN: AEMN009E28601520)',
    blocks: [
      { k: 'p', t: 'Dear nidhiljabbar,' },
      { k: 'p', t: 'Thank you for reaching out regarding the issue with your Soundcore Life Q30 headphones. Based on the details provided, it seems like the headband cracking might be a structural issue. Here are some general troubleshooting steps you can try:' },
      {
        k: 'list', ordered: true, items: [
          'Adjust the Headband: Ensure the headband is adjusted to fit snugly on your head. It should not be too tight or too loose.',
          'Inspect for Damage: Carefully check the headband and hinge area for visible signs of damage or loose parts.',
          'Reset the Headphones: Hold down the Power button and Volume up button for 5 seconds to reset the headphones.',
          'Update Firmware: Use the Soundcore app to check for any available firmware updates to improve performance and fix known issues.',
        ],
      },
      { k: 'p', t: 'If the issue persists, it may require further evaluation or replacement. To help you further, provide: Order Number and the invoice from the purchase · Current shipping address.' },
    ],
    tag: 'SAME SCRIPT',
    accent: 'gray',
    note: {
      label: 'A NEW TEAM. THE EXACT SAME SCRIPT.',
      body: 'Thread 1 was escalated all the way to a Support Manager and closed with "region locked." Thread 2 is a fresh contact with the MEA global team. Their opening move: "Adjust the Headband." For a headband that has already snapped in two.',
      warn: true,
    },
  },
  {
    id: 't2-2',
    ts: 'Fri, 3 Apr · 12:00 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.mea@soundcore.com',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear Soundcore Support Team,' },
      { k: 'p', t: 'Thank you for your response and the troubleshooting tips. However, as mentioned, this is a physical structural issue (headband cracking), so software resets or firmware updates will not resolve the problem.' },
      { k: 'p', t: 'Regarding the information you requested: this product was a gift from a family member in Saudi Arabia, and unfortunately, I do not have access to the original invoice or the order number. However, the product is 100% original, and the Serial Number is AEMN009E28601520. I kindly request you to verify the manufacturing and warranty details using this serial number.' },
      { k: 'p', t: 'I am a loyal Soundcore enthusiast and I currently own the Soundcore Boom 2 and Anker Power Banks. I have always trusted your brand for its quality. Since this headband cracking is a well-known issue with the Life Q30 model, I sincerely hope you can provide a one-time goodwill replacement or a solution, even without the invoice.' },
    ],
    sig: 'Best regards, Muhammad Nidhil',
    tag: 'PHYSICAL ISSUE',
    accent: 'blue',
  },
  {
    id: 't2-3',
    ts: 'Fri, 3 Apr · 12:16 PM',
    dir: 'in',
    from: 'Soundcore Customer Support Team',
    role: 'support.mea@soundcore.com · Ticket #ANKER-TNA4738432612',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear nidhiljabbar,' },
      { k: 'p', t: 'Thank you for helping us better understand your situation. We sincerely apologize for the issue you\'ve encountered. Please know we do want to make things right for you and help with a replacement, but we can only process warranty claims when we have the proof of purchase, then we can locate your order in our system.' },
      { k: 'p', t: 'I know it\'s troublesome, but if it is a gift, you could contact the person who gave the gift, perhaps they can provide the proof of purchase so we can proceed. Please get back to us at any time if you are able to get that information so we can move ahead in the warranty process.' },
      { k: 'p', t: 'I remain available to help in any way I can.' },
    ],
    tag: 'INVOICE LOOP',
    accent: 'gray',
    loopN: 3,
    note: {
      label: 'COPY-PASTE CONFIRMED',
      body: 'This response is word-for-word identical to the email sent by the India team on March 30 (Loop #1). Different team, different ticket, different continent — exact same text. This is not customer support. This is a script.',
      warn: true,
    },
  },
  {
    id: 't2-4',
    ts: 'Fri, 3 Apr · 12:32 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.mea@soundcore.com',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear Support Team,' },
      { k: 'p', t: 'Thank you for your willingness to help. I have contacted the gift-giver (my brother), but unfortunately, he is unable to retrieve the invoice. His Noon.com account is linked to an old Saudi phone number that is no longer active, making it impossible to receive the OTP and log in.' },
      { k: 'p', t: 'I have the original product, the box, and the serial number (SN: AEMN009E28601520). Since this is a known structural defect and I am a loyal Soundcore fan (owning a Soundcore Boom 2 and Anker Power Banks), I was hoping for a one-time exception or a goodwill gesture.' },
      { k: 'p', t: 'As a student and developer who relies on these headphones daily, this structural failure is quite disappointing. If there is no other way without the invoice, I will sadly have to accept this, but I hope you can consider my brand loyalty.' },
      { k: 'p', t: 'Thank you for your time and for being so professional throughout this communication.' },
    ],
    sig: 'Best regards, Muhammad Nidhil · Phone: +91 6238651917',
    tag: 'DEAD END',
    accent: 'blue',
  },
  {
    id: 't2-5',
    ts: 'Fri, 3 Apr · 12:46 PM',
    dir: 'in',
    from: 'Soundcore Customer Support Team',
    role: 'support.mea@soundcore.com · Ticket #ANKER-TNA4738432612',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear nidhiljabbar,' },
      { k: 'p', t: 'Thank you for reaching out to us. We understand your concern. However, without a valid receipt, we are unable to locate your order information and therefore cannot confirm whether your purchase is covered under our warranty policy. Unfortunately, this means we are unable to provide a replacement or refund at this time.' },
      { k: 'p', t: 'Following are some tips to obtain a copy of your receipt:' },
      {
        k: 'list', ordered: true, items: [
          'If this is an in-store purchase: Contact the retailer to request a reissued receipt.',
          'If this is an online purchase: Log in to your account or check past emails for the order confirmation or invoice.',
          'If this is a gift: You may kindly ask the person who purchased it to share the receipt. We understand this may be inconvenient, but it\'s the only way we can confirm warranty coverage.',
        ],
      },
      { k: 'p', t: 'Rest assured that, once we get the order information and verify the warranty, we will be more than happy to provide further assistance. We sincerely apologize for the inconvenience and appreciate your understanding and cooperation.' },
    ],
    tag: 'INVOICE LOOP',
    accent: 'gray',
    loopN: 4,
    note: {
      label: 'LOOP #4. IDENTICAL TIPS.',
      body: 'The Noon.com account uses a disconnected Saudi number. There is no OTP path. The invoice cannot be retrieved — this was explained in the previous email. Soundcore\'s response: the same 3-step receipt guide, sent now for the fourth time across two teams.',
      warn: true,
    },
  },
  {
    id: 't2-6',
    ts: 'Fri, 3 Apr · 1:18 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.mea@soundcore.com',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear Support Team,' },
      { k: 'p', t: 'I understand and respect your strict policy regarding the purchase invoice. It is unfortunate that I cannot retrieve it due to the account access issues I mentioned.' },
      { k: 'p', t: 'However, as a dedicated fan who has invested in multiple Soundcore products like the Boom 2 and Anker Power Banks, I am very disappointed that I have to retire my Life Q30 due to a structural failure that is common for this model.' },
      { k: 'p', t: 'Since a replacement is not possible without the invoice, would you be willing to offer a discount coupon or a gift card as a goodwill gesture? This would help me stay within the Soundcore ecosystem when I look for my next pair of headphones. I really value your brand and would love to continue being a part of the Soundcore community.' },
    ],
    sig: 'Best regards, Muhammad Nidhil',
    tag: 'GOODWILL REQUEST',
    accent: 'blue',
  },
  {
    id: 't2-7',
    ts: 'Sun, 5 Apr · 8:42 AM',
    dir: 'in',
    from: 'Rian — Soundcore Customer Support',
    role: 'support.mea@soundcore.com · Ticket #ANKER-TNA4738432612',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear customer,' },
      { k: 'p', t: 'Thank you for reaching out to us and sharing your situation. We are truly sorry to hear that the headband on your Soundcore Life Q30 headphones has started cracking. We know how much you value this gift, and it is incredibly disappointing when a product does not hold up the way you expect. We also deeply appreciate your patience after speaking with our different regional teams to find a solution.' },
      { k: 'p', t: 'Even though you do not have the original receipt since this was a gift, you are a highly valued customer, and we absolutely want to support you.' },
      { k: 'p', t: 'To help make things right, we would love to offer you a 10% refund toward the purchase of a brand-new replacement of the exact same model (Soundcore Life Q30).' },
      { k: 'p', t: 'At this moment, this specific model is temporarily unavailable. We kindly ask that you wait until it becomes available again. Once it is back in stock, you can go ahead and place your new order.' },
      { k: 'p', t: 'Please keep this important detail in mind: To ensure we can successfully process your 10% refund, the new headphones must be purchased only through our official "AnkerDirect India" store on Amazon. We cannot apply this offer to items bought from other sellers.' },
      { k: 'p', t: 'Once the item is available and your new order is placed, simply reply directly to this email with your new Amazon order number. We will then take care of the rest and process the refund back to your original payment method!' },
    ],
    sig: 'Warm regards, Rian · soundcore Customer Support · soundcore | HEAR IT. FEEL IT.',
    tag: '10% OFFER',
    accent: 'gold',
    open: true,
    note: {
      label: 'THE OFFER DECODED',
      body: 'Product price: ₹7,100. Their "goodwill": ₹710. Your out-of-pocket bill: ₹6,390 — to replace a product that broke due to their own structural design flaw. Bonus conditions: wait for restock, buy only from their Amazon store, submit your order number for processing.',
      warn: false,
    },
  },
  {
    id: 't2-8',
    ts: 'Sun, 5 Apr · 9:33 AM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.mea@soundcore.com',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear Rian and the Soundcore Management Team,' },
      { k: 'p', t: 'I am writing to formally reject your offer of a 10% refund on a new purchase. To be honest, I find this offer insulting to a loyal customer.' },
      { k: 'p', t: 'As a Software Developer and a dedicated user of the Anker/Soundcore ecosystem (owning the Boom 2 and multiple Power Banks), I expected a brand of your stature to take responsibility for a well-documented manufacturing defect. Charging a customer 90% of the price to replace a product that failed due to your own design flaw (headband cracking) is unacceptable and poor business ethics.' },
      { k: 'p', t: 'I have been a brand advocate for Anker among my colleagues and the developer community. However, this experience has completely changed my perspective.' },
      { k: 'p', t: 'Please be advised that if a fair resolution (a full replacement or a significant goodwill gesture) is not provided, I will feel obligated to share this entire ordeal — including the "10% refund" offer — across my social media platforms (LinkedIn, Twitter, and Instagram) and tech forums to warn other potential buyers about Soundcore\'s lack of accountability for structural defects.' },
      { k: 'p', t: 'I hope Soundcore values its reputation and long-term customer relationships more than the cost of a single replacement unit. I am giving you one final opportunity to make this right before I take this issue public.' },
    ],
    sig: 'Regards, Muhammad Nidhil · Junior Software Developer | BCA Student',
    tag: '10% REJECTED',
    accent: 'red',
    open: true,
  },
  {
    id: 't2-9',
    ts: 'Sun, 5 Apr · 2:10 PM',
    dir: 'in',
    from: 'Soundcore Customer Support Team',
    role: 'support.mea@soundcore.com · Ticket #ANKER-TNA4738432612',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear customer,' },
      { k: 'p', t: 'Thank you for your response. We sincerely appreciate you sharing your perspective with us so clearly. As a dedicated user of the Anker and Soundcore ecosystem, your loyalty means a great deal to us, and we truly regret that our previous communication did not meet your expectations.' },
      { k: 'p', t: 'We would like to provide some clarity regarding our standard procedures. Typically, to move forward with a full replacement, our policy requires a valid purchase invoice. In your specific case, since the item was a gift and an invoice was not available, we made an exception by using the serial number to determine the warranty status. After checking those details, the system indicates that the unit is now outside of its original warranty period. Generally, once the warranty has concluded, we are unable to process a replacement claim.' },
      { k: 'p', t: 'However, because we truly value your advocacy within the developer community and your history with our brand, we want to offer a more significant gesture of goodwill. While we cannot provide a full replacement for an out-of-warranty product, we would like to increase our previous offer to a 15% partial refund on a new purchase of the same model.' },
      { k: 'p', t: 'To ensure this is processed correctly, the purchase would need to be made through our official AnkerDirect India store on Amazon. Once the order is placed, please share the new order ID with us, and we will immediately take the necessary steps to arrange the partial refund for you.' },
      { k: 'p', t: 'We hope you understand that this offer is a sincere effort to maintain our relationship with you despite the warranty status. We remain committed to supporting you and look forward to your thoughts on how you would like to proceed.' },
    ],
    tag: '15% "UPGRADE"',
    accent: 'gold',
    open: true,
    note: {
      label: 'THE 5% UPGRADE',
      body: 'Your social media warning unlocked an extra 5%. New "goodwill": ₹1,065. Your bill: ₹6,035. The structural defect is still unacknowledged as Soundcore\'s responsibility. You still must buy through their Amazon store. Same conditions. Different number.',
      warn: false,
    },
  },
  {
    id: 't2-10',
    ts: 'Sun, 5 Apr · 3:09 PM',
    dir: 'out',
    from: 'Muhammad Nidhil',
    role: 'nidhiljabbar@gmail.com → support.mea@soundcore.com',
    subject: 'Re: Warranty Support Inquiry — Soundcore Life Q30',
    blocks: [
      { k: 'p', t: 'Dear Rian and the Soundcore Management Team,' },
      { k: 'p', t: 'Thank you for the detailed follow-up and for verifying the serial number.' },
      { k: 'p', t: 'While I appreciate the extra 5% added to your previous offer, I must firmly decline the 15% discount. Asking a customer to pay 85% out-of-pocket to replace a product that failed due to a widely documented structural design flaw — not normal wear and tear — is not a resolution. It is a sales pitch disguised as customer support. A manufacturing defect remains a defect, regardless of the warranty window.' },
      { k: 'p', t: 'Since Soundcore is unwilling to take fair accountability for the engineering oversight in the Soundcore by Anker Life Q30, I have moved forward with my plans.' },
      { k: 'p', t: 'As a software developer, I have built and deployed a public platform documenting this exact issue, your support logic, and a database for other consumers to share their broken headbands. The website is now live here: https://www.soundcore.social' },
      { k: 'p', t: 'This is no longer just about my headphones; it is about brand accountability. The site will remain active and will continue to be shared across developer networks, LinkedIn, Reddit, and tech forums so future buyers can make informed decisions about Anker\'s build quality. You are welcome to track the community\'s response directly on the site.' },
    ],
    sig: 'Muhammad Nidhil',
    tag: 'SITE DEPLOYED',
    accent: 'red',
    open: true,
  },
]

/* ── EmailCard ──────────────────────────────────────────────────────────────── */

function EmailCard({ email, index }: { email: Email; index: number }) {
  const [open, setOpen] = useState(email.open ?? false)
  const isOut = email.dir === 'out'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.035 }}
      className="rounded-2xl border border-protest-border bg-protest-bg-el overflow-hidden"
      style={{ borderLeftColor: borderHex[email.accent], borderLeftWidth: 3 }}
    >
      {/* ── Header (always visible, click to toggle) ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between px-4 sm:px-5 py-4 gap-3 hover:bg-protest-bg/30 transition-colors text-left"
      >
        {/* Avatar + sender */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display text-base ${
            isOut
              ? 'bg-blue-900/60 border border-blue-700/40 text-blue-300'
              : 'bg-protest-bg border border-protest-border text-protest-muted'
          }`}>
            {isOut ? 'N' : 'S'}
          </div>
          <div className="min-w-0">
            <p className="font-sans font-semibold text-protest-text text-sm leading-tight">{email.from}</p>
            <p className="font-mono text-[10px] text-protest-muted/60 mt-0.5 truncate">{email.role}</p>
          </div>
        </div>

        {/* Tags + timestamp + chevron */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {email.loopN && (
              <span className="flex items-center gap-1 bg-protest-red/10 text-protest-red border border-protest-red/20 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                <RefreshCw className="w-2.5 h-2.5" />
                LOOP #{email.loopN}
              </span>
            )}
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${tagCls[email.accent]}`}>
              {email.tag}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-protest-muted whitespace-nowrap">{email.ts}</span>
            {open
              ? <ChevronUp className="w-3.5 h-3.5 text-protest-muted flex-shrink-0" />
              : <ChevronDown className="w-3.5 h-3.5 text-protest-muted flex-shrink-0" />
            }
          </div>
        </div>
      </button>

      {/* ── Subject line ── */}
      <div className="px-4 sm:px-5 py-2 border-t border-protest-border/40 bg-protest-bg/20">
        <p className="font-sans text-protest-text/70 text-xs font-medium leading-tight">{email.subject}</p>
      </div>

      {/* ── Body (collapsible) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 py-5 border-t border-protest-border/40 space-y-3">
              {email.blocks.map((block, i) => {
                if (block.k === 'p') {
                  return (
                    <p key={i} className="font-sans text-protest-dim text-sm leading-relaxed">
                      {block.t}
                    </p>
                  )
                }
                if (block.k === 'list') {
                  const Tag = block.ordered ? 'ol' : 'ul'
                  return (
                    <Tag key={i} className={`space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
                      {block.items.map((item, j) => (
                        <li key={j} className="font-sans text-protest-dim text-sm leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </Tag>
                  )
                }
                return null
              })}

              {/* Signature */}
              {email.sig && (
                <p className="font-mono text-xs text-protest-muted pt-3 border-t border-protest-border/40">
                  {email.sig}
                </p>
              )}

              {/* Protest annotation */}
              {email.note && (
                <div className={`mt-2 flex items-start gap-3 rounded-xl p-4 border ${
                  email.note.warn
                    ? 'bg-protest-red/5 border-protest-red/20'
                    : 'bg-protest-gold/5 border-protest-gold/20'
                }`}>
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${email.note.warn ? 'text-protest-red' : 'text-protest-gold'}`} />
                  <div>
                    <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 ${email.note.warn ? 'text-protest-red' : 'text-protest-gold'}`}>
                      {email.note.label}
                    </p>
                    <p className="font-mono text-xs text-protest-muted leading-relaxed">
                      {email.note.body}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main component ─────────────────────────────────────────────────────────── */

export function EmailThread() {
  const [activeThread, setActiveThread] = useState(0)
  const threads = [thread1, thread2]

  const threadMeta = [
    {
      label: 'Thread 1',
      desc: 'India Support',
      ticket: '#ANKER-TNM638711334',
      count: thread1.length,
      dates: 'Mar 30 – Apr 3',
    },
    {
      label: 'Thread 2',
      desc: 'MEA / Global Support',
      ticket: '#ANKER-TNA4738432612',
      count: thread2.length,
      dates: 'Apr 3 – Apr 5',
    },
  ]

  return (
    <section id="emails" className="py-28 px-4 bg-protest-bg-card relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-protest-red border border-protest-red/30 bg-protest-red/5 px-4 py-2 rounded-full mb-6 uppercase tracking-[0.18em]">
            <Mail className="w-3 h-3" />
            Evidence Log
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-protest-text leading-none mb-4">
            THE EMAIL <span className="text-protest-red">AUDIT</span>
          </h2>
          <p className="font-sans text-protest-dim text-base max-w-lg mx-auto leading-relaxed">
            19 real emails. 2 support teams. 4 invoice loops. 0 resolutions.
          </p>
          <p className="font-mono text-protest-muted/40 text-xs mt-3">
            All emails shown verbatim from actual support communications with Soundcore / Anker.
          </p>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {[
            { v: '19', l: 'Emails exchanged' },
            { v: '6', l: 'Days of back-and-forth' },
            { v: '4×', l: 'Same invoice response' },
            { v: '₹0', l: 'Refunded to date' },
          ].map(s => (
            <div key={s.l} className="bg-protest-bg-el border border-protest-border rounded-xl px-4 py-4 text-center">
              <p className="font-display text-3xl text-protest-red leading-none mb-1">{s.v}</p>
              <p className="font-mono text-[10px] text-protest-muted leading-tight">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Thread tabs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-2 mb-6"
        >
          {threadMeta.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveThread(i)}
              className={`px-4 py-3.5 rounded-xl border text-left transition-all ${
                activeThread === i
                  ? 'border-protest-red bg-protest-red/5'
                  : 'border-protest-border bg-protest-bg-el hover:border-protest-muted/50'
              }`}
            >
              <p className={`font-display text-xl leading-tight ${activeThread === i ? 'text-protest-red' : 'text-protest-muted'}`}>
                {t.label}
              </p>
              <p className="font-mono text-[10px] text-protest-muted mt-0.5">{t.desc}</p>
              <p className="font-mono text-[10px] text-protest-muted/50 truncate">{t.ticket}</p>
              <p className="font-mono text-[10px] text-protest-muted/40 mt-1">{t.count} messages · {t.dates}</p>
            </button>
          ))}
        </motion.div>

        {/* ── Email list ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeThread}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-2.5"
          >
            {threads[activeThread].map((email, i) => (
              <EmailCard key={email.id} email={email} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Verdict ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-protest-bg-el border border-protest-red/20 rounded-2xl p-6 text-center"
        >
          <p className="font-sans text-protest-text text-base leading-relaxed mb-2">
            A documented design defect. No invoice because it was a{' '}
            <span className="text-protest-gold font-semibold">gift</span>.
            Final resolution offered:{' '}
            <span className="text-protest-red font-semibold">
              a 15% discount to buy the same defective product again.
            </span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
            <span className="font-mono text-protest-muted/50 text-xs line-through">10%</span>
            <span className="font-mono text-protest-gold text-xs">→ upgraded to 15% after a protest threat</span>
            <span className="font-mono text-protest-muted/50 text-xs italic">(you still pay 85%)</span>
          </div>
          <p className="font-sans text-protest-muted text-sm mt-3">
            This page is the counter-offer.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
