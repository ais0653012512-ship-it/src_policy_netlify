import { NextRequest, NextResponse } from 'next/server'

function isLikelyIp(value: string): boolean {
  const v = value.trim()
  if (!v || v === 'unknown' || v === '::1' || v === '127.0.0.1') return false
  // IPv4
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(v)) return true
  // IPv6 (basic)
  if (v.includes(':')) return true
  return false
}

/** Ưu tiên header của Netlify / Cloudflare / proxy, rồi mới x-forwarded-for. */
function getClientIp(req: NextRequest): string | null {
  const headerCandidates = [
    req.headers.get('x-nf-client-connection-ip'),
    req.headers.get('cf-connecting-ip'),
    req.headers.get('true-client-ip'),
    req.headers.get('x-real-ip'),
    req.headers.get('x-client-ip'),
    req.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ?? null,
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
  ]

  for (const candidate of headerCandidates) {
    if (candidate && isLikelyIp(candidate)) return candidate.trim()
  }

  return null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const queryIp = searchParams.get('ip')?.trim() || null
  const clientIp = queryIp && isLikelyIp(queryIp) ? queryIp : getClientIp(req)

  if (!clientIp) {
    return NextResponse.json(
      {
        error: 'Could not determine client IP',
        ip: '',
        country: 'Unknown',
        countryCode: 'US',
        region: '',
        regionName: '',
        city: '',
        timezone: '',
        location: 'Unknown | Unknown(US)',
      },
      { status: 200 }
    )
  }

  try {
    const fields =
      'status,message,country,countryCode,region,regionName,city,timezone,query'
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(clientIp)}?fields=${fields}`,
      {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      }
    )

    if (!response.ok) {
      throw new Error(`ip-api HTTP ${response.status}`)
    }

    const data = (await response.json()) as {
      status?: string
      message?: string
      country?: string
      countryCode?: string
      region?: string
      regionName?: string
      city?: string
      timezone?: string
      query?: string
    }

    if (data.status === 'fail') {
      throw new Error(data.message || 'ip-api lookup failed')
    }

    const ip = (data.query || clientIp).trim()
    const regionName = data.regionName || ''
    const region = data.region || ''
    const city = data.city || ''
    const country = data.country || 'Unknown'
    const countryCode = data.countryCode || 'US'
    const timezone = data.timezone || ''

    const placeParts = [city, regionName ? `${regionName}${region ? `(${region})` : ''}` : '']
      .filter(Boolean)
      .join(', ')

    const location = `${placeParts || 'Unknown'} | ${country}(${countryCode})`

    return NextResponse.json({
      ...data,
      ip,
      country,
      countryCode,
      region,
      regionName,
      city,
      timezone,
      location,
    })
  } catch (error: any) {
    console.error('ip-location error:', error?.message || error)
    return NextResponse.json(
      {
        error: 'Failed to fetch IP data',
        ip: clientIp,
        country: 'Unknown',
        countryCode: 'US',
        region: '',
        regionName: '',
        city: '',
        timezone: '',
        location: `Unknown | Unknown(US)`,
      },
      { status: 200 }
    )
  }
}
