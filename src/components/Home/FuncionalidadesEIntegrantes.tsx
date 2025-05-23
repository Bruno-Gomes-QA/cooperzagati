'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const funcionalidades = [
  "Encontrar ponto de coleta mais próximo",
  "Gerar rotas otimizadas",
  "Cadastrar novos pontos de coleta",
  "Gerenciar caminhões",
  "Visualizar mapa e painéis"
]

const membros = [
  { nome: "Bruno Menezes", email: "bruno.gomes.108775@a.fecaf.com.br" },
  { nome: "Vinícius Gabriel", email: "vinicius.silva.109086@a.fecaf.com.br"},
  { nome: "Camila Oliveira", email: "camila.nascimento.108869@a.fecaf.com.br"},
  { nome: "Vitor Souza", email: "vitor.ferreira.107889@a.fecaf.com.br" },
  { nome: "Henrique Siqueira", email: "henrique.siqueira@a.fecaf.com.br" },
]

export function FuncionalidadesEIntegrantes() {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      
      <AccordionItem value="funcionalidades">
        <AccordionTrigger className="text-green-500">Funcionalidades do Sistema</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {funcionalidades.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="integrantes">
        <AccordionTrigger className="text-green-500">Integrantes do Grupo</AccordionTrigger>
        <AccordionContent className="space-y-3">
          {membros.map((m, i) => (
            <div key={i} className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{m.nome[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-white">{m.nome}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
