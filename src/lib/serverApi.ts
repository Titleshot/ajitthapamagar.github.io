import { supabase } from './supabase'

export async function fetchAdminOverview() {
  if (!supabase) return null
  const { data, error } = await supabase.from('admin_user_overview').select('*').limit(1).maybeSingle()
  if (error) throw error
  return data
}

export async function fetchAdminDropoff() {
  if (!supabase) return []
  const { data, error } = await supabase.from('admin_dropoff_funnel').select('*').order('chapter_number')
  if (error) throw error
  return data ?? []
}

export async function fetchAdminQuizAnalytics() {
  if (!supabase) return []
  const { data, error } = await supabase.from('admin_quiz_analytics').select('*')
  if (error) throw error
  return data ?? []
}

export async function fetchHardestQuestions() {
  if (!supabase) return []
  const { data, error } = await supabase.from('admin_hardest_questions').select('*').limit(10)
  if (error) throw error
  return data ?? []
}

export async function fetchNotifications(userId: string) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('notifications')
    .select('id,title,message,is_read,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  if (error) throw error
  return data ?? []
}

export async function markNotificationRead(notificationId: string) {
  if (!supabase) return
  const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId)
  if (error) throw error
}

export async function runProgressReminderCampaign() {
  if (!supabase) return { queued: 0 }
  const { data, error } = await supabase.rpc('queue_progress_reminders')
  if (error) throw error
  return data as { queued: number }
}
