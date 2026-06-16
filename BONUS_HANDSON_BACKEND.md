# Manual Prático Hands-On: Desenvolvendo com Antigravity CLI & Desktop 2.0

Bem-vindo ao workshop prático do **Agy-TechHub**! Este guia passo-a-passo foi desenhado para que você possa replicar de forma 100% prática (hands-on) os mesmos fluxos autônomos de engenharia cognitiva e segurança que demonstramos na nossa apresentação oficial da Agent Platform do Google.

Neste laboratório, você atuará como Engenheiro de Software em dois cenários industriais:
1. **Tech Webhooks (B2B SaaS):** Construindo um backend seguro e blindado contra ataques de injeção e falsificação de payloads na CLI `agy`.
2. **Media Engine (Marketing):** Criando uma máquina inteligente de explosão de conteúdo de mídia com geração gráfica de IA e auditoria de acessibilidade de layout no Antigravity Desktop.

---

## ⚙️ Pré-requisitos de Instalação e Setup

Certifique-se de ter os seguintes recursos prontos na sua máquina:
1. **Node.js** (versão 18 ou superior).
2. **Git** configurado localmente.
3. **Antigravity CLI (`agy`)** instalado e autenticado.
4. **Antigravity 2.0 Desktop App** instalado.

---

## 📁 Estrutura Inicial do Workshop

Abra o repositório clonado na sua máquina e inicie o servidor HTTP local para rodar os portais interativos:
```bash
cd agy-techub
python3 -m http.server 8090
```

Agora abra `http://localhost:8090` no seu navegador! Você verá o **Antigravity Dev Hub**, de onde poderá acessar os pontos de partida (Starters) para exercitar a sua autonomia prática.

---

## 🚀 Módulo 1: Protegendo Backends de SaaS Webhooks (CLI `agy`)

**Objetivo:** Implementar um servidor backend Node.js robusto, integrado com validação criptográfica HMAC SHA-256 e logs que respeitam as regras do Secure SDLC e Zero Trust (mascaramento de PII).

### Passo 1.1: Visualizando o Ponto de Partida (Starter)
1. No portal do workshop (`http://localhost:8090`), clique em **"Abrir Starter (Protótipo Visual)"** no card de *SaaS Webhooks*.
2. Observe o painel Glassmorphism rodando em `agy-techub-starter/tech-industry/`. Ele simula disparos de webhooks contra Stripe, HubSpot e Salesforce de forma dinâmica.
3. *O problema:* A lógica é simulada no cliente. Não temos um servidor real de destino verificando se as requisições que chegam de parceiros externos são legítimas ou foram falsificadas criptografadamente no tráfego.

### Passo 1.2: Sabatina Técnica com o `/grill-me`
Abra o terminal na pasta do starter `agy-techub-starter/tech-industry/` e execute o assistente para alinhar os requisitos técnicos:
```bash
/grill-me planejar um middleware de segurança HMAC SHA-256 em Node.js para os endpoints de webhooks Stripe, HubSpot e Salesforce
```
> **Ação Prática:** O agente iniciará uma entrevista curta de 3 a 4 perguntas direto no terminal sobre portas de rede, tratamento de chaves secretas no arquivo `.env` e políticas de privacidade de logs de CPFs e e-mails de clientes (PII). Responda a cada pergunta diretamente para alinhar as decisões.

### Passo 1.3: Loop de Geração e Autocorreção com `/goal`
Agora mande o agente escrever as rotas e os scripts com base no plano acordado. O agente iniciará uma branch Git automática e começará o loop de escrita:
```bash
/goal criar o servidor backend webhook_receiver.js com o middleware de validação HMAC seguro e o gerador de simulações customer_mock.js
```
> **Ação Prática:**
> 1. Observe o terminal pausar e solicitar autorização interativa explicita antes de criar cada arquivo técnico local. Digite `y` para permitir.
> 2. Caso o projeto não tenha dependências cruciais como `express` ou `dotenv`, observe o agente atualizar o arquivo `package.json`, instalar de forma autônoma os pacotes via npm e depurar lints de dependências em loop até que o console esteja limpo.

### Passo 1.4: Validação do Backend e Logs Protegidos
1. Inicie o servidor gerado pelo agente:
   ```bash
   npm run start
   ```
