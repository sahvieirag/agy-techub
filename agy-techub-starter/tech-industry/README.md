# Gemini Server-Prise 🚀
## Autonomous B2B Integration & Webhook Connector Generator

O **Gemini Server-Prise** é um painel de controle premium que demonstra o poder do **Gemini Server-Prise SDK** na automação e segurança de integrações corporativas de webhooks e conectores de APIs de terceiros.

A aplicação é uma SPA (Single Page Application) desenvolvida puramente com **HTML5, CSS3 avançado (com Glassmorphism e Tema Claro)** e **JavaScript nativo**, oferecendo uma experiência de exploração rica, visualmente impactante e interativa.

---

### 🎨 Recursos de Design
*   **Light Theme Premium:** Inspirado na Stripe e Apple, com fundos limpos (`#f8fafc`), sombras suaves e bordas elegantes.
*   **Console do Agente:** Uma IDE escura simulando uma máquina de desenvolvimento integrada para visualizar o código Node.js gerado.
*   **Playground Interativo de Webhooks:** Um espaço onde você pode disparar payloads de teste e simular ataques reais de rede (Assinatura corrompida, Replay Attack, Rate Limit Spam).

---

### 📦 Como Rodar a Aplicação

Para iniciar o servidor local de desenvolvimento na porta **5174**:

```bash
npm run dev
```

Abra o seu navegador em:
👉 [http://localhost:5174](http://localhost:5174)

---

### 💡 Cenários Disponíveis para Simulação
1.  **Stripe Payment Webhook (JSON OpenAPI):** Validação estrita de assinatura criptográfica `HMAC-SHA256`.
2.  **Salesforce Lead Sync (YAML Spec):** Autorização via `Bearer Token` e regras de conformidade de schema corporativo.
3.  **HubSpot Contact Event (Markdown Text):** Parsing semântico inteligente a partir de um documento de texto não estruturado para criar um conector robusto.
