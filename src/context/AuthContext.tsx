import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export type UserRole = 'member' | 'admin'

export type AuthUser = {
  id?: string
  fullName: string
  phone: string
  memberId: string
  district: string
  ageGroup?: string
  gender?: string
  role: UserRole
}

type ProfileDraft = Omit<AuthUser, 'role'> & { role?: UserRole }

type SendOtpInput = {
  phone: string
}

type VerifyOtpInput = {
  phone: string
  token: string
  profile: ProfileDraft
}

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  requiresOtp: boolean
  pendingPhone: string | null
  pendingAuthUserId: string | null
  sendOtp: (payload: SendOtpInput) => Promise<void>
  verifyOtp: (payload: { phone: string; token: string }) => Promise<{ isExistingUser: boolean }>
  completeOnboarding: (profile: Omit<AuthUser, 'role' | 'phone'> & { phone?: string }) => Promise<void>
  verifyOtpAndLogin: (payload: VerifyOtpInput) => Promise<void>
  loginFallback: (u: AuthUser) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'mig-wa-user'
const USERS_STORAGE_KEY = 'mig-wa-users'
const PENDING_PHONE_KEY = 'mig-wa-pending-phone'
const PENDING_AUTH_ID_KEY = 'mig-wa-pending-auth-id'

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

async function ensureApprovedMember(memberId: string, phone: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase
    .from('approved_members')
    .select('member_id, phone, is_active')
    .eq('member_id', memberId)
    .eq('phone', phone)
    .eq('is_active', true)
    .maybeSingle()
  if (error) throw error
  if (!data) throw new Error('Member verification failed. Please contact MIG support.')
}

