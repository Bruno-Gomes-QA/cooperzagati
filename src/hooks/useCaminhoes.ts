'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Trucks } from '@/types'

export function useCaminhoes(search: string = '') {
  const [trucks, setTrucks] = useState<Trucks[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)

    let query = supabase
      .from('trucks')
      .select('*')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query

    if (!error && data) {
      setTrucks(data as Trucks[])
    }

    setLoading(false)
  }, [search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { trucks, loading, refetch: fetchData }
}