2. Em outro terminal, execute o mock de testes de tráfego de rede para simular disparos reais com assinaturas legítimas e inválidas:
   ```bash
   node customer_mock.js
   ```
3. Observe os cabeçalhos `X-Hub-Signature-256` calculados em criptografia SHA-256 em tempo real sendo interceptados e validados com segurança.
4. Confira as saídas de logs no console: todos os emails ou CPFs de clientes simulados foram anonimizados no servidor, respeitando as regras estritas da LGPD/GDPR!

---

## 🖥️ Módulo 2: Geração e Injeção Omnichannel de Mídia (Desktop 2.0)

**Objetivo:** Ler a transcrição de áudio de um podcast executivo de tecnologia, sintetizar dezenas de formatos de postagens, desenhar e injetar um cabeçalho gráfico customizado de alta qualidade e auditar a acessibilidade da UI no navegador de forma autônoma.

### Passo 2.1: Analisando o Dashboard de Mídia Starter
1. No seu Portal de Workshop, abra o **"Abrir Starter (Sem Conteúdo)"** do card de *Media Omnichannel*.
2. Note que os cards Glassmorphic estão vazios (aguardando os posts para LinkedIn, Twitter, Newsletter e Blog) e o banner superior do cabeçalho possui apenas um placeholder cinza genérico.

### Passo 2.2: Enviando o Prompt no Antigravity 2.0 Desktop
1. Abra o aplicativo **Antigravity 2.0 Desktop**.
2. Adicione o diretório `agy-techub` como o seu workspace ativo de trabalho.
3. No console de chat do agente Desktop, cole o prompt de alto impacto:
   ```text
   Analise o arquivo podcast_transcript.txt na pasta media-industry e gere as postagens de divulgação para LinkedIn, Twitter/X e Newsletter de e-mail. Além disso, crie um banner cyberpunk espetacular chamado podcast_banner.png, salve-o em assets/ e o embuta no index.html. Por fim, use o seu navegador controlado para validar o layout e auditar a acessibilidade no Chrome DevTools.
   ```

### Passo 2.3: O Modo Planejamento e a Execução de IA
1. Observe o agente Desktop entrar em **Modo Planejamento (Planning Mode)** e criar o arquivo `implementation_plan.md` detalhando cada arquivo que será criado ou modificado. Revise e aprove com um clique!
2. O agente iniciará as sub-rotinas em paralelo:
   - Lê a transcrição longa e sintetiza posts fidedignos para redes de alta conversão.
   - Dispara a ferramenta criativa de geração de imagem (`generate_image`) para desenhar o banner cyberpunk de topo em alta resolução.
   - Edita e injeta cirurgicamente as postagens e a nova tag de imagem de cabeçalho no arquivo `index.html`.

### Passo 2.4: Agent-Controlled Browser e Auditoria de Acessibilidade
1. Assista à janela do **Agent-Controlled Browser** se abrindo de forma autônoma na tela. O agente começa a navegar e clica nas abas do carrossel do dashboard para testar as transições e as animações de hover. Caso não o faça, você pode fazer o trigger com /browser!
2. Durante os testes de layout, o agente se conecta ao console do **Chrome DevTools** e audita os contrastes.
3. Se ele identificar problemas de contraste de cor nas caixas transparentes Glassmorphic (conforme a norma WCAG), ele abrirá o arquivo de estilos local `styles.css`, corrigirá a cor do texto para uma tonalidade acessível, injetará a correção e atualizará os testes no navegador até obter 100% de conformidade!

### Passo 2.5: Revisando o Recibo Técnico (Visual Artifact)
1. No painel lateral do Desktop, confira o **Visual Artifact** consolidado.
2. Assista ao vídeo de gravação que o agente gerou da navegação real na tela para certificar o visual.
3. Aprove a conclusão técnica com um clique para fazer o commit de conformidade e abrir o Pull Request finalizado!

---

## 🏆 Conclusão do Workshop

Incrível! Você acabou de experimentar e replicar o ecossistema de engenharia cognitiva mais robusto e seguro do mundo!
- **Segurança por Padrão:** Criptografia HMAC e mascaramento de PII.
- **Fidelidade Estética:** Geração de imagens ricas, layouts a 60fps em Glassmorphism e autodepuração integrada de acessibilidade via Chrome DevTools.
- **Controle Total:** Human-in-the-loop por meio de aprovações em cliques e comandos interativos de SRE.
