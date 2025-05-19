export interface PontoColeta {
  id?: string
  name: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  postal_code: string
  location_type: string
  capacity_kg: number
  notes: string
  created_by?: string
  created_at?: string
}
