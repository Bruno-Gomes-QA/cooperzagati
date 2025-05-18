type CadastroPF = {
  cpf?: string
  telefone?: string
  material?: string
}

type CadastroPJ = {
  infraestrutura?: string
  dias_preferencia?: string
}

type Cadastro = CadastroPF | CadastroPJ

export function formatarCadastro<T extends Cadastro>(formData: T): T {
  const dadosFormatados = { ...formData }

  const camposTextoPadrao = ['cpf', 'telefone', 'material', 'infraestrutura', 'dias_preferencia']
  camposTextoPadrao.forEach((campo) => {
    if ((dadosFormatados as Record<string, string | null>)[campo] === '') {
      (dadosFormatados as Record<string, string | null>)[campo] = null
    }
  })

  return dadosFormatados
}
