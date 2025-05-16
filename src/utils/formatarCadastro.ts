export function formatarCadastro(formData: Record<string, any>, tipo: 'pf' | 'pj') {
  const dadosFormatados: Record<string, any> = { ...formData }

  const camposTextoPadrao = ['cpf', 'telefone', 'material', 'infraestrutura', 'dias_preferencia']
  camposTextoPadrao.forEach((campo) => {
    if (campo in dadosFormatados && !dadosFormatados[campo]) {
      dadosFormatados[campo] = null
    }
  })

  return dadosFormatados
}
