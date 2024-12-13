'use server'

export async function handler() {
  try {
    console.log(process.env)
    const VERCEL_BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN as string
    if (!VERCEL_BYPASS_TOKEN) {
      throw new Error('VERCEL_BYPASS_TOKEN is not defined')
    }
    const res = await fetch(`https://actuali.net/api/auth/login?x-vercel-protection-bypass=${VERCEL_BYPASS_TOKEN}`, { 
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${55}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId: 0 })
    })

    if (res.status !== 200) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const response = await res.json()
    console.log({ response })
    return response

  } catch (e) {
    console.error('Login error:', e)
    return { 
      error: e instanceof Error ? e.message : 'Unknown error occurred', 
      status: 500 
    }
  }
} 