import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function clean(v: string | undefined) {
  let s = (v ?? '').trim()
  while (s.charCodeAt(0) === 65279) s = s.slice(1)
  return s.trim()
}

const SUPABASE_URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL)
const SUPABASE_ANON = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const SUPABASE_SERVICE = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}

export function createServiceClient() {
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_SERVICE,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}
