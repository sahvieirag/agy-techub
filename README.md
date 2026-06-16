# Antigravity Workshop Portal — Dev Hub 🛸🌍

Fala, pessoal! Esse repositório é a nossa central oficial de laboratórios práticos (hands-on) e desafios do **Antigravity 2.0**! Criei esse espaço para vocês verem de perto a mágica da **Engenharia Cognitiva Autônoma** integrada ao **Google Gemini (via Vertex AI SDK)**.

Aqui, o foco é colocar a mão na massa de verdade e ter **100% de autonomia**! Por isso mesmo, apaguei todos os "gabaritos" das pastas públicas. Não tem colher de chá ou código pronto: o poder de comandar o agente inteligente para desenhar, codificar e testar os projetos do zero é todinho de vocês!

---

## 📢 REFAÇA A DEMO DO PALCO (TECHUB!)

> [!IMPORTANT]
> Se você assistiu à minha apresentação e quer replicar o passo a passo da **Agroindústria** (Smart Farming, leitura de satélites, cotações automáticas no ERP e plano de voo 3D do drone Ceres-1), acesse o nosso guia dedicado:
> 
> 👉 **[Guia Prático da Apresentação (Agro & Smart Farming)](./LIVE_DEMO_AGRO_APRESENTACAO.md)** 🌾🛸
> 
> *Atenção: A pasta `agy-techub-starter/agro-industry/` foi deixada **totalmente vazia de propósito**. O seu desafio é pedir para o agente criar todo o protótipo do zero usando o comando `/grill-me` e `/goal`!*

---

## 📖 EXERCÍCIOS EXTRAS DE BACKEND (BÔNUS)

> [!NOTE]
> Se você quer ir além e experimentar o laboratório de segurança de dados em APIs e SaaS Webhooks corporativos, acesse o guia complementar:
> 
> 👉 **[Exercícios Extras (Hands-On Backend & Webhooks)](./BONUS_HANDSON_BACKEND.md)** 💻🔒

---

## 🎛️ O que temos por aqui? (Estrutura do Portal)

Para facilitar a navegação, criei um portal central bonitão com design Glassmorphism que conecta todos os cenários práticos:

| Cenário | Pasta do Starter | Objetivo & Desafio Prático |
| :--- | :--- | :--- |
| 🌾 **Agro & Precision** | `agro-industry` | **Smart Farming Coordinator:** Replicar a demo da apresentação! Inicie de uma pasta vazia e faça o agente estruturar a página, simular leituras NDVI por satélite, receituário ecológico Embrapa/FAO, cotação ERP e animação em grid 3D de drones. |
| 💻 **SaaS Webhooks** | `tech-industry` | **Blindagem de Backend (Bônus):** Planejamento e criação de middleware Express em Node.js com validação criptográfica HMAC SHA-256 e mascaramento automático de PII nos logs. |
| 🎬 **Media Omnichannel** | `media-industry` | **Explosão de Conteúdo (Bônus):** Geração paralela de postagens para redes sociais baseadas na transcrição de um podcast, criação de banner cyberpunk por IA e auditoria de acessibilidade (WCAG). |

---

## 🚀 Como Rodar Tudo na Sua Máquina

Colocar o portal para rodar localmente é super simples e rápido! Você só precisa ter o **Node.js** e o **Python 3** instalados na sua máquina:

1. Clone este repositório:
   ```bash
   git clone https://github.com/sabrinaguerra/agy-techub.git
   cd agy-techub
   ```

2. Inicialize o servidor local de alta performance do Python:
   ```bash
   python3 -m http.server 8090
   ```

3. Abra o seu navegador favorito e entre em: **[http://localhost:8090](http://localhost:8090)**

---

## 🔒 Segurança em Primeiro Lugar (Secure SDLC)

Mesmo testando localmente, o Antigravity segue as melhores práticas de desenvolvimento seguro por padrão (Zero Trust e menor privilégio!):
* **Zero-Trust PII Masking:** O agente mascara e anonimiza na hora qualquer dado pessoal ou sensível (como CPFs, senhas e e-mails) antes de enviar para as LLMs. Nada de vazar dados!
* **Ambiente Controlado (Sandbox):** Todas as ações, comandos e escritas rodam em ambientes locais seguros e sempre pedem a sua autorização explícita antes de executar.
* **Gestão de Segredos:** Chaves de API e segredos nunca ficam expostos no código. Eles são ignorados no `.gitignore` e gerenciados de forma segura em tempo de execução.

---

## 🤝 Contato & Redes

Gostou do workshop ou quer bater um papo sobre como levar essa engenharia cognitiva autônoma para os times de desenvolvimento da sua empresa? Vamos nos conectar!

Desenvolvido com carinho por **[Sabrina Vieira Guerra](https://github.com/sahvieirag)**. 🛸🚀
