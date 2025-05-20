# ♻️ Cooperzagati

**Cooperzagati** é uma plataforma desenvolvida para conectar cidadãos e empresas de Taboão da Serra com a cooperativa ambiental local. O sistema permite encontrar pontos de coleta, agendar retiradas de recicláveis, acessar materiais educativos e muito mais, promovendo a consciência ambiental e facilitando a logística de reciclagem urbana.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Google Maps API](https://developers.google.com/maps)

---

## 🛠️ Funcionalidades

- Autenticação via Google
- Cadastro de Pessoa Física e Jurídica
- Visualização de pontos de coleta
- Agendamento de coletas
- Dashboard exclusivo para usuários e funcionários
- Visualização de rotas e distância até a cooperativa
- Painel administrativo para gestão dos pontos

---

## 📦 Instalação local

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/cooperzagati.git
cd cooperzagati
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<SEU_PROJETO>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUA_ANON_KEY>
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<SUA_API_KEY_GOOGLE>
```

> Você pode obter a chave do Google Maps [aqui](https://console.cloud.google.com/google/maps-apis)

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

Acesse o projeto em [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com este projeto!

1. Faça um fork
2. Crie uma nova branch com a sua feature: `git checkout -b minha-feature`
3. Faça o commit: `git commit -m 'Minha nova feature'`
4. Faça o push para a sua branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é open-source e está sob a licença [MIT](LICENSE).

---

## 💚 Feito com propósito

Desenvolvido por estudantes com a missão de tornar a reciclagem mais acessível, tecnológica e humana.