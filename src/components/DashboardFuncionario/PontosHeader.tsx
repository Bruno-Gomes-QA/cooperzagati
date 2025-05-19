import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { MapPin } from 'lucide-react'

export function PontosHeader({ onSearch, onCreate }: { onSearch: (value: string) => void, onCreate: () => void }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
        <Input
          className="pl-10 bg-black border border-white/20 text-white"
          placeholder="Buscar pontos de coleta..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button
        onClick={onCreate}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 flex items-center gap-2"
      >
        <MapPin className="w-4 h-4" />
        Novo ponto
      </Button>
    </div>
  )
}
