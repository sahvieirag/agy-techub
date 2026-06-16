// ==========================================================================
// GEMINI SERVER-PRISE CONNECT - LÓGICA DE INTERATIVIDADE & SIMULAÇÕES
// ==========================================================================

// 1. BASE DE ESPECIFICAÇÕES DOS PARCEIROS (MOCK SPECS)
const PARTNER_SPECS = {
  stripe: {
    filename: "stripe_webhook_spec.json",
    format: "openapi 3.0",
    code: `{
  "openapi": "3.0.0",
  "info": {
    "title": "Stripe Payments Webhooks",
    "version": "2026-05"
  },
  "paths": {
    "/v1/webhooks": {
      "post": {
        "summary": "Recebe notificações de eventos de pagamentos",
        "parameters": [
          {
            "name": "Stripe-Signature",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "Assinatura HMAC-SHA256 e timestamp (t=..., v1=...)"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Event"
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Evento recebido e processado com sucesso" },
          "400": { "description": "Payload inválido ou malformado" },
          "401": { "description": "Assinatura HMAC ausente ou inválida" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Event": {
        "type": "object",
        "required": ["id", "type", "created", "data"],
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" },
          "created": { "type": "integer" },
          "data": {
            "type": "object",
            "properties": {
              "object": { "type": "object" }
            }
          }
        }
      }
    }
  }
}`
  },
  salesforce: {
    filename: "salesforce_lead_stream.yaml",
    format: "yaml spec",
    code: `openapi: 3.0.1
info:
  title: Salesforce Enterprise Event Stream (Lead Integration)
  version: v42.0
paths:
  /leads/sync:
    post:
      summary: Sincroniza informações de Leads em tempo real do CRM
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [leadId, companyName, email, status]
              properties:
                leadId:
                  type: string
                companyName:
                  type: string
                email:
                  type: string
                  format: email
                status:
                  type: string
                  enum: [New, Contacted, Qualified, Closed]
      responses:
        200:
          description: Lead integrado com sucesso
        401:
          description: Token de Autorização Bearer inválido ou expirado
        422:
          description: Erro de validação dos campos obrigatórios do Lead`
  },
  hubspot: {
    filename: "hubspot_integration_guide.md",
    format: "markdown text",
    code: `# HubSpot Webhook Integration Protocol (Informal Guide)

Sempre que um contato ou negócio mudar de estado na nossa plataforma, nós vamos enviar uma requisição HTTP POST para o endpoint que você configurar nas configurações de desenvolvedor do seu portal.

## Autenticação
Para validar as requisições, você deve verificar o token estático enviado no cabeçalho personalizado HTTP:
\`\`\`http
X-HubSpot-Secret:hs_sec_991823ab
\`\`\`

## Formato do Evento (Payload JSON)
O corpo da requisição será uma lista/array contendo um ou mais eventos agrupados para otimização de rede:
- **objectId**: ID do contato (número inteiro)
- **propertyName**: Campo que foi atualizado (ex: 'email', 'firstname')
- **propertyValue**: Novo valor do campo de dados
- **subscriptionType**: Tipo do evento, ex: 'contact.creation' ou 'contact.deletion'

Exemplo de Requisição:
\`\`\`json
[
  {
    "objectId": 99018,
    "propertyName": "email",
    "propertyValue": "sabrina.guerra@gemini-server-prise.tech",
    "subscriptionType": "contact.creation"
  }
]
\`\`\`
`
  }
};

