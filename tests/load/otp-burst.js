import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 50,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1200'],
  },
}

const base = __ENV.APP_BASE_URL || 'http://localhost:4173'

export default function () {
  const res = http.get(`${base}/login`)
  check(res, {
    'status is 200': (r) => r.status === 200,
  })
  sleep(0.5)
}
