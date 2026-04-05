declare module '@cashfreepayments/cashfree-js' {
  interface CashfreeCheckoutOptions {
    paymentSessionId: string
    redirectTarget?: '_self' | '_blank' | '_modal' | '_top'
  }

  interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<{
      error?: { message: string }
      redirect?: boolean
      paymentDetails?: Record<string, unknown>
    }>
  }

  export function load(config: { mode: 'sandbox' | 'production' }): Promise<CashfreeInstance>
}