// 2. BASE DE CÓDIGOS NODE.JS GERADOS PELO AGENTE PARA CADA CASO
const GENERATED_CODES = {
  stripe: `const express = require('express');
const crypto = require('crypto');
const app = express();

const WEBHOOK_SECRET = 'whsec_stripe_gemini-server-prise_connect_2026_key';

// Middleware para manter o body bruto para verificação criptográfica precisa
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

app.post('/webhooks/stripe', (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  if (!signature) {
    console.error(' [ALERTA] Assinatura Stripe ausente!');
    return res.status(401).json({ error: 'Assinatura ausente' });
  }

  try {
    // 1. Extrai o timestamp (t) e a assinatura (v1) do cabeçalho
    const parts = signature.split(',');
    const timestampPart = parts.find(p => p.startsWith('t='));
    const sigPart = parts.find(p => p.startsWith('v1='));
    
    if (!timestampPart || !sigPart) throw new Error('Formato inválido');
    
    const timestamp = timestampPart.split('=')[1];
    const clientSignature = sigPart.split('=')[1];
    
    // 2. PREVENÇÃO DE REPLAY ATTACKS (Tolerância estrita de 5 minutos / 300 segundos)
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - parseInt(timestamp)) > 300) {
      console.warn('⚠️ [SEGURANÇA] Bloqueado potencial Replay Attack! Timestamp expirado:', timestamp);
      return res.status(403).json({ error: 'Timestamp de webhook expirado (Replay Attack bloqueado)' });
    }
    
    // 3. VALIDAÇÃO CRIPTOGRÁFICA DO CONTEÚDO (HMAC-SHA256)
    const signedPayload = \`\${timestamp}.\${req.rawBody}\`;
    const computedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(signedPayload)
      .digest('hex');
      
    if (computedSignature !== clientSignature) {
      console.error('❌ [CRÍTICO] Assinatura HMAC incorreta! Assinatura rejeitada.');
      return res.status(401).json({ error: 'Assinatura inválida' });
    }
    
    // 4. SANITIZAÇÃO E PROCESSAMENTO SEGURO
    const event = req.body;
    console.log('✅ [SUCESSO] Webhook Stripe validado com sucesso! Evento:', event.type);
    
    res.status(200).json({ status: 'success', eventId: event.id });
  } catch (err) {
    res.status(400).json({ error: 'Processamento falhou' });
  }
});

module.exports = app;`,

  salesforce: `const express = require('express');
const app = express();
app.use(express.json());

const AUTH_TOKEN = 'sfdc_bearer_token_secret_99884422';

app.post('/leads/sync', (req, res) => {
  const authHeader = req.headers['authorization'];
  
  // 1. VALIDAÇÃO DE AUTORIZAÇÃO BEARER TOKEN
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('❌ [AUTORIZAÇÃO] Token de autorização ausente ou malformado!');
    return res.status(401).json({ error: 'Token Bearer ausente' });
  }
  
  const token = authHeader.split(' ')[1];
  if (token !== AUTH_TOKEN) {
    console.error('❌ [CRÍTICO] Token Bearer inválido de sincronização de Leads!');
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  // 2. VALIDAÇÃO DE ESQUEMA DE CAMPOS (Lead Schema Guard)
  const { leadId, companyName, email, status } = req.body;
  
  if (!leadId || !companyName || !email || !status) {
    console.warn('⚠️ [CONFORMIDADE] Campos obrigatórios ausentes no payload do Lead.');
    return res.status(422).json({ error: 'Campos obrigatórios ausentes: leadId, companyName, email, status' });
  }
  
  // Validação estrita do padrão de Email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: 'Campo email possui formato inválido' });
  }
  
  // Validação estrita do ENUM de status
  const validStatus = ['New', 'Contacted', 'Qualified', 'Closed'];
  if (!validStatus.includes(status)) {
    return res.status(422).json({ error: \`Status inválido. Deve ser um dos seguintes: \${validStatus.join(', ')}\` });
  }
  
  console.log('✅ [CRM] Lead sincronizado com sucesso no Salesforce. ID:', leadId);
  res.status(200).json({ integrated: true, syncTimestamp: new Date().toISOString() });
});

module.exports = app;`,

  hubspot: `const express = require('express');
const app = express();
app.use(express.json());

// Token obtido pelo Parsing Semântico da documentação Markdown
const HUBSPOT_SECRET = 'hs_sec_991823ab';

app.post('/webhooks/hubspot', (req, res) => {
  const secretHeader = req.headers['x-hubspot-secret'];
  
  // 1. AUTENTICAÇÃO VIA TOKEN ESTÁTICO DO PARCEIRO
  if (!secretHeader || secretHeader !== HUBSPOT_SECRET) {
    console.error('❌ [SEGURANÇA] Cabeçalho X-HubSpot-Secret inválido ou ausente!');
    return res.status(401).json({ error: 'Assinatura ou segredo inválido' });
  }
  
  // 2. ADAPTADOR SEMÂNTICO (Tratando array de eventos do HubSpot)
  const events = req.body;
  if (!Array.isArray(events)) {
    console.warn('⚠️ [VALIDAÇÃO] HubSpot enviou payload sem estrutura de lista (Array).');
    return res.status(400).json({ error: 'O corpo do webhook HubSpot deve ser uma lista de eventos' });
  }
  
  const processedLogs = [];
  
  for (const event of events) {
    const { objectId, propertyName, propertyValue, subscriptionType } = event;
    
    // Validação estrita dos tipos internos extraídos do Markdown
    if (!objectId || !propertyName || !propertyValue || !subscriptionType) {
      console.warn('⚠️ [AVISO] Evento corrompido ou incompleto pulado.');
      continue;
    }
    
    console.log(\`✅ [HUBSPOT] Evento processado de tipo \${subscriptionType} para objeto ID \${objectId}\`);
    processedLogs.push({ id: objectId, type: subscriptionType });
  }
  
  res.status(200).json({
    status: 'processed',
    totalProcessed: processedLogs.length,
    events: processedLogs
  });
});

module.exports = app;`
};

