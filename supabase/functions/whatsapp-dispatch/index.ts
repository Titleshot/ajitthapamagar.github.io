// deno-lint-ignore-file no-explicit-any
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

type RequestBody = {
  to: string
  message: string
  template?: string
  variables?: Record<string, string | number>
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = (await req.json()) as RequestBody
  const provider = Deno.env.get('WHATSAPP_PROVIDER') ?? 'mock'

  if (provider === 'mock') {
    console.log('Mock WhatsApp send', body)
    return new Response(JSON.stringify({ ok: true, provider: 'mock' }), {
      headers: { 'content-type': 'application/json' },
    })
  }

  // Provider integration placeholder:
  // - Twilio WhatsApp API
  // - Meta WhatsApp Business API
  // This endpoint is intentionally provider-agnostic.
  return new Response(JSON.stringify({ ok: true, provider, queued: true }), {
    headers: { 'content-type': 'application/json' },
  })
})
