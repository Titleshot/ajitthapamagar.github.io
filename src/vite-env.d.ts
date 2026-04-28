/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_USE_SUPABASE_AUTH?: string
  readonly VITE_ENABLE_SERVER_PROGRESS?: string
  readonly VITE_ENABLE_ADMIN_ANALYTICS?: string
  readonly VITE_ENABLE_WHATSAPP_AUTOMATION?: string
  readonly VITE_WHATSAPP_PROVIDER?: string
  readonly VITE_WHATSAPP_API_URL?: string
  readonly VITE_WHATSAPP_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