// 3. BASE DE EVENTOS DO PLAYGROUND PARA MOCK
const PLAYGROUND_EVENTS = {
  stripe: [
    {
      label: "payment_intent.succeeded (Pagamento Aprovado)",
      value: "payment_succeeded",
      data: {
        id: "evt_1M2b5F2eZvKYlo2C",
        type: "payment_intent.succeeded",
        created: 1779836400,
        data: {
          object: {
            id: "pi_3M2b5F2eZvKYlo2C",
            amount: 15000,
            currency: "brl",
            status: "succeeded",
            receipt_email: "sabrina.guerra@gemini-server-prise.tech"
          }
        }
      }
    },
    {
      label: "charge.failed (Pagamento Recusado)",
      value: "charge_failed",
      data: {
        id: "evt_1M9s1B2eZvKYlo3A",
        type: "charge.failed",
        created: 1779836420,
        data: {
          object: {
            id: "ch_3M9s1B2eZvKYlo3A",
            amount: 45000,
            currency: "brl",
            status: "failed",
            failure_code: "card_declined",
            failure_message: "Saldo insuficiente no cartão."
          }
        }
      }
    }
  ],
  salesforce: [
    {
      label: "Lead Criado (New Lead)",
      value: "lead_created",
      data: {
        leadId: "00Q5w00001Z9xY2EAJ",
        companyName: "Gemini Server-Prise Security",
        email: "sabrina.guerra@gemini-server-prise.tech",
        status: "New"
      }
    },
    {
      label: "Lead Qualificado (Qualified Lead)",
      value: "lead_qualified",
      data: {
        leadId: "00Q5w00001Z9xY2EAJ",
        companyName: "Gemini Server-Prise Security",
        email: "sabrina.guerra@gemini-server-prise.tech",
        status: "Qualified"
      }
    }
  ],
  hubspot: [
    {
      label: "contact.creation (Novo Contato em Lista)",
      value: "contact_created",
      data: [
        {
          objectId: 99182,
          propertyName: "email",
          propertyValue: "sabrina.guerra@gemini-server-prise.tech",
          subscriptionType: "contact.creation"
        }
      ]
    },
    {
      label: "deal.property_change (Mudança no Negócio)",
      value: "deal_updated",
      data: [
        {
          objectId: 88711,
          propertyName: "dealstage",
          propertyValue: "closedwon",
          subscriptionType: "deal.property_change"
        }
      ]
    }
  ]
};

