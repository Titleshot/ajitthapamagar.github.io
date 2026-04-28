import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 100,
  duration: '45s',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500'],
  },
}

const base = __ENV.APP_BASE_URL || 'http://localhost:4173'

export default function () {
  const res = http.get(`${base}/quiz/ch1`)
  check(res, {
    'status is 200': (r) => r.status === 200,
  })
  sleep(0.3)
}
