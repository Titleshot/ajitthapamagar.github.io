/** Mock members for leaderboard previews (replace with Supabase queries). */
export type MockMember = {
  rank: number
  name: string
  district: string
  points: number
  badge: string
  segment?: 'overall' | 'weekly' | 'female' | 'youth'
}

export const MOCK_LEADERBOARD: MockMember[] = [
  { rank: 1, name: 'Sita M.', district: 'Kaski', points: 2840, badge: 'Gold Financial Champion', segment: 'overall' },
  { rank: 2, name: 'Ajit P.', district: 'Syangja', points: 2620, badge: 'Wealth Builder', segment: 'overall' },
  { rank: 3, name: 'Maya G.', district: 'Palpa', points: 2510, badge: 'Wealth Builder', segment: 'overall' },
  { rank: 4, name: 'Ramesh T.', district: 'Rupandehi', points: 2390, badge: 'Smart Planner', segment: 'overall' },
  { rank: 5, name: 'Bina K.', district: 'Chitwan', points: 2280, badge: 'Smart Planner', segment: 'overall' },
  { rank: 6, name: 'Kiran S.', district: 'Kathmandu', points: 2150, badge: 'Smart Planner', segment: 'overall' },
  { rank: 7, name: 'Anita R.', district: 'Morang', points: 2080, badge: 'Saver', segment: 'overall' },
  { rank: 8, name: 'Yubaraj L.', district: 'Dang', points: 1990, badge: 'Saver', segment: 'overall' },
  { rank: 9, name: 'Puja B.', district: 'Sunsari', points: 1920, badge: 'Saver', segment: 'overall' },
  { rank: 10, name: 'Nabin D.', district: 'Tanahu', points: 1860, badge: 'Saver', segment: 'overall' },
]

export const MOCK_WEEKLY: MockMember[] = [
  { rank: 1, name: 'Maya G.', district: 'Palpa', points: 420, badge: 'Weekly Star', segment: 'weekly' },
  { rank: 2, name: 'Ajit P.', district: 'Syangja', points: 380, badge: 'Weekly Star', segment: 'weekly' },
  { rank: 3, name: 'Sita M.', district: 'Kaski', points: 360, badge: 'Rising', segment: 'weekly' },
  { rank: 4, name: 'Ramesh T.', district: 'Rupandehi', points: 310, badge: 'Rising', segment: 'weekly' },
  { rank: 5, name: 'Bina K.', district: 'Chitwan', points: 290, badge: 'Rising', segment: 'weekly' },
]

export const MOCK_DISTRICT_KASKI: MockMember[] = MOCK_LEADERBOARD.filter((m) => m.district === 'Kaski')

export const MOCK_FEMALE_TOP: MockMember[] = [
  { rank: 1, name: 'Sita M.', district: 'Kaski', points: 2840, badge: 'Gold Financial Champion', segment: 'female' },
  { rank: 2, name: 'Maya G.', district: 'Palpa', points: 2510, badge: 'Wealth Builder', segment: 'female' },
  { rank: 3, name: 'Bina K.', district: 'Chitwan', points: 2280, badge: 'Smart Planner', segment: 'female' },
  { rank: 4, name: 'Anita R.', district: 'Morang', points: 2080, badge: 'Saver', segment: 'female' },
  { rank: 5, name: 'Puja B.', district: 'Sunsari', points: 1920, badge: 'Saver', segment: 'female' },
]

export const MOCK_YOUTH_TOP: MockMember[] = [
  { rank: 1, name: 'Kiran S.', district: 'Kathmandu', points: 2150, badge: 'Smart Planner', segment: 'youth' },
  { rank: 2, name: 'Nabin D.', district: 'Tanahu', points: 1860, badge: 'Saver', segment: 'youth' },
  { rank: 3, name: 'Yubaraj L.', district: 'Dang', points: 1990, badge: 'Saver', segment: 'youth' },
]

export const MOCK_ADMIN_USERS = [
  { id: 'u1', fullName: 'Demo Member', phone: '+9779800000001', memberId: 'MIG-10001', district: 'Kaski', points: 420, progress: 3 },
  { id: 'u2', fullName: 'Sita Magar', phone: '+9779800000002', memberId: 'MIG-10002', district: 'Palpa', points: 890, progress: 7 },
  { id: 'u3', fullName: 'Ajit Thapa', phone: '+9779800000003', memberId: 'MIG-10003', district: 'Syangja', points: 1200, progress: 10 },
]