// 4. ELEMENTOS DO DOM
const dom = {
  partnerSelector: document.getElementById("partner-selector"),
  specFilename: document.getElementById("spec-filename"),
  specCodeBlock: document.getElementById("spec-code-block"),
  generatedFilename: document.getElementById("generated-filename"),
  generatedGutter: document.querySelector(".ide-gutter"),
  generatedCodeBox: document.getElementById("generated-code-box"),
  runAgentBtn: document.getElementById("run-agent-btn"),
  agentProgress: document.getElementById("agent-progress"),
  progressPhaseLabel: document.getElementById("progress-phase-label"),
  progressPercentage: document.getElementById("progress-percentage"),
  terminalLogs: document.getElementById("terminal-logs"),
  
  // Status headers
  connectionsCount: document.getElementById("connections-count"),
  serverStatus: document.getElementById("server-status"),
  agentState: document.getElementById("agent-state"),
  
  // Steps do fluxo
  stepParsing: document.getElementById("step-parsing"),
  stepGeneration: document.getElementById("step-generation"),
  stepMocking: document.getElementById("step-mocking"),
  stepValidation: document.getElementById("step-validation"),
  
  // Playground
  sandboxCard: document.getElementById("sandbox-card"),
  sandboxLockOverlay: document.getElementById("sandbox-lock-overlay"),
  eventSelector: document.getElementById("event-selector"),
  payloadTextarea: document.getElementById("payload-textarea"),
  btnSendSafe: document.getElementById("btn-send-safe"),
  btnSendTampered: document.getElementById("btn-send-tampered"),
  btnSendReplay: document.getElementById("btn-send-replay"),
  btnSendSpam: document.getElementById("btn-send-spam"),
  trafficMonitorBody: document.getElementById("traffic-monitor-body")
};

// Variaveis de Estado
let currentPartner = "stripe";
let isCodeGenerated = false;
let isGenerating = false;
let requestCount = 0;

// Inicializa a Tela
function init() {
  updatePartnerSpec();
  setupEventListeners();
}

// 5. ATUALIZAR ESPECIFICAÇÕES
function updatePartnerSpec() {
  currentPartner = dom.partnerSelector.value;
  const specData = PARTNER_SPECS[currentPartner];
  
  dom.specFilename.textContent = specData.filename;
  document.querySelector(".spec-format").textContent = specData.format;
  dom.specCodeBlock.textContent = specData.code;
  
  // Reseta código gerado
  isCodeGenerated = false;
  dom.generatedCodeBox.innerHTML = `// Aguardando disparo do Motor de Integração Gemini Server-Prise para iniciar a síntese do conector de ${currentPartner.toUpperCase()}...`;
  dom.generatedGutter.innerHTML = "";
  dom.generatedFilename.textContent = `${currentPartner}-adapter.js`;
  
  // Bloqueia playground de novo
  dom.sandboxLockOverlay.classList.remove("unlocked");
  
  // Atualiza eventos do dropdown do playground
  dom.eventSelector.innerHTML = "";
  const events = PLAYGROUND_EVENTS[currentPartner];
  events.forEach(evt => {
    const opt = document.createElement("option");
    opt.value = evt.value;
    opt.textContent = evt.label;
    dom.eventSelector.appendChild(opt);
  });
  
  updatePayloadTextarea();
  
  // Reset de fases visuais
  resetFlowSteps();
}

function updatePayloadTextarea() {
  const selectedEventValue = dom.eventSelector.value;
  const events = PLAYGROUND_EVENTS[currentPartner];
  const matchedEvent = events.find(e => e.value === selectedEventValue);
  
  if (matchedEvent) {
    dom.payloadTextarea.value = JSON.stringify(matchedEvent.data, null, 2);
  }
}

function resetFlowSteps() {
  [dom.stepParsing, dom.stepGeneration, dom.stepMocking, dom.stepValidation].forEach(step => {
    step.classList.remove("active", "completed");
  });
  dom.agentProgress.style.width = "0%";
  dom.progressPercentage.textContent = "0%";
  dom.progressPhaseLabel.textContent = "Aguardando ativação...";
}

