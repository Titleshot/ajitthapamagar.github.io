const baseUrl = process.env.APP_BASE_URL ?? 'http://localhost:4173'

async function assertOk(path) {
  const res = await fetch(`${baseUrl}${path}`)
  if (!res.ok) throw new Error(`Smoke test failed for ${path}: ${res.status}`)
}

async function run() {
  await assertOk('/')
  await assertOk('/login')
  console.log(`Smoke checks passed for ${baseUrl}`)
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