async function upsertUserProfile(profile: ProfileDraft, authUserId: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const role: UserRole = profile.role === 'admin' ? 'admin' : 'member'
  const payload = {
    id: authUserId,
    full_name: profile.fullName,
    phone: profile.phone,
    member_id: profile.memberId,
    district: profile.district,
    age_group: profile.ageGroup ?? null,
    gender: profile.gender ?? null,
    role,
    last_login: new Date().toISOString(),
    last_activity_date: new Date().toISOString().slice(0, 10),
    is_active: true,
  }
  const { error } = await supabase.from('users').upsert(payload, { onConflict: 'id' })
  if (error) throw error
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingPhone, setPendingPhone] = useState<string | null>(() => localStorage.getItem(PENDING_PHONE_KEY))
  const [pendingAuthUserId, setPendingAuthUserId] = useState<string | null>(() => localStorage.getItem(PENDING_AUTH_ID_KEY))

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setUser(loadUser())
      setIsLoading(false)
      return
    }

    void (async () => {
      const { data, error } = await supabase.auth.getUser()
      if (!error && data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('id, full_name, phone, member_id, district, age_group, gender, role')
          .eq('id', data.user.id)
          .maybeSingle()
        if (profile) {
          setUser({
            id: profile.id,
            fullName: profile.full_name,
            phone: profile.phone,
            memberId: profile.member_id,
            district: profile.district,
            ageGroup: profile.age_group ?? undefined,
            gender: profile.gender ?? undefined,
            role: profile.role === 'admin' ? 'admin' : 'member',
          })
        }
      }
      setIsLoading(false)
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const sendOtp = useCallback(async ({ phone }: SendOtpInput) => {
    localStorage.setItem(PENDING_PHONE_KEY, phone)
    setPendingPhone(phone)
    if (!isSupabaseConfigured() || !supabase) {
      return
    }
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        channel: 'sms',
      },
    })
    if (error) throw error
  }, [])

  const verifyOtp = useCallback(async ({ phone, token }: { phone: string; token: string }) => {
    if (!isSupabaseConfigured() || !supabase) {
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY)
      const users = usersRaw ? (JSON.parse(usersRaw) as AuthUser[]) : []
      const existing = users.find((u) => u.phone === phone)
      if (token !== '123456') {
        throw new Error('डेमो OTP 123456 प्रयोग गर्नुहोस्।')
      }
      localStorage.setItem(PENDING_PHONE_KEY, phone)
      setPendingPhone(phone)
      if (existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
        setUser(existing)
        return { isExistingUser: true }
      }
      return { isExistingUser: false }
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })
    if (error) throw error
    if (!data.user) throw new Error('Unable to verify user session.')

    localStorage.setItem(PENDING_PHONE_KEY, phone)
    localStorage.setItem(PENDING_AUTH_ID_KEY, data.user.id)
    setPendingPhone(phone)
    setPendingAuthUserId(data.user.id)

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, full_name, phone, member_id, district, age_group, gender, role')
      .eq('id', data.user.id)
      .maybeSingle()
    if (profileError) throw profileError
    if (profile) {
      const nextUser: AuthUser = {
        id: profile.id,
        fullName: profile.full_name,
        phone: profile.phone,
        memberId: profile.member_id,
        district: profile.district,
        ageGroup: profile.age_group ?? undefined,
        gender: profile.gender ?? undefined,
        role: profile.role === 'admin' ? 'admin' : 'member',
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      setUser(nextUser)
      return { isExistingUser: true }
    }

    return { isExistingUser: false }
  }, [])

  const completeOnboarding = useCallback(
    async (profile: Omit<AuthUser, 'role' | 'phone'> & { phone?: string }) => {
      const phone = (profile.phone ?? pendingPhone ?? '').trim()
      if (!phone) throw new Error('फोन नम्बर भेटिएन। कृपया फेरि सुरु गर्नुहोस्।')
      const nextUser: AuthUser = {
        id: pendingAuthUserId ?? undefined,
        fullName: profile.fullName.trim(),
        phone,
        memberId: profile.memberId.trim(),
        district: profile.district.trim(),
        ageGroup: profile.ageGroup?.trim() || undefined,
        gender: profile.gender?.trim() || undefined,
        role: 'member',
      }

      if (!nextUser.fullName || !nextUser.memberId || !nextUser.district) {
        throw new Error('कृपया आवश्यक जानकारी पूरा गर्नुहोस्।')
      }

      if (!isSupabaseConfigured() || !supabase) {
        const usersRaw = localStorage.getItem(USERS_STORAGE_KEY)
        const users = usersRaw ? (JSON.parse(usersRaw) as AuthUser[]) : []
        const deduped = users.filter((u) => u.phone !== phone)
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...deduped, nextUser]))
      } else {
        const authId = pendingAuthUserId
        if (!authId) throw new Error('सेसन जानकारी भेटिएन। कृपया OTP फेरि पुष्टि गर्नुहोस्।')
        await upsertUserProfile(nextUser, authId)
        nextUser.id = authId
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      localStorage.removeItem(PENDING_PHONE_KEY)
      localStorage.removeItem(PENDING_AUTH_ID_KEY)
      setPendingPhone(null)
      setPendingAuthUserId(null)
      setUser(nextUser)
    },
    [pendingPhone, pendingAuthUserId],
  )

  const verifyOtpAndLogin = useCallback(async ({ phone, token, profile }: VerifyOtpInput) => {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase auth is disabled. Use fallback login in this environment.')
    }
    await ensureApprovedMember(profile.memberId, phone)
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })
    if (error) throw error
    if (!data.user) throw new Error('Unable to verify user session.')
    await upsertUserProfile(profile, data.user.id)
    const nextUser: AuthUser = {
      id: data.user.id,
      fullName: profile.fullName,
      phone,
      memberId: profile.memberId,
      district: profile.district,
      ageGroup: profile.ageGroup,
      gender: profile.gender,
      role: profile.role === 'admin' ? 'admin' : 'member',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const loginFallback = useCallback((u: AuthUser) => {
    const usersRaw = localStorage.getItem(USERS_STORAGE_KEY)
    const users = usersRaw ? (JSON.parse(usersRaw) as AuthUser[]) : []
    const deduped = users.filter((x) => x.phone !== u.phone)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...deduped, u]))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }, [])

  const logout = useCallback(async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut()
      }
    } finally {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(PENDING_PHONE_KEY)
    localStorage.removeItem(PENDING_AUTH_ID_KEY)
    setPendingPhone(null)
    setPendingAuthUserId(null)
    setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      requiresOtp: isSupabaseConfigured(),
      pendingPhone,
      pendingAuthUserId,
      sendOtp,
      verifyOtp,
      completeOnboarding,
      verifyOtpAndLogin,
      loginFallback,
      logout,
    }),
    [
      user,
      isLoading,
      pendingPhone,
      pendingAuthUserId,
      sendOtp,
      verifyOtp,
      completeOnboarding,
      verifyOtpAndLogin,
      loginFallback,
      logout,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