// 6. GERAÇÃO DINÂMICA DE LINHAS (IDE GUTTER)
function generateGutterLines(linesCount) {
  dom.generatedGutter.innerHTML = "";
  for (let i = 1; i <= linesCount; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    dom.generatedGutter.appendChild(span);
  }
}

// 7. MOTOR DE LOGS DO TERMINAL
function addTerminalLine(text, type = "regular") {
  const line = document.createElement("div");
  line.classList.add("terminal-line");
  
  if (type === "cmd") line.classList.add("cmd-line");
  else if (type === "success") line.classList.add("success-line");
  else if (type === "warn") line.classList.add("warn-line");
  else if (type === "error") line.classList.add("error-line");
  else if (type === "system") line.classList.add("system-line");
  
  line.textContent = text;
  dom.terminalLogs.appendChild(line);
  dom.terminalLogs.scrollTop = dom.terminalLogs.scrollHeight;
}

// 8. SIMULAR EXECUÇÃO DO AGENTE
function triggerAgentSimulation() {
  if (isGenerating) return;
  isGenerating = true;
  isCodeGenerated = false;
  
  // Bloqueios visuais
  dom.runAgentBtn.disabled = true;
  dom.partnerSelector.disabled = true;
  resetFlowSteps();
  
  dom.agentState.textContent = "Executando";
  dom.agentState.className = "metric-value text-secured pulse-success";
  
  addTerminalLine(`Iniciando simulação autônoma de geração de conector para ${currentPartner.toUpperCase()}`, "cmd");
  
  // Fase 1: Parsing
  setTimeout(() => {
    dom.stepParsing.classList.add("active");
    dom.progressPhaseLabel.textContent = "Analisando especificação de API...";
    dom.agentProgress.style.width = "25%";
    dom.progressPercentage.textContent = "25%";
    
    addTerminalLine(`[INFO] Carregando especificação: ${PARTNER_SPECS[currentPartner].filename}`, "regular");
    addTerminalLine(`[INFO] Mapeando endpoints, autenticações e payloads exigidos...`, "regular");
    
    if (currentPartner === "stripe") {
      addTerminalLine(`[SEGURANÇA] Detectado requisito de Assinatura HMAC criptográfica no cabeçalho 'Stripe-Signature'.`, "warn");
    } else if (currentPartner === "salesforce") {
      addTerminalLine(`[SEGURANÇA] Detectado requisito de segurança de Token Bearer em cabeçalhos de autorização.`, "warn");
    } else {
      addTerminalLine(`[SEMÂNTICA] Analisando texto cru Markdown. Extraído HubSpot Secret: hs_sec_991823ab.`, "warn");
    }
  }, 1000);
  
  // Fase 2: Geração de Código
  setTimeout(() => {
    dom.stepParsing.classList.remove("active");
    dom.stepParsing.classList.add("completed");
    dom.stepGeneration.classList.add("active");
    
    dom.progressPhaseLabel.textContent = "Sintetizando Conector Node.js de alta segurança...";
    dom.agentProgress.style.width = "50%";
    dom.progressPercentage.textContent = "50%";
    
    addTerminalLine(`[CODE] Escrevendo adaptador express e middleware de segurança anti-replay...`, "regular");
    
    // Efeito typewriter de escrita do código
    typewriteCode(GENERATED_CODES[currentPartner]);
  }, 3500);
}

// Efeito de digitação de código na janela da IDE
function typewriteCode(fullCode) {
  const codeBox = dom.generatedCodeBox;
  codeBox.innerHTML = "";
  
  const lines = fullCode.split("\n");
  generateGutterLines(lines.length);
  
  let currentLineIndex = 0;
  
  function typeLine() {
    if (currentLineIndex < lines.length) {
      // Aplica sotaque de sintaxe básico para parecer realista
      let formattedLine = highlightSyntax(lines[currentLineIndex]);
      
      codeBox.innerHTML += formattedLine + "\n";
      codeBox.scrollTop = codeBox.scrollHeight;
      currentLineIndex++;
      
      // Velocidade variável para parecer mais humano
      const typingSpeed = lines[currentLineIndex - 1].length < 15 ? 15 : 40;
      setTimeout(typeLine, typingSpeed);
    } else {
      // Finalizou digitação! Prosseguir para a Fase 3
      triggerPhase3And4();
    }
  }
  
  typeLine();
}

