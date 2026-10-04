'use client'

import { useEffect, useState } from 'react'

export function useDashboardData(careerId: string | null) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!careerId) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dashboard?careerId=${careerId}`)
        if (!res.ok) throw new Error('Failed to fetch dashboard')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [careerId])

  return { data, loading, error }
}

export function useMatches(careerId: string | null) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!careerId) {
      setLoading(false)
      return
    }

    const fetchMatches = async () => {
      try {
        const res = await fetch(`/api/matches?careerId=${careerId}`)
        if (!res.ok) throw new Error('Failed to fetch matches')
        const json = await res.json()
        setMatches(json.matches || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [careerId])

  return { matches, loading, error }
}

export function useTransfers(careerId: string | null) {
  const [transfers, setTransfers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!careerId) {
      setLoading(false)
      return
    }

    const fetchTransfers = async () => {
      try {
        const res = await fetch(`/api/transfers?careerId=${careerId}`)
        if (!res.ok) throw new Error('Failed to fetch transfers')
        const json = await res.json()
        setTransfers(json.transfers || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTransfers()
  }, [careerId])

  return { transfers, loading, error }
}

export function useTrophies(careerId: string | null) {
  const [trophies, setTrophies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!careerId) {
      setLoading(false)
      return
    }

    const fetchTrophies = async () => {
      try {
        const res = await fetch(`/api/trophies?careerId=${careerId}`)
        if (!res.ok) throw new Error('Failed to fetch trophies')
        const json = await res.json()
        setTrophies(json.trophies || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTrophies()
  }, [careerId])

  return { trophies, loading, error }
}

export function useAnalytics(careerId: string | null) {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!careerId) {
      setLoading(false)
      return
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/analytics?careerId=${careerId}&type=all`)
        if (!res.ok) throw new Error('Failed to fetch analytics')
        const json = await res.json()
        setAnalytics(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [careerId])

  return { analytics, loading, error }
}
