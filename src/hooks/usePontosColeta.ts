'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { PontoColeta } from '@/types'

export function usePontosColeta(search: string) {
  const [pontos, setPontos] = useState<PontoColeta[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)

    let query = supabase
      .from('collection_points')
      .select('*')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query

    if (!error && data) {
      setPontos(data as PontoColeta[])
    }

    setLoading(false)
  }, [search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { pontos, loading, refetch: fetchData }
}