// Destaque de sintaxe simples em tempo de execução para o efeito WOW
function highlightSyntax(line) {
  return line
    .replace(/(const|let|var|require|module\.exports|exports|app\.use|app\.post)/g, '<span class="syntax-keyword">$1</span>')
    .replace(/(function|return|try|catch|throw|new|Date|Math\.floor|Math\.abs|parseInt)/g, '<span class="syntax-const">$1</span>')
    .replace(/(\.createHmac|\.update|\.digest|\.json|\.status|\.startsWith|\.split|\.find|\.test|\.includes)/g, '<span class="syntax-function">$1</span>')
    .replace(/(\/\/[^*\\n]*|❌.*|⚠️.*|✅.*)/g, '<span class="syntax-comment">$1</span>')
    .replace(/('[^']*'|`[^`]*`)/g, '<span class="syntax-string">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>');
}

// Fase 3 e 4 do fluxo pós-geração do código
function triggerPhase3And4() {
  // Fase 3: Spin-up Mock Server
  dom.stepGeneration.classList.remove("active");
  dom.stepGeneration.classList.add("completed");
  dom.stepMocking.classList.add("active");
  
  dom.progressPhaseLabel.textContent = "Instanciando servidor mock local para auditoria...";
  dom.agentProgress.style.width = "75%";
  dom.progressPercentage.textContent = "75%";
  
  addTerminalLine(`[SANDBOX] Inicializando container mock isolado na porta 5174...`, "regular");
  addTerminalLine(`[SANDBOX] Servidor express de teste online e escutando requisições de webhook.`, "success");
  
  setTimeout(() => {
    dom.serverStatus.textContent = "ONLINE";
    dom.serverStatus.className = "metric-value text-success pulse-success";
  }, 1000);
  
  // Fase 4: Gemini Server-Prise Security Shield Tests
  setTimeout(() => {
    dom.stepMocking.classList.remove("active");
    dom.stepMocking.classList.add("completed");
    dom.stepValidation.classList.add("active");
    
    dom.progressPhaseLabel.textContent = "Rodando suíte de testes de estresse de segurança (Gemini Server-Prise)...";
    dom.agentProgress.style.width = "90%";
    dom.progressPercentage.textContent = "90%";
    
    addTerminalLine(`[TEST] Iniciando bateria de testes contra ataques cibernéticos em sandbox...`, "cmd");
    addTerminalLine(`[TEST] Testando requisição íntegra de dados: APROVADO (Status 200 OK)`, "success");
    addTerminalLine(`[TEST] Testando assinatura inválida / interceptação: SEGURO (Bloqueado com 401 Unauthorized)`, "success");
    
    if (currentPartner === "stripe") {
      addTerminalLine(`[TEST] Testando ataque de Replay (Timestamp expirado em 350s): SEGURO (Bloqueado com 403 Forbidden)`, "success");
    }
    
    addTerminalLine(`[TEST] Testando rate-limiting (Spam de 12 requisições em 1s): SEGURO (Bloqueado com 429 Too Many Requests após a 5ª tentativa)`, "success");
  }, 2200);
  
  // Conclusão total
  setTimeout(() => {
    dom.stepValidation.classList.remove("active");
    dom.stepValidation.classList.add("completed");
    
    dom.progressPhaseLabel.textContent = "Conexão B2B ativada com sucesso!";
    dom.agentProgress.style.width = "100%";
    dom.progressPercentage.textContent = "100%";
    
    addTerminalLine(`[SYSTEM] Motor de Integração Gemini Server-Prise concluiu a verificação de compliance com 100% de sucesso.`, "success");
    addTerminalLine(`[SYSTEM] Conector seguro de ${currentPartner.toUpperCase()} ativado no gateway principal.`, "success");
    
    // Atualiza indicadores de métrica
    dom.connectionsCount.textContent = "1/3";
    dom.agentState.textContent = "Pronto";
    dom.agentState.className = "metric-value";
    
    // Destrava playground!
    dom.sandboxLockOverlay.classList.add("unlocked");
    
    // Restaura controles
    isGenerating = false;
    isCodeGenerated = true;
    dom.runAgentBtn.disabled = false;
    dom.partnerSelector.disabled = false;
  }, 5000);
}

// 9. SIMULAÇÃO DOS DISPAROS DE WEBHOOK DO PLAYGROUND
function handleWebhookDispatch(mode) {
  if (!isCodeGenerated) return;
  
  requestCount++;
  const now = new Date();
  const timestampStr = now.toTimeString().split(' ')[0];
  const payloadStr = dom.payloadTextarea.value;
  
  let endpoint = `/webhooks/${currentPartner}`;
  if (currentPartner === "salesforce") endpoint = "/leads/sync";
  
  let headers = {};
  let status = "200 OK";
  let statusClass = "ok";
  let method = "POST";
  
  addTerminalLine(`[MOCK LIVE] Nova requisição HTTP POST recebida em ${endpoint}`, "cmd");
  
  if (mode === "safe") {
    // Caso de uso: Seguro e Íntegro
    if (currentPartner === "stripe") {
      const simulatedTimestamp = Math.floor(Date.now() / 1000);
      // Simula uma assinatura criptográfica calculada HMAC para o painel de visualização de headers
      const simulatedHMAC = "v1=" + crypto_mock_hmac(simulatedTimestamp + "." + payloadStr);
      headers = {
        "Content-Type": "application/json",
        "Stripe-Signature": `t=${simulatedTimestamp},${simulatedHMAC}`
      };
    } else if (currentPartner === "salesforce") {
      headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer sfdc_bearer_token_secret_99884422"
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-HubSpot-Secret": "hs_sec_991823ab"
      };
    }
    
    addTerminalLine(`[MOCK LIVE] Validando headers: ${JSON.stringify(headers)}`, "regular");
    addTerminalLine(`[MOCK LIVE] Assinaturas/Tokens validados com sucesso. Integrando dados.`, "success");
    addTerminalLine(`[RESPONSE] Resposta do conector: 200 OK`, "success");
    
    addTrafficRow(timestampStr, endpoint, method, "Aprovado", "200 OK", "ok");
    
  } else if (mode === "tampered") {
    // Caso de uso: Hacker adulterando dados / Assinatura inválida
    if (currentPartner === "stripe") {
      headers = {
        "Content-Type": "application/json",
        "Stripe-Signature": `t=${Math.floor(Date.now() / 1000)},v1=hacker_tampered_signature_fake_321a`
      };
    } else if (currentPartner === "salesforce") {
      headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer token_hacker_adulterado_9999"
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-HubSpot-Secret": "hs_fake_secret_hacker"
      };
    }
    
    addTerminalLine(`[MOCK LIVE] Validando headers: ${JSON.stringify(headers)}`, "regular");
    addTerminalLine(`[SEGURANÇA] REJEITADO! Dados de assinatura ou token inválidos. Assinatura não confere!`, "error");
    addTerminalLine(`[RESPONSE] Resposta do conector: 401 Unauthorized`, "error");
    
    addTrafficRow(timestampStr, endpoint, method, "Invasão Bloqueada", "401 Unauthorized", "unauthorized");
    
  } else if (mode === "replay") {
    // Caso de uso: Replay Attack (Timestamp expirado há 1 hora)
    if (currentPartner === "stripe") {
      const expiredTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hora atrás
      const simulatedHMAC = "v1=" + crypto_mock_hmac(expiredTimestamp + "." + payloadStr);
      headers = {
        "Content-Type": "application/json",
        "Stripe-Signature": `t=${expiredTimestamp},${simulatedHMAC}`
      };
      
      addTerminalLine(`[MOCK LIVE] Validando timestamp: t=${expiredTimestamp} (Diferença de tempo superior a 300 segundos)`, "regular");
      addTerminalLine(`[SEGURANÇA] ALERTA! Bloqueado ataque de repetição (Replay Attack). Requisição antiga descartada!`, "error");
      addTerminalLine(`[RESPONSE] Resposta do conector: 403 Forbidden`, "error");
      addTrafficRow(timestampStr, endpoint, method, "Replay Bloqueado", "403 Forbidden", "forbidden");
    } else {
      // Outros provedores respondem como inválido ou não suportam Replay no mesmo formato
      addTerminalLine(`[MOCK LIVE] Simulação de replay não compatível para este parceiro. Bloqueado por Token Expirado.`, "warn");
      addTrafficRow(timestampStr, endpoint, method, "Não Autorizado", "401 Unauthorized", "unauthorized");
    }
    
  } else if (mode === "spam") {
    // Caso de uso: Spam / Rate Limit. Dispara múltiplos requests de forma sequencial animada!
    addTerminalLine(`[ALERTA ESTRESSE] Iniciando simulação de ataque de negação de serviço / força bruta.`, "warn");
    
    let delay = 0;
    for (let i = 1; i <= 12; i++) {
      setTimeout(() => {
        const loopTime = new Date();
        const loopTimestampStr = loopTime.toTimeString().split(' ')[0];
        
        addTerminalLine(`[MOCK LIVE] Request #${i} em sequência rápida para ${endpoint}`, "regular");
        
        if (i <= 5) {
          addTerminalLine(`[RESPONSE] Resposta do conector: 200 OK (Consumo de TokenBucket: ${i}/5)`, "success");
          addTrafficRow(loopTimestampStr, endpoint, method, "Aprovado", "200 OK", "ok");
        } else {
          addTerminalLine(`[SEGURANÇA] Bloqueado! Rate-limit de requisições por IP atingido. Rejeitando spam.`, "error");
          addTerminalLine(`[RESPONSE] Resposta do conector: 429 Too Many Requests`, "error");
          addTrafficRow(loopTimestampStr, endpoint, method, "Spam Bloqueado", "429 Too Many Requests", "too-many");
        }
      }, delay);
      delay += 250;
    }
  }
}

