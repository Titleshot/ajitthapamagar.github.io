import { getWhatsappConfig, isWhatsappAutomationEnabled } from './supabase'

export type WhatsAppTemplate =
  | 'welcome_signup'
  | 'lesson_progress_nudge'
  | 'inactive_3d'
  | 'near_completion'
  | 'rank_update'

export type WhatsAppPayload = {
  toPhone: string
  template: WhatsAppTemplate
  variables: Record<string, string | number>
}

function renderTemplate(payload: WhatsAppPayload): string {
  const v = payload.variables
  switch (payload.template) {
    case 'welcome_signup':
      return `Welcome to MIG Wealth Academy. Start your first lesson now, ${v.name ?? 'Member'}.`
    case 'lesson_progress_nudge':
      return `Great start. Complete one more lesson to unlock your next reward.`
    case 'inactive_3d':
      return `You are missing out. Continue your learning journey today.`
    case 'near_completion':
      return `You are ${v.remaining ?? 2} chapters away from your certificate.`
    case 'rank_update':
      return `Rank update: you moved up ${v.delta ?? 0} positions this week.`
    default:
      return 'Keep learning with MIG Wealth Academy.'
  }
}

export async function sendWhatsAppMessage(payload: WhatsAppPayload): Promise<{ ok: boolean; provider: string }> {
  const cfg = getWhatsappConfig()
  if (!isWhatsappAutomationEnabled()) {
    return { ok: true, provider: 'disabled' }
  }

  if (cfg.provider === 'mock' || !cfg.apiUrl) {
    // Safe fallback for local dev and preview environments.
    console.info('WhatsApp mock dispatch:', payload.toPhone, renderTemplate(payload))
    return { ok: true, provider: 'mock' }
  }

  const response = await fetch(cfg.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      to: payload.toPhone,
      message: renderTemplate(payload),
      template: payload.template,
      variables: payload.variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`WhatsApp provider returned ${response.status}`)
  }
  return { ok: true, provider: cfg.provider }
}
