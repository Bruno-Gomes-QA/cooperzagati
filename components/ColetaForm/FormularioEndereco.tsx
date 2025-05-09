import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResultadoEndereco } from './ResultadoEndereco'
import { MapPin } from 'lucide-react'

interface Props {
  emCasa: boolean | null
  setEmCasa: Dispatch<SetStateAction<boolean | null>>
  handleSelecao: (valor: boolean) => void
  cep: string
  buscarEnderecoPorCep: (cep: string) => void
  endereco: {
    logradouro: string
    bairro: string
    localidade: string
    uf: string
  } | null
}

export function FormularioEndereco({
  emCasa,
  handleSelecao,
  cep,
  buscarEnderecoPorCep,
  endereco,
}: Props) {
  return (
    <form className="w-full md:w-1/2 p-6 sm:p-10 text-white space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">Cadastre seu local</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" required className="bg-black text-white border border-white/20 rounded-md" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="moradores">Quantas pessoas moram com você?</Label>
        <Input
          type="number"
          id="moradores"
          name="moradores"
          required
          className="bg-black text-white border border-white/20 rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label>Você está em sua residência agora?</Label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={emCasa === true ? 'default' : 'outline'}
            onClick={() => handleSelecao(true)}
            className="rounded-full"
          >
            Sim
          </Button>
          <Button
            type="button"
            variant={emCasa === false ? 'default' : 'outline'}
            onClick={() => handleSelecao(false)}
            className="rounded-full"
          >
            Não
          </Button>
        </div>
      </div>

      {emCasa === true && endereco && <ResultadoEndereco endereco={endereco} />}

      {emCasa === false && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              name="cep"
              value={cep}
              onChange={(e) => buscarEnderecoPorCep(e.target.value)}
              placeholder="00000-000"
              className="bg-black text-white border border-white/20 rounded-md"
              />
          </div>
      {emCasa === false && endereco && <ResultadoEndereco endereco={endereco} />}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white rounded-full">
            Enviar informações
          </Button>
        </>
      )}
    </form>
  )
}
