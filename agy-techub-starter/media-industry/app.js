// Gemini 3.5 Flash - Omnichannel Content Explosion Logic
document.addEventListener('DOMContentLoaded', () => {
  // --- SELETORES GERAIS ---
  const btnTrigger = document.getElementById('btn-trigger-explosion');
  const statusBadge = document.getElementById('gemini-enter-view-status-badge');
  const engineState = document.getElementById('gemini-enter-view-engine-state');
  const consoleLogs = document.getElementById('media-console-logs');
  
  // Seletores das Configurações de API do Gemini
  const toggleRealApi = document.getElementById('toggle-real-api');
  const apiKeyRow = document.getElementById('api-key-row');
  const geminiApiKey = document.getElementById('gemini-api-key');
  
  // Inicialização e Recuperação da Chave de API
  if (toggleRealApi && apiKeyRow && geminiApiKey) {
    toggleRealApi.addEventListener('change', () => {
      apiKeyRow.style.display = toggleRealApi.checked ? 'flex' : 'none';
    });
    
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      geminiApiKey.value = storedKey;
    }
    
    // Suporte para passar via Query Param ?key=AIza...
    const urlParams = new URLSearchParams(window.location.search);
    const urlKey = urlParams.get('key');
    if (urlKey) {
      geminiApiKey.value = urlKey;
      toggleRealApi.checked = true;
      apiKeyRow.style.display = 'flex';
    }
  }

  // Elementos do Checklist
  const stepSemantic = document.getElementById('step-semantic');
  const stepBlog = document.getElementById('step-blog');
  const stepSocial = document.getElementById('step-social');
  const stepEmail = document.getElementById('step-email');
  
  // Golden Nuggets
  const nuggets = [
    document.getElementById('nugget-1'),
    document.getElementById('nugget-2'),
    document.getElementById('nugget-3')
  ];

  // Elementos das Abas de Pré-visualização
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Elementos dos Previews de Conteúdo
  const valBlogTitle = document.getElementById('val-blog-title');
  const valBlogBody = document.getElementById('val-blog-body');
  const valLinkedinBody = document.getElementById('val-linkedin-body');
  const valXThread = document.getElementById('val-x-thread');
  const valEmailSubject = document.getElementById('val-email-subject');
  const valEmailBody = document.getElementById('val-email-body');

  // --- CONTROLE DAS ABAS (TABS) ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // --- CONTROLE DO CARROSSEL DE BANNERS ---
  const prevBtn = document.getElementById('btn-prev-slide');
  const nextBtn = document.getElementById('btn-next-slide');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  let currentSlideIndex = 0;

  function updateCarousel(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlideIndex = index;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      let index = currentSlideIndex - 1;
      if (index < 0) index = slides.length - 1;
      updateCarousel(index);
    });

    nextBtn.addEventListener('click', () => {
      let index = currentSlideIndex + 1;
      if (index >= slides.length) index = 0;
      updateCarousel(index);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        updateCarousel(index);
      });
    });
  }

  // --- AUXILIARES DO TERMINAL ---
  function appendLog(text, type = '') {
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    line.innerHTML = `<span class="text-muted">[${timestamp}]</span> ${text}`;
    
    // Insere antes do cursor final de prompt
    const cursorLine = consoleLogs.querySelector('.command-line');
    consoleLogs.insertBefore(line, cursorLine);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
  }

  function clearTerminalButKeepPrompt() {
    const lines = consoleLogs.querySelectorAll('.console-line:not(.command-line)');
    lines.forEach(line => line.remove());
  }

  // Sleep utilitário para animações encadeadas
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // --- COMPUTAÇÃO DO MODO SIMULADO (FALLBACK SEGURO) ---
  async function runSimulationMode() {
    appendLog('>> Executando em Modo de Simulação Offline (Seguro/Fallback).', 'warn');
    await sleep(600);
    
    stepSemantic.className = 'checklist-item active';
    appendLog('>> [FASE 1] Executando Análise Semântica e LLM NLP Parser...', 'info');
    await sleep(1000);
    
    appendLog('Identificando locutores: Host e Sabrina Guerra detectados.', 'success');
    await sleep(600);
    appendLog('Limpando interjeições e marcas gramaticais informais...', 'info');
    await sleep(800);
    
    appendLog('Extraindo Golden Nuggets estruturais e insights centrais de Sabrina Guerra:', 'warn');
    await sleep(500);

    for (let i = 0; i < nuggets.length; i++) {
      nuggets[i].classList.remove('opacity-muted');
      nuggets[i].classList.add('extracted');
      appendLog(`  -> Extraído insight #${i+1}: "${nuggets[i].querySelector('.nugget-text').textContent}"`, 'success');
      await sleep(700);
    }

    stepSemantic.className = 'checklist-item completed';
    await sleep(500);

    // --- FASE 2: BLOG POST ---
    stepBlog.className = 'checklist-item active';
    appendLog('>> [FASE 2] Iniciando geração de Artigo de Blog SEO Otimizado...', 'info');
    await sleep(1200);

    appendLog('Aplicando regras de legibilidade e densidade de palavras-chave...', 'info');
    await sleep(600);
    appendLog('Gerando meta tags e estrutura hierárquica (H1, H2, H3)...', 'success');
    await sleep(800);

    valBlogTitle.innerHTML = 'A Revolução da IA Corporativa: Do Chat Simples à Integração de APIs Seguras';
    valBlogTitle.style.animation = 'fade-in-tab 0.5s ease-out';
    
    valBlogBody.innerHTML = `
      <p>O mercado de tecnologia vive uma verdadeira corrida do ouro em direção à inteligência artificial. Contudo, muitas organizações cometem o equívoco de limitar suas estratégias ao uso de interfaces de chat genéricas para tarefas esparsas.</p>
      
      <h4>A Integração Ponta a Ponta como Diferencial</h4>
      <p>De acordo com <strong>Sabrina Guerra</strong>, especialista de renome em transformação digital, a verdadeira virada de jogo não está em chats isolados, mas na integração nativa da IA via SDK e APIs corporativas seguras. Ao acoplar os modelos generativos às operações de core business, as corporações automatizam de ponta a ponta processos complexos de conformidade regulatória, auditorias e marketing multicanal na exata velocidade de geração dos dados de negócios.</p>

      <h4>Segurança em Primeiro Lugar: Zero Trust e Proteção PII</h4>
      <p>Em um ecossistema ultraconectado, não existe inovação sem governança robusta. Conforme alertado no podcast, o princípio de <strong>Segurança por Padrão (Secure by Default)</strong> e a arquitetura <strong>Zero Trust</strong> são alicerces essenciais.</p>
      
      <p>Antes de enviar informações operacionais sensíveis para modelos públicos ou nuvens compartilhadas, as informações críticas e dados pessoais identificáveis (PII) devem ser localmente criptografados, higienizados e mascarados. Essa camada de custódia resguarda as corporações perante leis como a LGPD e garante que a inovação tecnológica ande de mãos dadas com a conformidade jurídica.</p>
    `;
    valBlogBody.style.animation = 'fade-in-tab 0.8s ease-out';
    appendLog('Artigo de Blog gerado com 324 palavras e índice de legibilidade excelente.', 'success');
    
    stepBlog.className = 'checklist-item completed';
    await sleep(600);

    // --- FASE 3: POSTS SOCIAIS (LINKEDIN & X) ---
    stepSocial.className = 'checklist-item active';
    appendLog('>> [FASE 3] Iniciando o pipeline criativo para canais sociais...', 'info');
    await sleep(1000);

    appendLog('Formatando micro-copywriting adaptado para o algoritmo do LinkedIn...', 'info');
    await sleep(600);

    valLinkedinBody.innerHTML = `
      O grande erro estratégico das empresas hoje é limitar a Inteligência Artificial a um "chat inteligente". A IA de verdade brilha quando integrada profundamente no ecossistema operacional corporativo através de APIs seguras e SDKs dedicados. 💼✨<br><br>
      No Gemini Enter-View Podcast, discutimos sobre como a inovação sem segurança é um risco imenso. Adotar princípios de <strong>Secure by Default</strong> e <strong>Zero Trust</strong>, garantindo a higienização local de dados sensíveis (PII) antes de qualquer tráfego para nuvem, é o único caminho sustentável para a conformidade regulatória.<br><br>
      Obrigada ao time pelo convite e pela rica troca de insights!
    `;
    valLinkedinBody.style.animation = 'fade-in-tab 0.5s ease-out';
    appendLog('Post de LinkedIn estruturado com gatilhos de engajamento.', 'success');
    await sleep(600);

    appendLog('Criando Thread concisa para a rede social X (Twitter)...', 'info');
    await sleep(600);

    valXThread.innerHTML = `
      <div class="x-tweet">
        <div class="x-tweet-header">
          <div class="x-avatar">SG</div>
          <div class="x-author-meta">
            <span class="x-name">Sabrina Guerra</span>
            <span class="x-handle">@sabrina_guerra • 1s</span>
          </div>
        </div>
        <div class="x-tweet-body">
          1/4 O grande erro corporativo atual é tratar Inteligência Artificial apenas como um chatbot amigável para resolver dúvidas pontuais. O valor real reside na integração estrutural profunda através de SDKs operacionais. 🧵👇
        </div>
        <div class="x-tweet-footer">
          <span>💬 12</span> <span>🔁 45</span> <span>❤️ 210</span> <span>📊 4.2K</span>
        </div>
      </div>
      
      <div class="x-tweet">
        <div class="x-tweet-header">
          <div class="x-avatar">SG</div>
          <div class="x-author-meta">
            <span class="x-name">Sabrina Guerra</span>
            <span class="x-handle">@sabrina_guerra • 1s</span>
          </div>
        </div>
        <div class="x-tweet-body">
          2/4 Automatizar de ponta a ponta requer governança absoluta. O conceito de "Secure by Default" e de arquitetura Zero Trust é mandatário. Não comprometa a integridade legal por conveniência ágil.
        </div>
        <div class="x-tweet-footer">
          <span>💬 3</span> <span>🔁 14</span> <span>❤️ 118</span> <span>📊 2.8K</span>
        </div>
      </div>

      <div class="x-tweet">
        <div class="x-tweet-header">
          <div class="x-avatar">SG</div>
          <div class="x-author-meta">
            <span class="x-name">Sabrina Guerra</span>
            <span class="x-handle">@sabrina_guerra • 1s</span>
          </div>
        </div>
        <div class="x-tweet-body">
          3/4 O dado confidencial do seu cliente (PII) é sagrado. Toda higienização de informações críticas precisa acontecer localmente antes de trafegar para qualquer LLM externa. Segurança local é pilar regulatório!
        </div>
        <div class="x-tweet-footer">
          <span>💬 5</span> <span>🔁 22</span> <span>❤️ 154</span> <span>📊 3.1K</span>
        </div>
      </div>

      <div class="x-tweet">
        <div class="x-tweet-header">
          <div class="x-avatar">SG</div>
          <div class="x-author-meta">
            <span class="x-name">Sabrina Guerra</span>
            <span class="x-handle">@sabrina_guerra • 1s</span>
          </div>
        </div>
        <div class="x-tweet-body">
          4/4 Quer saber mais sobre transformação digital segura e governança ativa de IA? Leia nosso artigo de blog corporativo completo em gemini-enter-view-suite.com/insights/ia-segura. 🚀🔒
        </div>
        <div class="x-tweet-footer">
          <span>💬 8</span> <span>🔁 31</span> <span>❤️ 198</span> <span>📊 5.0K</span>
        </div>
      </div>
    `;
    valXThread.style.animation = 'fade-in-tab 0.5s ease-out';
    appendLog('Thread do X formatada em 4 postagens em sequência lógica.', 'success');

    stepSocial.className = 'checklist-item completed';
    await sleep(600);

    // --- FASE 4: NEWSLETTER EMAIL ---
    stepEmail.className = 'checklist-item active';
    appendLog('>> [FASE 4] Consolidando Newsletter Executiva...', 'info');
    await sleep(1000);

    appendLog('Vinculando criativos visuais premium à campanha (Banner AI & Podcast Graphics)...', 'info');
    await sleep(600);

    valEmailSubject.innerHTML = 'Gemini Enter-View Insights: O real valor da Inteligência Artificial nos Negócios';
    valEmailBody.innerHTML = `
      <p>Olá, Executivo(a),</p>
      <p>Nesta edição especial da nossa newsletter semanal, trazemos os principais destaques e "Golden Nuggets" extraídos diretamente de nossa entrevista de destaque com a especialista em transformação digital <strong>Sabrina Guerra</strong>.</p>
      
      <div style="background: rgba(139, 92, 246, 0.05); border-left: 4px solid var(--color-primary); padding: 12px; margin: 15px 0; border-radius: var(--radius-sm);">
        <p style="margin: 0; font-weight: 600; color: var(--text-main);">"O erro corporativo do momento é tratar a Inteligência Artificial como um simples chat inteligente. A IA gera valor quando integrada estruturalmente na raiz do negócio."</p>
      </div>

      <p>Ao longo da conversa, discutimos soluções para desmistificar os pipelines integrados de automação e abordamos as melhores práticas técnicas de governança de dados pessoais (PII) sob a égide da LGPD e da arquitetura Zero Trust.</p>
      
      <p>Deseja conferir a discussão completa? O link do episódio em vídeo e o artigo de blog aprofundado já estão disponíveis em nosso portal oficial corporativo.</p>
      
      <p>Tenha uma ótima leitura,<br><strong>Equipe Gemini Enter-View Corporate</strong></p>
    `;
    valEmailBody.style.animation = 'fade-in-tab 0.5s ease-out';
    appendLog('Newsletter de marketing redigida com sucesso.', 'success');
    await sleep(600);

    stepEmail.className = 'checklist-item completed';
    await sleep(800);
  }

  // --- FLUXO DE EXPLOSÃO OMNICHANNEL ---
  let isRunning = false;

  btnTrigger.addEventListener('click', async () => {
    if (isRunning) return;
    isRunning = true;
    
    // Salva a chave no localStorage sempre que clica, para persistência
    if (geminiApiKey && geminiApiKey.value) {
      localStorage.setItem('gemini_api_key', geminiApiKey.value.trim());
    }

    // Resetar UI e desabilitar botão
    btnTrigger.disabled = true;
    btnTrigger.style.opacity = '0.7';
    btnTrigger.style.cursor = 'not-allowed';
    
    // Resetar checklist de fases para cinza
    stepSemantic.className = 'checklist-item';
    stepBlog.className = 'checklist-item';
    stepSocial.className = 'checklist-item';
    stepEmail.className = 'checklist-item';

    // Opacificar nuggets de volta ao estado inicial
    nuggets.forEach(nugget => {
      nugget.classList.add('opacity-muted');
      nugget.classList.remove('extracted');
    });
    
    // Atualizar badges de status para processamento
    statusBadge.className = 'metric-badge state-processing';
    statusBadge.textContent = 'Processando';
    engineState.textContent = 'Trabalhando...';
    engineState.style.color = 'var(--color-pink)';

    // Limpar o terminal e iniciar logs reais
    clearTerminalButKeepPrompt();
    await sleep(400);

    appendLog('Iniciando Gemini Enter-View Omnichannel Engine v3.5...', 'cmd');
    await sleep(500);

    const useRealApi = toggleRealApi && toggleRealApi.checked;
    const apiKey = geminiApiKey ? geminiApiKey.value.trim() : '';

    if (useRealApi) {
      if (!apiKey) {
        appendLog('ERRO: Nenhuma chave de API fornecida para Conexão Real!', 'danger');
        appendLog('Redirecionando execução para o Modo Simulado local...', 'warn');
        await sleep(1000);
        await runSimulationMode();
      } else {
        appendLog('Conexão direta estabelecida com a API do Gemini 3.5 Flash Engine.', 'success');
        await sleep(500);
        appendLog('Capturando transcrição de áudio inserida na caixa de texto...', 'info');
        
        const transcriptText = document.getElementById('podcast-transcript').value.trim();
        
        // --- FASE 1: EXTRAÇÃO SEMÂNTICA REAL ---
        stepSemantic.className = 'checklist-item active';
        appendLog('>> [FASE 1] Solicitando processamento inteligente ao Gemini 3.5 Flash...', 'info');
        await sleep(600);
        appendLog('Enviando transcrição e gerando conteúdo estruturado via JSON Schema...', 'cmd');

        // Criação do Prompt de altíssima qualidade contendo diretrizes do negócio
        const prompt = `
Você é o motor de inteligência artificial de marketing omnichannel "Gemini 3.5 Flash Engine".
Analise a seguinte transcrição de podcast onde a convidada é "Sabrina Guerra", especialista em transformação digital.

Sua tarefa é extrair insights e gerar múltiplos canais de distribuição de marketing (Blog, LinkedIn, Twitter/X e Newsletter) baseando-se RIGOROSAMENTE nas ideias da Sabrina contidas no texto.

TEXTO DA TRANSCRIÇÃO:
"""
${transcriptText}
"""

Instruções para geração:
1. Extraia exatamente 3 insights centrais (Golden Nuggets) focados nas declarações de Sabrina Guerra. Devem ser frases de impacto, curtas e memoráveis.
2. Escreva um artigo de blog com título chamativo (blogTitle) e corpo completo em formato HTML (blogBody). O artigo deve citar diretamente Sabrina Guerra como autoridade máxima no assunto, discutindo sobre transformação digital, segurança por padrão (Secure by Default), Zero Trust, conformidade, e proteção de dados (PII/LGPD). Use parágrafos <p> e cabeçalhos <h4> no HTML do corpo.
3. Escreva uma publicação profissional para o LinkedIn (linkedinBody) cativante, com emojis adequados e agradecimento final. Citar Sabrina Guerra.
4. Crie uma sequência de Twitter Thread (xThread) com exatamente 4 posts. Cada post deve começar indicando o índice (ex: "1/4", "2/4"). A thread deve cobrir a transição de chatbots simples para APIs robustas e seguras e governança de dados.
5. Escreva um e-mail newsletter executivo formal e impactante, com um assunto forte (emailSubject) e corpo em formato HTML (emailBody), com destaque visual usando blockquote ou divs com bordas coloridas.

Gere OBRIGATORIAMENTE uma resposta no formato JSON estrito, sem textos adicionais antes ou depois da marcação do JSON. O JSON deve seguir a seguinte estrutura de campos:
{
  "nugget1": "string com o primeiro insight extraído",
  "nugget2": "string com o segundo insight extraído",
  "nugget3": "string com o terceiro insight extraído",
  "blogTitle": "Título do post de blog",
  "blogBody": "Corpo do post de blog formatado em HTML",
  "linkedinBody": "Corpo do post do LinkedIn",
  "xThread": [
    "Tweet 1/4",
    "Tweet 2/4",
    "Tweet 3/4",
    "Tweet 4/4"
  ],
  "emailSubject": "Assunto do e-mail",
  "emailBody": "Corpo do e-mail newsletter formatado em HTML"
}
`;

        try {
          // Endpoint unificado do Gemini (2.0-flash suporta perfeitamente o responseMimeType e JSON)
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
          
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: prompt }]
              }],
              generationConfig: {
                responseMimeType: "application/json"
              }
            })
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMsg = errData.error?.message || response.statusText;
            throw new Error(`API retornou erro ${response.status}: ${errMsg}`);
          }

          const resData = await response.json();
          const responseText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (!responseText) {
            throw new Error('Formato de resposta inesperado do Gemini API (sem conteúdo de texto).');
          }

          // Parser seguro do JSON retornado pelo Gemini
          const data = JSON.parse(responseText.trim());

          // Preenche os Nuggets extraídos
          nuggets[0].querySelector('.nugget-text').textContent = data.nugget1 || 'Integração de APIs na raiz operacional do negócio.';
          nuggets[1].querySelector('.nugget-text').textContent = data.nugget2 || 'Conceitos de Secure by Default e Zero Trust estruturados.';
          nuggets[2].querySelector('.nugget-text').textContent = data.nugget3 || 'Higienização de PII executada localmente.';

          for (let i = 0; i < nuggets.length; i++) {
            nuggets[i].classList.remove('opacity-muted');
            nuggets[i].classList.add('extracted');
            appendLog(`  -> Extraído insight #${i+1}: "${nuggets[i].querySelector('.nugget-text').textContent}"`, 'success');
            await sleep(500);
          }

          stepSemantic.className = 'checklist-item completed';
          appendLog('Análise Semântica real finalizada com sucesso.', 'success');
          await sleep(600);

          // --- FASE 2: RENDERIZAR BLOG POST ---
          stepBlog.className = 'checklist-item active';
          appendLog('>> [FASE 2] Inserindo Artigo do Blog gerado em tempo real...', 'info');
          await sleep(500);

          valBlogTitle.innerHTML = data.blogTitle || 'A Revolução da IA Corporativa';
          valBlogTitle.style.animation = 'fade-in-tab 0.5s ease-out';
          valBlogBody.innerHTML = data.blogBody || '<p>Erro na formatação do corpo do artigo do blog.</p>';
          valBlogBody.style.animation = 'fade-in-tab 0.8s ease-out';

          appendLog('Artigo de blog renderizado com tags HTML nativas de relevância SEO.', 'success');
          stepBlog.className = 'checklist-item completed';
          await sleep(600);

          // --- FASE 3: SOCIAL MEDIA ---
          stepSocial.className = 'checklist-item active';
          appendLog('>> [FASE 3] Renderizando publicações sociais sob demanda...', 'info');
          await sleep(500);

          // LinkedIn update
          valLinkedinBody.innerHTML = (data.linkedinBody || 'Post de LinkedIn gerado pelo Gemini.').replace(/\n/g, '<br>');
          valLinkedinBody.style.animation = 'fade-in-tab 0.5s ease-out';
          appendLog('LinkedIn Post renderizado com tags dinâmicas.', 'success');
          await sleep(400);

          // X Thread update
          const tweets = data.xThread || [];
          let xHtml = '';
          tweets.forEach((tweetText, idx) => {
            xHtml += `
              <div class="x-tweet">
                <div class="x-tweet-header">
                  <div class="x-avatar">SG</div>
                  <div class="x-author-meta">
                    <span class="x-name">Sabrina Guerra</span>
                    <span class="x-handle">@sabrina_guerra • 1s</span>
                  </div>
                </div>
                <div class="x-tweet-body">
                  ${tweetText}
                </div>
                <div class="x-tweet-footer">
                  <span>💬 ${Math.floor(Math.random() * 20) + 1}</span>
                  <span>🔁 ${Math.floor(Math.random() * 80) + 10}</span>
                  <span>❤️ ${Math.floor(Math.random() * 300) + 50}</span>
                  <span>📊 ${(Math.random() * 8 + 1).toFixed(1)}K</span>
                </div>
              </div>
            `;
          });
          valXThread.innerHTML = xHtml || '<p>Thread não foi estruturada de forma correta.</p>';
          valXThread.style.animation = 'fade-in-tab 0.5s ease-out';
          appendLog('Thread do X renderizada dinamicamente com 4 micro-tweets.', 'success');

          stepSocial.className = 'checklist-item completed';
          await sleep(600);

          // --- FASE 4: EMAIL NEWSLETTER ---
          stepEmail.className = 'checklist-item active';
          appendLog('>> [FASE 4] Consolidando Email Newsletter da campanha...', 'info');
          await sleep(500);

          valEmailSubject.innerHTML = data.emailSubject || 'Newsletter Gemini Enter-View';
          valEmailBody.innerHTML = data.emailBody || '<p>Corpo de newsletter indisponível.</p>';
          valEmailBody.style.animation = 'fade-in-tab 0.5s ease-out';

          appendLog('Newsletter de marketing redigida com aspas estéticas integradas.', 'success');
          stepEmail.className = 'checklist-item completed';
          await sleep(600);

        } catch (error) {
          appendLog(`ERRO DA API: ${error.message}`, 'danger');
          appendLog('Executando rollback automático e rodando Modo Simulado local...', 'warn');
          await sleep(1500);
          await runSimulationMode();
        }
      }
    } else {
      await runSimulationMode();
    }

    // --- CONCLUSÃO GERAL ---
    appendLog('----------------------------------------------------', 'text-muted');
    appendLog('EXPLOSÃO OMNICHANNEL CONCLUÍDA COM SUCESSO! 💥🚀', 'success');
    appendLog('Canais dinâmicos atualizados através do Gemini 3.5 Flash Engine.', 'success');
    appendLog('Campanha pronta para distribuição global na rede de mídias.', 'success');
    
    statusBadge.className = 'metric-badge state-completed';
    statusBadge.textContent = 'Pronto';
    
    engineState.textContent = 'Pronto';
    engineState.style.color = 'var(--color-success)';

    // Trocar automaticamente a aba ativa para a do LinkedIn para mostrar que gerou o conteúdo
    const tabLinkedinBtn = document.querySelector('.tab-btn[data-tab="tab-linkedin"]');
    if (tabLinkedinBtn) {
      tabLinkedinBtn.click();
    }

    isRunning = false;
    btnTrigger.disabled = false;
    btnTrigger.style.opacity = '1';
    btnTrigger.style.cursor = 'pointer';
  });
});

