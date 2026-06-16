# Guia de Demonstração Techub — Engenharia Cognitiva com Antigravity 2.0 🌾🛸

Fala, pessoal! 👋

Que massa ter vocês por aqui! Se você participou da minha sessão do Techub, viu de perto o poder da Engenharia Cognitiva Autônoma e as novidades espetaculares do **Antigravity 2.0**.

Este repositório foi feito com muito carinho para que você possa colocar as mãos na massa e rodar — na sua própria máquina — exatamente os mesmos fluxos autônomos que mostrei no palco. Sem segredos, direto ao ponto.

Bora colocar os agentes de IA para codificar, navegar e testar por você? 🚀

---

## ⚙️ Preparando o Terreno (Setup Rápido)

Para rodar o portal interativo na sua máquina, certifique-se de ter o **Node.js** e o **Python 3** instalados, e siga estes passos simples:

1. Abra o terminal na pasta onde você clonou este repositório:
   ```bash
   cd agy-techub
   ```

2. Inicialize o nosso servidor de portal local:
   ```bash
   python3 -m http.server 8090
   ```

3. Abra o seu navegador e acesse: **[http://localhost:8090](http://localhost:8090)**

Pronto! Você verá o **Antigravity Dev Hub**, o painel central de onde poderá navegar entre os Starters e as soluções completas das nossas indústrias de simulação com um único clique.

---

## 🌾 Módulo Prático: Smart Farming & Inteligência de Agro (A Demo do Palco!)

No nosso Techhub, o foco principal foi ver como criar uma lógica inteligente de Agro do absoluto zero usando a **Antigravity CLI** e desafiando o agente com o comando `/grill-me`. Bora refazer esse fluxo passo-a-passo?

### Passo 1: O Desafio da Tela em Branco (Zero Code!)
1. A pasta do Starter de Agro (`agy-techub-starter/agro-industry/`) foi deixada **totalmente vazia de propósito**! O botão "Abrir Starter" no portal está desativado porque não há nenhuma página para renderizar.
2. Seu primeiro grande desafio é pedir para o agente criar toda a interface (`index.html`, `style.css` e `app.js`) do absoluto zero! Isso demonstra a capacidade real do agente de planejar e programar um painel interativo sem ter nenhuma base prévia.

### Passo 2: Alinhando Requisitos com o `/grill-me`
Abra o seu terminal na pasta do Starter de Agro:
```bash
cd agy-techub-starter/agro-industry
```

Agora, execute o assistente de perguntas e respostas para fazer o alinhamento de requisitos técnicos sobre a criação do painel e as funcionalidades da demo:
```bash
/grill-me planejar a criação do zero de um painel interativo de Smart Farming (HTML, CSS e JS) para a agro-industry
```

> [!IMPORTANT]
> **O que acontece aqui?**
> O agente iniciará uma **"sabatina técnica"** rápida de 3 a 4 perguntas inteligentes diretamente no seu terminal! Ele vai te questionar sobre as seções visuais que você deseja no painel, como simular os logs de satélite do Sentinel-2 (NDVI), como formatar a cotação de bio-fungicida no ERP e qual modelo de drone de pulverização (como o Ceres-1) deve ser despachado. 
> Responda diretamente no terminal para alinhar as decisões de design com o agente. É o famoso alinhamento de escopo interativo!

### Passo 3: Criando os Arquivos do Zero com o `/goal`
Agora que você e o agente estão em perfeita sintonia e o plano de implementação foi acordado, peça para ele gerar toda a interface e lógica funcional:
```bash
/goal criar todos os arquivos (index.html, style.css e app.js) para o painel interativo de agro e implementar a lógica de simulação
```

> [!TIP]
> **Ação Prática:**
> 1. Observe o agente iniciar o loop de criação e escrita de arquivos no diretório que estava completamente vazio. Ele criará o layout HTML/CSS dark cyberpunk com tema esmeralda, os estados da demonstração (`analyzing`, `ready-to-approve`, `flying`, `spraying`, `completed`), as funções de efeito máquina de escrever para os logs do terminal interativo e a simulação de voo do drone Ceres-1.
> 2. Caso ele identifique problemas de renderização ou lints, ele mesmo vai depurar e ajustar até que tudo esteja validado de forma autônoma!
> 3. **Segurança em primeiro lugar:** O agente solicitará sua autorização explícita para criar e salvar cada arquivo no diretório. Digite `y` para permitir!

### Passo 4: Testando o Painel Inteligente Criado
1. Depois que o agente finalizar a criação, o portal já estará apto a servir a página!
2. Abra o seu navegador e vá direto para: **`http://localhost:8090/agy-techub-starter/agro-industry/index.html`**
3. Clique no botão **"Iniciar Análise"** e assista ao show de orquestração autônoma! 🌾🛸
   * O sistema conecta ao satélite Sentinel-2 e simula a leitura do índice de fotossíntese NDVI no talhão Alpha 3.
   * Ele detecta a anomalia (Ferrugem do Trigo) e consulta as bases da Embrapa/FAO em tempo real para prescrever o Fungicida de Cobre Orgânico.
   * Uma cotação de compra do insumo biológico é gerada no ERP corporativo da fazenda.
   * O painel exibe uma caixa interativa de aprovação de segurança (*Gatekeeper / Human-in-the-loop*). Ao clicar em **"Aprovar Ação"**, o drone Ceres-1 decola em um grid de voo 3D animado na tela e faz a pulverização precisa na área doente!

---

## 🏆 Desafios de Sobremesa (Challenges!)

Agora que você já dominou o fluxo principal, que tal testar outros comandos incríveis da nossa plataforma? Separei alguns desafios de engenharia cognitiva para você pirar o cabeção e ver o Antigravity em ação:

### 🚀 Desafio 1: O Programador Autônomo com `/goal`
Que tal adicionar mais realismo e variáveis à simulação do drone Ceres-1?
* **O Caso de Uso:** Queremos que o drone leve em conta a velocidade do vento local e o nível de bateria ao traçar o plano de voo em grid 3D no canvas. Se a bateria estiver abaixo de 20%, o painel deve exibir um alerta de "Retornando para a Base".
* **Como testar:** Na pasta do starter de Agro, execute:
  ```bash
  /goal adicionar monitoramento de bateria de drone e velocidade do vento na simulação do app.js
  ```
* **O que observar:** Veja como o agente analisa o código que ele mesmo gerou anteriormente, planeja a alteração de forma cirúrgica, edita o arquivo de forma inteligente e resolve os lints locais de forma totalmente autônoma.

### 🌐 Desafio 2: Auditoria Visual Automática com `/browser`
Nossos agentes conseguem controlar e interagir com navegadores reais de forma autônoma para testar layouts e auditar acessibilidade.
* **O Caso de Uso:** Queremos verificar se as cores de texto cinza e as caixas transparentes (*Glassmorphism*) do portal têm contraste suficiente para pessoas com baixa visão de acordo com as normas globais de acessibilidade (WCAG).
* **Como testar:** No chat do seu Antigravity Desktop, envie:
  ```text
  Abra o portal do workshop em http://localhost:8090, navegue pelas demos e use o Chrome DevTools para auditar o contraste de cores e a acessibilidade (a11y) do painel de Agro. Se houver problemas de contraste de cor, corrija cirurgicamente os estilos em style.css.
  ```
* **O que observar:** Uma janela do navegador controlado pelo agente se abrirá. Você o verá clicar nas abas, interagir com a tela e ler o console do Chrome DevTools. Se ele achar problemas de acessibilidade, ele vai abrir o arquivo CSS local, ajustar o tom das cores de forma acessível e atualizar a página até obter 100% de conformidade!

### 🕒 Desafio 3: O Guardião Preventivo com `/schedule`
Que tal automatizar varreduras periódicas em segundo plano para monitorar anomalias na fazenda?
* **O Caso de Uso:** Em vez de rodar manualmente, queremos que o agente execute uma rotina em segundo plano ("cron job") a cada 10 segundos para buscar novas fotos de satélite e nos alertar caso o NDVI caia abaixo de 0.65 de forma preventiva.
* **Como testar:** No chat do seu agente, execute:
  ```text
  Agende uma tarefa periódica a cada 10 segundos usando a ferramenta de schedule para simular uma varredura de NDVI no campo e me envie uma notificação urgente se o índice cair abaixo do limite saudável de 0.65.
  ```
* **O que observar:** O agente cria um agendador interno. Você verá as varreduras rodando em background e, se o índice cair, o agente chama você com uma notificação detalhando a anomalia!

---

## 🔒 Princípios de Segurança (Secure SDLC) nos Bastidores

Todo o código gerado pelo agente durante os seus desafios segue estritamente as regras corporativas de segurança por padrão (*Secure by Default*):

* **Zero-Trust PII Masking:** Quaisquer dados sensíveis de operadores ou clientes (como CPF, e-mail, senhas) inseridos nos formulários são mascarados localmente na sua máquina antes de serem transmitidos para os modelos em nuvem.
* **Least Privilege:** O agente opera em sandboxes isolados, solicitando permissões explícitas no terminal apenas para as pastas necessárias do seu workspace.
* **Secret Management:** Chaves de API e variáveis de ambiente são guardadas estritamente em arquivos `.env` locais, totalmente protegidos e ignorados no `.gitignore` para evitar vazamento em repositórios públicos.

---

## 🛸 E aí, curtiu?

Agora a bola está com você! Faça o clone do repositório, explore os Starters, desafie os agentes nos seus próprios cenários de negócios e sinta o poder da engenharia cognitiva autônoma na ponta dos seus dedos!

Se precisar de ajuda ou quiser trocar uma ideia sobre como aplicar esses casos de uso de IA na sua empresa, é só me chamar no GitHub ou LinkedIn! 😉

Criado com carinho por **Sabrina Vieira Guerra** 🛸🚀