// Pequena função mock de cifragem para gerar assinaturas HMAC-like que mudam se o usuário mexer no payload JSON!
function crypto_mock_hmac(inputString) {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = (hash << 5) - hash + inputString.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16) + "e17aef6c25";
}

// 10. ADICIONAR LINHA NA TABELA DE TRÁFEGO
function addTrafficRow(time, endpoint, method, label, statusText, statusClass) {
  // Remove linha de vazio se ela existir
  const emptyRow = document.querySelector(".empty-traffic-row");
  if (emptyRow) emptyRow.remove();
  
  const tr = document.createElement("tr");
  tr.className = "traffic-row";
  
  tr.innerHTML = `
    <td>\${time}</td>
    <td><span class="traffic-badge post">\${endpoint}</span></td>
    <td>\${method}</td>
    <td>\${label}</td>
    <td><span class="status-badge \${statusClass}">\${statusText}</span></td>
  `;
  
  const body = dom.trafficMonitorBody;
  body.insertBefore(tr, body.firstChild);
  
  // Limita linhas para manter a tabela limpa
  if (body.children.length > 8) {
    body.lastChild.remove();
  }
}

// 11. CONFIGURAÇÃO DE EVENTOS
function setupEventListeners() {
  dom.partnerSelector.addEventListener("change", updatePartnerSpec);
  dom.eventSelector.addEventListener("change", updatePayloadTextarea);
  
  dom.runAgentBtn.addEventListener("click", triggerAgentSimulation);
  
  // Playground Actions
  dom.btnSendSafe.addEventListener("click", () => handleWebhookDispatch("safe"));
  dom.btnSendTampered.addEventListener("click", () => handleWebhookDispatch("tampered"));
  dom.btnSendReplay.addEventListener("click", () => handleWebhookDispatch("replay"));
  dom.btnSendSpam.addEventListener("click", () => handleWebhookDispatch("spam"));
}

// Aciona na carga da página
window.onload = init;
