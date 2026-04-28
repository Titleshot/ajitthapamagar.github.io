import { createClient, type Session, type SupabaseClient, type User } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const useSupabaseAuth = (import.meta.env.VITE_USE_SUPABASE_AUTH ?? 'false') === 'true'

/**
 * Supabase client is created when env vars are set.
 * MVP uses localStorage-backed progress; wire tables here in Phase 2.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null

export function isSupabaseConfigured(): boolean {
  return Boolean(supabase) && useSupabaseAuth
}

export function isServerProgressEnabled(): boolean {
  return (import.meta.env.VITE_ENABLE_SERVER_PROGRESS ?? 'false') === 'true'
}

export function isAdminAnalyticsEnabled(): boolean {
  return (import.meta.env.VITE_ENABLE_ADMIN_ANALYTICS ?? 'false') === 'true'
}

export function isWhatsappAutomationEnabled(): boolean {
  return (import.meta.env.VITE_ENABLE_WHATSAPP_AUTOMATION ?? 'false') === 'true'
}

export function getWhatsappConfig() {
  return {
    provider: import.meta.env.VITE_WHATSAPP_PROVIDER ?? 'mock',
    apiUrl: import.meta.env.VITE_WHATSAPP_API_URL ?? '',
    apiKey: import.meta.env.VITE_WHATSAPP_API_KEY ?? '',
  }
}

export async function getSupabaseSession(): Promise<Session | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getSupabaseUser(): Promise<User | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user
}
