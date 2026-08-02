/* ============================
   NR-17 ERGONOMIA - GAME LOGIC
   Hora da Segurança
   ============================ */

// ====== STATE ======
const G = {
    name: '', email: '', empresa: '', phase: 0,
    found: [], correct: 0, wrong: 0,
    results: {1:{c:0,w:0},2:{c:0,w:0},3:{c:0,w:0},4:{c:0,w:0},5:{c:0,w:0}},
    quizIdx: 0, cardIdx: 0, vfIdx: 0, p1Idx: 0, timerInterval: null
};

// ====== PLANILHA DE PARTICIPANTES ======
/* Mesma planilha "Treinamentos incrições" usada pelos demais treinamentos.
   Grava duas linhas: Inscrição ao começar e Conclusão ao final, com a
   pontuação e o resultado. */
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbw77Qz-viys5Kd0qg6fHqGqz5sm4Pay2vJDOGmT89FdZI8BLh3hXOVwj4lfYEJx18Axvw/exec';
const NOME_TREINAMENTO = 'NR-17 Ergonomia';

function isEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || '').trim());
}

function registrarNaPlanilha(extra) {
    if (!SHEETS_URL || !G.name) return;
    try {
        fetch(SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: G.name,
                email: G.email,
                data: new Date().toLocaleDateString('pt-BR'),
                treinamento: NOME_TREINAMENTO,
                modo: G.empresa || 'Não informada',
                etapa: (extra && extra.etapa) || '',
                pontuacao: extra && extra.pontuacao != null ? extra.pontuacao : '',
                resultado: (extra && extra.resultado) || ''
            })
        }).catch(e => console.warn('Falha ao registrar:', e));
    } catch (e) {
        console.warn('Falha ao registrar:', e);
    }
}

// ====== AUDIO ======
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function getCtx() { if(!audioCtx) audioCtx = new AudioCtx(); return audioCtx; }

function playOk() {
    try { const c=getCtx(),o=c.createOscillator(),g=c.createGain(); o.connect(g); g.connect(c.destination);
    o.type='sine'; o.frequency.setValueAtTime(523,c.currentTime); o.frequency.setValueAtTime(659,c.currentTime+0.1); o.frequency.setValueAtTime(784,c.currentTime+0.2);
    g.gain.setValueAtTime(0.3,c.currentTime); g.gain.exponentialRampToValueAtTime(0.01,c.currentTime+0.4); o.start(c.currentTime); o.stop(c.currentTime+0.4); } catch(e){}
}
function playErr() {
    try { const c=getCtx(),o=c.createOscillator(),g=c.createGain(); o.connect(g); g.connect(c.destination);
    o.type='sawtooth'; o.frequency.setValueAtTime(200,c.currentTime); o.frequency.setValueAtTime(150,c.currentTime+0.15);
    g.gain.setValueAtTime(0.2,c.currentTime); g.gain.exponentialRampToValueAtTime(0.01,c.currentTime+0.3); o.start(c.currentTime); o.stop(c.currentTime+0.3); } catch(e){}
}
function playWin() {
    try { const c=getCtx(); [523,659,784,1047].forEach((f,i)=>{ const o=c.createOscillator(),g=c.createGain(); o.connect(g); g.connect(c.destination);
    o.type='sine'; o.frequency.setValueAtTime(f,c.currentTime+i*0.15); g.gain.setValueAtTime(0.2,c.currentTime+i*0.15);
    g.gain.exponentialRampToValueAtTime(0.01,c.currentTime+i*0.15+0.3); o.start(c.currentTime+i*0.15); o.stop(c.currentTime+i*0.15+0.3); }); } catch(e){}
}

/* sort(()=>Math.random()-0.5) não embaralha de verdade: o comparador é
   inconsistente e o resultado fica enviesado para a ordem original — a
   alternativa certa acabava aparecendo mais vezes na mesma posição. */
function embaralhar(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ====== SCREENS ======
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById(id);
    if(el) el.classList.add('active');
}

function closePopup(id) { document.getElementById(id).classList.add('hidden'); }

// ====== REGISTRATION ======
function erroCadastro(msg, campoId) {
    ['inputName', 'inputEmail', 'inputEmpresa'].forEach(id => document.getElementById(id).classList.remove('invalido'));
    const box = document.getElementById('setupErro');
    box.innerHTML = '⚠️ ' + msg;
    box.classList.remove('hidden');
    const campo = document.getElementById(campoId);
    if (campo) {
        campo.classList.add('invalido');
        campo.classList.add('shake');
        setTimeout(() => campo.classList.remove('shake'), 450);
        setTimeout(() => campo.focus(), 200);
    }
    playErr();
}

function confirmName() {
    const nome = document.getElementById('inputName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const empresa = document.getElementById('inputEmpresa').value.trim();

    if (nome.length < 3)       return erroCadastro('Informe o seu <strong>nome completo</strong>.', 'inputName');
    if (!isEmailValido(email)) return erroCadastro('Informe um <strong>e-mail válido</strong>.', 'inputEmail');
    if (empresa.length < 2)    return erroCadastro('Informe a <strong>empresa ou instituição</strong>.', 'inputEmpresa');

    document.getElementById('setupErro').classList.add('hidden');
    G.name = nome; G.email = email; G.empresa = empresa;
    registrarNaPlanilha({ etapa: 'Inscrição' });

    G.phase = 1;
    showPhaseIntro(1);
}

document.addEventListener('DOMContentLoaded', () => {
    const n = document.getElementById('inputName');
    const e = document.getElementById('inputEmail');
    const c = document.getElementById('inputEmpresa');
    n?.addEventListener('keypress', ev => { if (ev.key === 'Enter') e.focus(); });
    e?.addEventListener('keypress', ev => { if (ev.key === 'Enter') c.focus(); });
    c?.addEventListener('keypress', ev => { if (ev.key === 'Enter') confirmName(); });
    [n, e, c].forEach(el => el?.addEventListener('input', () => {
        el.classList.remove('invalido');
        document.getElementById('setupErro').classList.add('hidden');
    }));
});

// ====== PHASE INTROS ======
const PHASES = {
    1: { badge:'FASE 1', icon:'🪑', title:'Monte o Posto de Trabalho', desc:'Monte um posto de trabalho ergonômico escolhendo os itens corretos para cada elemento. Aplique os conceitos da NR-17 sobre mobiliário e postura!', rules:[{ok:true,t:'Escolha correta = Acerto!'},{ok:false,t:'Escolha errada = Erro!'}] },
    2: { badge:'FASE 2', icon:'🔍', title:'Caça aos Erros - Escritório', desc:'Observe o cenário de um escritório. Existem <strong>8 violações ergonômicas</strong> escondidas. Clique sobre cada risco para identificá-lo!', rules:[{ok:true,t:'Clique no risco = Acerto!'},{ok:false,t:'Clique fora = Erro!'}] },
    3: { badge:'FASE 3', icon:'⏱️', title:'Quiz Relâmpago NR-17', desc:'Responda <strong>15 perguntas</strong> sobre a NR-17 antes que o tempo acabe! Você tem <strong>15 segundos</strong> por pergunta.', rules:[{ok:true,t:'Resposta correta = +1 ponto'},{ok:false,t:'Resposta errada ou tempo esgotado = Erro'}] },
    4: { badge:'FASE 4', icon:'🃏', title:'Cartas Ergonômicas', desc:'Para cada <strong>problema ergonômico</strong> apresentado, selecione a <strong>solução correta</strong> entre as opções disponíveis.', rules:[{ok:true,t:'Solução correta = Acerto!'},{ok:false,t:'Solução errada = Erro!'}] },
    5: { badge:'FASE 5', icon:'🧠', title:'Verdadeiro ou Falso', desc:'Avalie <strong>12 afirmações</strong> sobre ergonomia e NR-17. Classifique cada uma como Verdadeira ou Falsa!', rules:[{ok:true,t:'Classificação correta = Acerto!'},{ok:false,t:'Classificação errada = Erro!'}] }
};

function showPhaseIntro(phase) {
    G.phase = phase;
    const p = PHASES[phase];
    document.getElementById('introBadge').textContent = p.badge;
    document.getElementById('introIcon').textContent = p.icon;
    document.getElementById('introTitle').textContent = p.title;
    document.getElementById('introDesc').innerHTML = p.desc;
    
    // Progress dots
    let dots = '';
    for(let i=1;i<=5;i++) dots += `<div class="progress-dot ${i<phase?'completed':''} ${i===phase?'active':''}"></div>`;
    document.getElementById('progressDots').innerHTML = dots;
    
    // Rules
    let rules = '';
    p.rules.forEach(r => rules += `<div class="rule"><span class="rule-icon ${r.ok?'correct':'wrong'}">${r.ok?'✓':'✗'}</span><span>${r.t}</span></div>`);
    document.getElementById('introRules').innerHTML = rules;
    
    showScreen('phaseIntro');
}

function startCurrentPhase() {
    G.correct = 0; G.wrong = 0; G.found = [];
    switch(G.phase) {
        case 1: startPhase1(); break;
        case 2: startClickScene(2); break;
        case 3: startQuiz(); break;
        case 4: startCards(); break;
        case 5: startVF(); break;
    }
}

// ============================================================
// PHASE 1: MONTE O POSTO DE TRABALHO
// ============================================================
const WORKSTATION_ITEMS = [
    {
        id:'chair', question:'Qual cadeira é adequada para o posto de trabalho?',
        correct: { label:'Cadeira com apoio lombar, altura regulável, borda arredondada e apoio de braços', icon:'🪑', detail:'A NR-17 exige cadeira com ajuste de altura, apoio lombar, borda frontal arredondada e base estável com 5 rodízios.' },
        wrong: [
            { label:'Banqueta fixa sem encosto', icon:'🪵' },
            { label:'Cadeira fixa sem regulagem de altura', icon:'💺' },
            { label:'Cadeira de praia dobrável', icon:'⛱️' }
        ]
    },
    {
        id:'monitor', question:'Qual o posicionamento correto do monitor?',
        correct: { label:'Topo da tela na linha dos olhos, a 50-70cm de distância', icon:'🖥️', detail:'O monitor deve estar com o topo na altura dos olhos e entre 50 a 70cm de distância, conforme a NR-17, para evitar flexão cervical.' },
        wrong: [
            { label:'Monitor na altura do peito, a 30cm', icon:'📱' },
            { label:'Monitor acima da cabeça, a 1m', icon:'📺' },
            { label:'Monitor ao lado, exigindo rotação do pescoço', icon:'🔄' }
        ]
    },
    {
        id:'keyboard', question:'Qual a posição correta do teclado e mouse?',
        correct: { label:'Na altura dos cotovelos com antebraços paralelos ao chão e punhos neutros', icon:'⌨️', detail:'Teclado e mouse devem ficar na altura dos cotovelos, antebraços paralelos ao chão, punhos em posição neutra. Evitar elevação dos ombros.' },
        wrong: [
            { label:'Teclado acima dos ombros em prateleira alta', icon:'📤' },
            { label:'Teclado no colo sem apoio', icon:'🦵' },
            { label:'Mouse muito distante exigindo extensão do braço', icon:'🖱️' }
        ]
    },
    {
        id:'feet', question:'Quando é necessário usar apoio para os pés?',
        correct: { label:'Quando os pés não alcançam o chão com a cadeira na altura correta', icon:'🦶', detail:'O apoio para os pés é necessário quando, mesmo com a cadeira ajustada, os pés não repousam completamente no piso. Deve ter inclinação ajustável.' },
        wrong: [
            { label:'Sempre, independente da altura da cadeira', icon:'📦' },
            { label:'Nunca, pés devem ficar suspensos', icon:'🦿' },
            { label:'Apenas para pessoas acima de 1,80m', icon:'📏' }
        ]
    },
    {
        id:'lighting', question:'Qual a iluminação correta para o posto com computador?',
        correct: { label:'Iluminação indireta, sem reflexo na tela, com luminária ajustável para documentos', icon:'💡', detail:'A NR-17 determina iluminação adequada sem ofuscamento ou reflexos na tela. Usar iluminação indireta e complementar com luminária para leitura de documentos.' },
        wrong: [
            { label:'Luz forte direta na tela do computador', icon:'🔦' },
            { label:'Sem iluminação, apenas a luz do monitor', icon:'🌑' },
            { label:'Janela atrás do monitor causando ofuscamento', icon:'☀️' }
        ]
    }
];

function startPhase1() {
    G.p1Idx = 0; G.correct = 0; G.wrong = 0;
    document.getElementById('p1Progress').textContent = '0';
    document.getElementById('p1Total').textContent = WORKSTATION_ITEMS.length;
    document.getElementById('p1Correct').textContent = '0';
    document.getElementById('p1Wrong').textContent = '0';
    showScreen('phase1');
    renderP1Question();
}

function renderP1Question() {
    if(G.p1Idx >= WORKSTATION_ITEMS.length) {
        G.results[1] = {c:G.correct, w:G.wrong};
        showComplete();
        return;
    }
    const item = WORKSTATION_ITEMS[G.p1Idx];
    document.getElementById('selectionQuestion').textContent = item.question;
    
    // Build workspace visual progress
    renderWorkstationVisual();
    
    // Build options
    const options = embaralhar([item.correct, ...item.wrong]);
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerHTML = `<span class="option-icon">${opt.icon}</span><span class="option-label">${opt.label}</span>`;
        card.addEventListener('click', () => handleP1Choice(opt === item.correct, item.correct.detail, card));
        grid.appendChild(card);
    });
}

function renderWorkstationVisual() {
    const nomes = { chair:'Assento', monitor:'Monitor', keyboard:'Teclado e mouse', feet:'Apoio para os pés', lighting:'Iluminação' };
    const icones = { chair:'🪑', monitor:'🖥️', keyboard:'⌨️', feet:'🦶', lighting:'💡' };

    let html = '<div class="ws-titulo">POSTO EM MONTAGEM</div><div class="ws-lista">';
    WORKSTATION_ITEMS.forEach((item, i) => {
        const estado = i < G.p1Idx ? 'ok' : (i === G.p1Idx ? 'agora' : 'futuro');
        const valor = i < G.p1Idx
            ? item.correct.label
            : (i === G.p1Idx ? 'definindo agora…' : 'aguardando');
        html += `<div class="ws-linha ${estado}">
            <span class="ws-ico">${i < G.p1Idx ? '✅' : icones[item.id]}</span>
            <span><span class="ws-nome">${nomes[item.id]}</span><span class="ws-valor">${valor}</span></span>
        </div>`;
    });
    html += '</div>';
    document.getElementById('workstationVisual').innerHTML = html;
}

function handleP1Choice(isCorrect, detail, cardEl) {
    const allCards = document.querySelectorAll('.option-card');
    allCards.forEach(c => c.style.pointerEvents = 'none');
    
    if(isCorrect) {
        playOk(); G.correct++;
        cardEl.classList.add('correct-option');
    } else {
        playErr(); G.wrong++;
        cardEl.classList.add('wrong-option');
        // Highlight correct
        allCards.forEach(c => {
            if(c.querySelector('.option-label').textContent === WORKSTATION_ITEMS[G.p1Idx].correct.label) {
                c.classList.add('correct-option');
            }
        });
    }
    
    document.getElementById('p1Correct').textContent = G.correct;
    document.getElementById('p1Wrong').textContent = G.wrong;
    document.getElementById('p1Progress').textContent = G.p1Idx + 1;
    
    // Show detail popup
    setTimeout(() => {
        G.p1Idx++;
        renderP1Question();
    }, 1500);
}

// ============================================================
// PHASE 2 & 3: CLICK SCENE (FIND RISKS)
// ============================================================
const OFFICE_RISKS = [
    { id:'o1', name:'Monitor Muito Baixo', description:'O monitor está posicionado abaixo da linha dos olhos, forçando o trabalhador a inclinar a cabeça para baixo. O topo da tela deve estar na altura dos olhos, conforme NR-17.', x:20, y:22, width:8, height:18 },
    { id:'o2', name:'Cadeira sem Apoio Lombar', description:'Cadeira sem apoio lombar adequado e sem regulagem de altura. A NR-17 exige cadeira com suporte lombar ajustável, altura regulável e borda frontal arredondada.', x:2, y:55, width:10, height:25 },
    { id:'o3', name:'Teclado em Altura Incorreta', description:'O teclado está posicionado acima da altura dos cotovelos, fazendo o trabalhador elevar os ombros. Os antebraços devem ficar paralelos ao chão.', x:17, y:48, width:12, height:10 },
    { id:'o4', name:'Fios e Cabos no Chão', description:'Cabos desorganizados no piso, criando risco de tropeço. A organização do posto de trabalho é parte da ergonomia conforme NR-17.', x:30, y:62, width:25, height:20 },
    { id:'o5', name:'Luminária Causando Reflexo na Tela', description:'A luminária está direcionada para a tela do computador, causando ofuscamento e reflexo. A NR-17 exige iluminação sem reflexos incômodos na tela.', x:57, y:25, width:12, height:25 },
    { id:'o6', name:'Ar Condicionado Direto no Trabalhador', description:'O ar condicionado está soprando diretamente no trabalhador, causando desconforto térmico. A NR-17 exige condições de conforto térmico sem correntes de ar diretas.', x:82, y:5, width:16, height:28 },
    { id:'o7', name:'Postura Curvada / Cifose', description:'Trabalhador com postura extremamente curvada (cifose). A organização do trabalho deve promover postura adequada com tronco ereto ou levemente inclinado para frente.', x:5, y:25, width:14, height:35 },
    { id:'o8', name:'Mesa Muito Baixa', description:'A mesa está muito baixa, forçando o trabalhador a curvar o pescoço e o tronco. A superfície de trabalho deve ser compatível com a atividade e permitir postura correta.', x:14, y:55, width:16, height:12 }
];

const FACTORY_RISKS = [
    { id:'f1', name:'Levantamento com Coluna Curvada', description:'Trabalhador levantando carga com a coluna curvada e pernas retas. A técnica correta é dobrar os joelhos, manter a coluna ereta e a carga próxima ao corpo.', x:2, y:30, width:15, height:50 },
    { id:'f2', name:'Carga Acima dos Ombros', description:'Trabalhador alcançando carga acima dos ombros. A NR-17 determina que o armazenamento deve ser feito em alturas que permitam acesso entre quadril e ombros.', x:20, y:10, width:12, height:50 },
    { id:'f3', name:'Trabalho em Pé sem Tapete Anti-Fadiga', description:'Trabalhador em pé sobre piso duro por tempo prolongado sem tapete anti-fadiga. A NR-17 exige medidas para reduzir a fadiga em trabalho estático em pé.', x:10, y:60, width:10, height:30 },
    { id:'f4', name:'Bancada com Altura Inadequada', description:'A bancada de trabalho está muito baixa, forçando flexão da coluna. A altura da bancada deve permitir trabalho com postura ereta.', x:38, y:40, width:16, height:30 },
    { id:'f5', name:'Ferramenta com Empunhadura Inadequada', description:'Trabalhador usando ferramenta manual com empunhadura que exige desvio do punho. As ferramentas devem ter empunhadura ergonômica e peso adequado.', x:36, y:28, width:10, height:20 },
    { id:'f6', name:'Movimento Repetitivo sem Rodízio', description:'Trabalhador realizando tarefa repetitiva na esteira sem alternância de atividades. A NR-17 determina pausas e alternância de tarefas para reduzir movimentos repetitivos.', x:62, y:30, width:18, height:40 },
    { id:'f7', name:'Carga Longe do Corpo', description:'Trabalhador carregando carga com os braços estendidos, longe do corpo. A NR-17 proíbe levantamento não eventual quando a distância horizontal for >60cm do corpo.', x:82, y:20, width:15, height:55 },
    { id:'f8', name:'Ausência de Área de Descanso', description:'Não há local adequado para pausas e recuperação psicofisiológica visível. A NR-17 determina pausas fora do posto de trabalho, computadas como tempo de trabalho efetivo.', x:44, y:15, width:14, height:20 }
];

function startClickScene(phase) {
    G.found = []; G.correct = 0; G.wrong = 0;

    const cena = phase === 2 ? CENAS.escritorio : CENAS.fabrica;
    const riscos = cena.riscos;

    document.getElementById('csPhaseNum').textContent = phase;
    document.getElementById('csPhaseTitle').textContent = phase === 2 ? 'Escritório' : 'Fábrica';
    document.getElementById('csFound').textContent = '0';
    document.getElementById('csTotal').textContent = riscos.length;
    document.getElementById('csCorrect').textContent = '0';
    document.getElementById('csWrong').textContent = '0';

    /* A cena é desenhada em SVG e cada risco é um <g data-risco>. O clique
       acerta o risco porque acerta o próprio desenho — não existe mais
       retângulo invisível desalinhado da figura. */
    const alvo = document.getElementById('cenaSvg');
    alvo.innerHTML = montarCena(phase === 2 ? 'escritorio' : 'fabrica');

    const container = document.getElementById('clickSceneContainer');
    container.onclick = (e) => handleClickScene(e, riscos, phase);

    // teclado: cada risco é focável
    alvo.querySelectorAll('.risco').forEach(g => {
        g.onkeydown = (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); g.dispatchEvent(new MouseEvent('click', {bubbles:true})); }
        };
    });

    document.getElementById('clickFeedback').innerHTML = '';
    showScreen('clickScene');

    /* Só depois de a tela ficar visível: getBBox() devolve zero enquanto o
       elemento está em display:none, e as áreas de clique sairiam vazias.
       Chamada SÍNCRONA de propósito — getBBox força o layout na hora. Não use
       requestAnimationFrame aqui: em aba de segundo plano ele não dispara e as
       áreas nunca seriam criadas. O setTimeout é só uma rede de segurança. */
    ativarAreasDeClique(alvo.querySelector('svg'));
    setTimeout(() => ativarAreasDeClique(alvo.querySelector('svg')), 80);
}

function handleClickScene(e, riscos, phase) {
    const grupo = e.target.closest ? e.target.closest('.risco') : null;
    const id = grupo ? grupo.dataset.risco : null;
    const achou = id && !G.found.includes(id) ? riscos.find(r => r.id === id) : null;
    const jaAchado = id && G.found.includes(id);

    // marcador no ponto exato do clique
    const ct = document.getElementById('clickSceneContainer');
    const rect = ct.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    const fb = document.getElementById('clickFeedback');
    const m = document.createElement('div');
    m.className = `marcador ${achou ? 'certo' : 'errado'}`;
    m.textContent = achou ? '✓' : '✗';
    m.style.cssText = `left:${mx}%;top:${my}%`;
    fb.appendChild(m);
    setTimeout(() => m.remove(), 800);

    if (achou) {
        playOk();
        G.found.push(achou.id); G.correct++;
        grupo.classList.add('achado');
        contornarAchado(grupo);
        marcarAchado(grupo, G.found.length);
        document.getElementById('csFound').textContent = G.found.length;
        document.getElementById('csCorrect').textContent = G.correct;

        document.getElementById('riskPopupTitle').textContent = achou.nome;
        document.getElementById('riskPopupDesc').textContent = achou.desc;
        document.getElementById('riskPopup').classList.remove('hidden');

        if (G.found.length >= riscos.length) {
            G.results[phase] = { c: G.correct, w: G.wrong };
            setTimeout(() => {
                document.getElementById('riskPopup').classList.add('hidden');
                showComplete();
            }, 1400);
        }
        return;
    }

    if (jaAchado) return;   // reclicar num risco já encontrado não penaliza

    playErr(); G.wrong++;
    document.getElementById('csWrong').textContent = G.wrong;

    /* O erro precisa ser sentido: a cena treme, pisca de vermelho e um aviso
       curto explica que ali não há risco — sem dizer onde ele está. */
    ct.classList.add('errou');
    setTimeout(() => ct.classList.remove('errou'), 700);

    const faltam = riscos.length - G.found.length;
    const frases = [
        'Aqui não há risco ergonômico. Observe a postura, o mobiliário e o entorno.',
        'Nada de errado neste ponto. Olhe a altura dos equipamentos e o apoio do corpo.',
        'Ponto correto do cenário. Procure o que força o corpo a compensar.'
    ];
    const aviso = document.createElement('div');
    aviso.className = 'aviso-erro';
    aviso.innerHTML = `<span>❌</span><span>${frases[G.wrong % frases.length]} Faltam ${faltam}.</span>`;
    ct.appendChild(aviso);
    setTimeout(() => aviso.remove(), 1900);
}

/* Contorno verde tracejado em volta do risco encontrado, para ele continuar
   visível mesmo depois da animação. */
function contornarAchado(grupo) {
    const area = grupo.querySelector('.area-clique');
    if (!area || grupo.querySelector('.contorno-achado')) return;
    const NS = 'http://www.w3.org/2000/svg';
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('class', 'contorno-achado');
    r.setAttribute('x', area.getAttribute('x'));
    r.setAttribute('y', area.getAttribute('y'));
    r.setAttribute('width', area.getAttribute('width'));
    r.setAttribute('height', area.getAttribute('height'));
    r.setAttribute('rx', '10');
    r.setAttribute('fill', 'rgba(34,197,94,0.16)');
    r.setAttribute('stroke', '#22c55e');
    r.setAttribute('stroke-width', '4');
    r.setAttribute('stroke-dasharray', '10 7');
    r.setAttribute('pointer-events', 'none');
    grupo.appendChild(r);
}

/* Selo verde numerado, ancorado no centro do risco encontrado. Fica na cena
   até o fim da fase, servindo de placar visual do que já foi achado. */
function marcarAchado(grupo, numero) {
    const svg = grupo.ownerSVGElement;
    const area = grupo.querySelector('.area-clique');
    if (!svg || !area) return;

    const x = +area.getAttribute('x') + (+area.getAttribute('width')) / 2;
    const y = +area.getAttribute('y') + 16;
    const NS = 'http://www.w3.org/2000/svg';

    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'selo-achado');
    g.setAttribute('transform', `translate(${x} ${y})`);
    g.innerHTML =
        '<circle r="21" fill="#16a34a" stroke="#dcfce7" stroke-width="4"/>' +
        `<text y="7" text-anchor="middle" font-family="Outfit, sans-serif" font-size="21" font-weight="900" fill="#fff">${numero}</text>`;
    svg.appendChild(g);
}

// ============================================================
// PHASE 4: QUIZ RELÂMPAGO
// ============================================================
const QUIZ = [
    { q:'Qual é o principal objetivo da NR-17?', opts:['Adaptar as condições de trabalho às características dos trabalhadores','Regular o uso de EPIs','Definir horário de trabalho','Estabelecer pisos salariais'], correct:0, exp:'A NR-17 visa adaptar as condições de trabalho às características psicofisiológicas dos trabalhadores para proporcionar conforto, segurança e desempenho eficiente.' },
    { q:'Qual a distância recomendada entre os olhos e o monitor?', opts:['20 a 30 cm','50 a 70 cm','80 a 100 cm','1 metro ou mais'], correct:1, exp:'A distância recomendada entre os olhos e o monitor é de 50 a 70 cm para evitar fadiga visual.' },
    { q:'Onde deve ficar o topo do monitor em relação aos olhos?', opts:['Acima da cabeça','Na linha dos olhos ou ligeiramente abaixo','Na altura do peito','Na altura do queixo'], correct:1, exp:'O topo da tela deve ficar na linha dos olhos ou ligeiramente abaixo para manter a postura cervical neutra.' },
    { q:'A cadeira de trabalho deve ter:', opts:['Apenas assento e encosto fixos','Altura regulável, apoio lombar e borda frontal arredondada','Rodinhas e encosto alto, sem regulagem','Apoio de cabeça obrigatório'], correct:1, exp:'A NR-17 exige cadeira com regulagem de altura, apoio lombar e borda frontal arredondada para conforto e circulação sanguínea.' },
    { q:'Qual é a distância horizontal máxima permitida para levantamento não eventual de cargas?', opts:['30 cm do corpo','45 cm do corpo','60 cm do corpo','100 cm do corpo'], correct:2, exp:'A NR-17 veda o levantamento não eventual de cargas quando a distância de alcance horizontal for superior a 60 cm do corpo.' },
    { q:'As pausas para recuperação psicofisiológica devem ser:', opts:['Descontadas do salário','Computadas como tempo de trabalho efetivo','Realizadas apenas no horário de almoço','Opcionais e a critério do empregador'], correct:1, exp:'A NR-17 determina que as pausas devem ser computadas como tempo de trabalho efetivo e não podem ser acompanhadas de aumento de cadência.' },
    { q:'As pausas devem ser usufruídas:', opts:['No próprio posto de trabalho','Fora do posto de trabalho','No refeitório apenas','Na portaria da empresa'], correct:1, exp:'Segundo a NR-17, as pausas devem ser usufruídas fora dos postos de trabalho, em local adequado.' },
    { q:'O que é a AEP (Avaliação Ergonômica Preliminar)?', opts:['Uma avaliação detalhada feita por médico','Uma avaliação obrigatória para identificar riscos ergonômicos','Um exame admissional do trabalhador','Um treinamento obrigatório de ergonomia'], correct:1, exp:'A AEP é obrigatória para todas as organizações e serve para identificar perigos e avaliar riscos ergonômicos de forma preliminar.' },
    { q:'Sobre a iluminação no posto de trabalho, a NR-17 determina:', opts:['Mínimo de 1000 lux em todos os postos','Iluminação adequada, sem ofuscamento e reflexos','Apenas iluminação natural','Luz fluorescente obrigatória'], correct:1, exp:'A NR-17 exige iluminação adequada à atividade, evitando ofuscamento, reflexos incômodos, sombras e contrastes excessivos.' },
    { q:'O trabalhador pode ser impedido de ir ao banheiro durante o expediente?', opts:['Sim, se estiver em horário de pico','Sim, se já tiver feito pausa','Não, é assegurada a saída a qualquer momento','Apenas com autorização do supervisor'], correct:2, exp:'A NR-17 assegura a saída do posto de trabalho para satisfação de necessidades fisiológicas a qualquer momento, independentemente de pausas programadas.' },
    { q:'Para o trabalho sentado, os pés devem:', opts:['Ficar suspensos para melhorar a circulação','Repousar completamente no piso ou em apoio','Ficar cruzados sob a cadeira','Apoiar-se na base da cadeira'], correct:1, exp:'Os pés devem repousar completamente no piso ou em apoio para os pés quando a cadeira não permite que toquem o chão.' },
    { q:'A técnica correta de levantamento de carga manual inclui:', opts:['Curvar a coluna e usar a força das costas','Dobrar os joelhos e manter a coluna ereta','Girar o tronco enquanto levanta','Levantar com os braços estendidos'], correct:1, exp:'A técnica correta é dobrar os joelhos, manter a coluna ereta e a carga próxima ao corpo, evitando torções do tronco.' },
    { q:'A NR-17 se aplica a quais tipos de organização?', opts:['Apenas indústrias','Apenas escritórios','Apenas hospitais','Todas as organizações com empregados CLT'], correct:3, exp:'A NR-17 se aplica a todas as organizações e órgãos públicos que possuam empregados regidos pela CLT.' },
    { q:'O que a NR-17 diz sobre mobiliário em postos de trabalho informatizados?', opts:['Não há regulamentação específica','Deve permitir ajustes para postura adequada','Basta ter mesa e cadeira de qualquer tipo','Apenas monitores precisam de regulagem'], correct:1, exp:'A NR-17 exige que o mobiliário permita ajustes para garantir postura adequada, incluindo regulagem de cadeira, mesa e posicionamento de equipamentos.' },
    { q:'Para promover a alternância de tarefas, o empregador deve:', opts:['Permitir que o trabalhador varie posturas e grupos musculares','Obrigar o mesmo movimento por 8 horas','Proibir pausas para manter a produtividade','Trocar os trabalhadores a cada hora'], correct:0, exp:'A NR-17 recomenda a alternância de tarefas para variar posturas e grupos musculares utilizados, prevenindo lesões por esforços repetitivos.' }
];

function startQuiz() {
    G.quizIdx = 0; G.correct = 0; G.wrong = 0;
    document.getElementById('quizProgress').textContent = '0';
    document.getElementById('quizTotal').textContent = QUIZ.length;
    document.getElementById('quizCorrect').textContent = '0';
    document.getElementById('quizWrong').textContent = '0';
    showScreen('phase4');
    loadQuizQuestion();
}

function loadQuizQuestion() {
    if(G.quizIdx >= QUIZ.length) {
        clearInterval(G.timerInterval);
        G.results[4] = {c:G.correct, w:G.wrong};
        showComplete();
        return;
    }
    const q = QUIZ[G.quizIdx];
    document.getElementById('quizNumber').textContent = `Pergunta ${G.quizIdx+1} de ${QUIZ.length}`;
    document.getElementById('quizQuestion').textContent = q.q;
    
    const grid = document.getElementById('quizOptions');
    grid.innerHTML = '';
    // guarda o TEXTO da correta: depois de embaralhar, o índice original não vale mais
    const textoCerto = q.opts[q.correct];
    const letras = ['A', 'B', 'C', 'D', 'E'];
    embaralhar(q.opts).forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span class="quiz-letra">${letras[i]}</span><span>${opt}</span>`;
        btn.dataset.texto = opt;
        btn.addEventListener('click', () => handleQuizAnswer(opt === textoCerto, textoCerto, q, btn));
        grid.appendChild(btn);
    });

    startTimer();
}

let timerSeconds = 15;
function startTimer() {
    clearInterval(G.timerInterval);
    timerSeconds = 15;
    const bar = document.getElementById('timerBar');
    const txt = document.getElementById('timerText');
    bar.style.width = '100%';
    bar.classList.remove('urgente');
    txt.textContent = '15s';
    
    G.timerInterval = setInterval(() => {
        timerSeconds--;
        txt.textContent = timerSeconds + 's';
        bar.style.width = (timerSeconds/15*100) + '%';
        
        if (timerSeconds <= 5) bar.classList.add('urgente');
        
        if(timerSeconds <= 0) {
            clearInterval(G.timerInterval);
            handleQuizTimeout();
        }
    }, 1000);
}

function handleQuizAnswer(acertou, textoCerto, q, btn) {
    clearInterval(G.timerInterval);
    const todos = document.querySelectorAll('#quizOptions .quiz-option');
    todos.forEach(b => { b.classList.add('travado'); b.style.pointerEvents = 'none'; });

    if (acertou) {
        playOk(); G.correct++;
        btn.classList.add('correta');
    } else {
        playErr(); G.wrong++;
        if (btn) btn.classList.add('errada');
        todos.forEach(b => { if (b.dataset.texto === textoCerto) b.classList.add('correta'); });
    }

    document.getElementById('quizCorrect').textContent = G.correct;
    document.getElementById('quizWrong').textContent = G.wrong;
    document.getElementById('quizProgress').textContent = G.quizIdx + 1;

    showQuizFeedback(acertou, q.exp);
}

function handleQuizTimeout() {
    const q = QUIZ[G.quizIdx];
    const textoCerto = q.opts[q.correct];
    const todos = document.querySelectorAll('#quizOptions .quiz-option');
    todos.forEach(b => {
        b.classList.add('travado'); b.style.pointerEvents = 'none';
        if (b.dataset.texto === textoCerto) b.classList.add('correta');
    });
    playErr(); G.wrong++;
    document.getElementById('quizWrong').textContent = G.wrong;
    document.getElementById('quizProgress').textContent = G.quizIdx + 1;
    showQuizFeedback(false, '⏱️ Tempo esgotado. ' + q.exp);
}

function showQuizFeedback(isCorrect, exp) {
    const content = document.getElementById('quizFeedbackContent');
    content.className = `popup-content ${isCorrect?'correct-feedback':'wrong-feedback'}`;
    document.getElementById('quizFeedbackIcon').textContent = isCorrect?'✅':'❌';
    document.getElementById('quizFeedbackTitle').textContent = isCorrect?'Correto!':'Incorreto!';
    document.getElementById('quizFeedbackDesc').textContent = exp;
    document.getElementById('quizFeedback').classList.remove('hidden');
}

function nextQuizQuestion() {
    document.getElementById('quizFeedback').classList.add('hidden');
    G.quizIdx++;
    loadQuizQuestion();
}

// ============================================================
// PHASE 5: CARTAS ERGONÔMICAS
// ============================================================
const CARD_SCENARIOS = [
    { icon:'😣', title:'Dor Lombar ao Sentar', desc:'Trabalhador sente dores frequentes na região lombar após horas sentado no escritório.', correctId:'apoio_lombar',
      exp:'A cadeira com apoio lombar ajustável mantém a curvatura natural da coluna, prevenindo lombalgias. A NR-17 exige cadeira com suporte lombar.' },
    { icon:'👀', title:'Fadiga Visual no Computador', desc:'Trabalhador apresenta ardência nos olhos, visão embaçada e dores de cabeça ao final do dia.',  correctId:'monitor_correto',
      exp:'Monitor na altura dos olhos (50-70cm) + regra 20-20-20 (a cada 20 min, olhar 20 segundos para algo a 20 pés/6m) reduzem a fadiga visual.' },
    { icon:'🤛', title:'Dor nos Punhos ao Digitar', desc:'Trabalhador sente formigamento e dor nos punhos após períodos prolongados de digitação.', correctId:'teclado_ergonomico',
      exp:'Teclado na altura dos cotovelos com apoio de punho mantém os punhos em posição neutra, prevenindo LER/DORT.' },
    { icon:'🦵', title:'Dor nas Pernas (Trabalho em Pé)', desc:'Trabalhador da fábrica sente dor e inchaço nas pernas por ficar em pé o dia todo.', correctId:'tapete_antifadiga',
      exp:'Alternância de postura + tapete anti-fadiga reduzem a sobrecarga nos membros inferiores em trabalho estático em pé, conforme NR-17.' },
    { icon:'💪', title:'Lesão ao Levantar Carga', desc:'Trabalhador lesionou a coluna ao levantar caixa pesada do chão na fábrica.', correctId:'tecnica_correta',
      exp:'A técnica correta: dobrar os joelhos, manter coluna ereta e carga próxima ao corpo. A NR-17 veda levantamento com distância horizontal >60cm.' },
    { icon:'😰', title:'Estresse por Ritmo Acelerado', desc:'Trabalhador apresenta sinais de estresse e esgotamento mental por ritmo de trabalho intenso sem pausas.', correctId:'pausas_programadas',
      exp:'A NR-17 determina pausas para recuperação psicofisiológica, computadas como tempo de trabalho, fora do posto de trabalho.' },
    { icon:'🤕', title:'Dor no Pescoço', desc:'Trabalhador sente dor cervical frequente ao consultar documentos impressos durante a digitação.', correctId:'suporte_documentos',
      exp:'Suporte de documentos na altura dos olhos, ao lado do monitor, evita rotações e flexões do pescoço ao alternar entre tela e papel.' },
    { icon:'🖐️', title:'Síndrome do Túnel do Carpo', desc:'Trabalhador diagnosticado com síndrome do túnel do carpo por movimentos repetitivos.', correctId:'pausas_alongamento',
      exp:'Pausas regulares + exercícios de alongamento + mouse/teclado ergonômico previnem a compressão do nervo mediano no túnel do carpo.' }
];

const ALL_SOLUTIONS = [
    { id:'apoio_lombar', icon:'🪑', name:'Cadeira com Apoio Lombar' },
    { id:'monitor_correto', icon:'🖥️', name:'Monitor na Linha dos Olhos + Regra 20-20-20' },
    { id:'teclado_ergonomico', icon:'⌨️', name:'Teclado na Altura dos Cotovelos + Apoio de Punho' },
    { id:'tapete_antifadiga', icon:'🧱', name:'Alternância de Postura + Tapete Anti-Fadiga' },
    { id:'tecnica_correta', icon:'🏋️', name:'Dobrar Joelhos + Coluna Ereta + Carga Próxima' },
    { id:'pausas_programadas', icon:'⏸️', name:'Pausas Programadas + Alternância de Tarefas' },
    { id:'suporte_documentos', icon:'📋', name:'Suporte de Documentos na Altura dos Olhos' },
    { id:'pausas_alongamento', icon:'🤸', name:'Pausas + Alongamento + Equipamento Ergonômico' },
    { id:'ar_condicionado', icon:'❄️', name:'Ajustar Ar Condicionado' },
    { id:'epi_coluna', icon:'🦺', name:'Colete para Coluna' }
];

function startCards() {
    G.cardIdx = 0; G.correct = 0; G.wrong = 0;
    document.getElementById('cardProgress5').textContent = '0';
    document.getElementById('cardTotal5').textContent = CARD_SCENARIOS.length;
    document.getElementById('cardCorrect5').textContent = '0';
    document.getElementById('cardWrong5').textContent = '0';
    showScreen('phase5');
    loadCard5();
}

function loadCard5() {
    if(G.cardIdx >= CARD_SCENARIOS.length) {
        G.results[5] = {c:G.correct, w:G.wrong};
        showComplete();
        return;
    }
    const sc = CARD_SCENARIOS[G.cardIdx];
    document.getElementById('problemIcon').textContent = sc.icon;
    document.getElementById('problemTitle').textContent = sc.title;
    document.getElementById('problemDesc').textContent = sc.desc;
    
    const correctSol = ALL_SOLUTIONS.find(s=>s.id===sc.correctId);
    const wrongSols = embaralhar(ALL_SOLUTIONS.filter(s=>s.id!==sc.correctId)).slice(0,3);
    const options = embaralhar([correctSol, ...wrongSols]);
    
    const grid = document.getElementById('solutionGrid');
    grid.innerHTML = '';
    options.forEach(sol => {
        const card = document.createElement('div');
        card.className = 'epi-card';
        card.dataset.id = sol.id;
        card.innerHTML = `<span class="epi-ico">${sol.icon}</span><span class="epi-txt">${sol.name}</span>`;
        card.addEventListener('click', () => handleCard5Select(sol.id, sc, card));
        grid.appendChild(card);
    });
    
    document.getElementById('cardProgress5').textContent = G.cardIdx;
}

function handleCard5Select(selectedId, scenario, cardEl) {
    const isCorrect = selectedId === scenario.correctId;
    const allCards = document.querySelectorAll('#solutionGrid .epi-card');
    
    if(isCorrect) { playOk(); G.correct++; cardEl.classList.add('correta'); }
    else {
        playErr(); G.wrong++; cardEl.classList.add('errada');
        allCards.forEach(c=>{ if(c.dataset.id===scenario.correctId) c.classList.add('correta'); });
    }
    allCards.forEach(c=>{ c.style.pointerEvents='none'; });
    
    document.getElementById('cardCorrect5').textContent = G.correct;
    document.getElementById('cardWrong5').textContent = G.wrong;
    
    const content = document.getElementById('cardFeedbackContent5');
    content.className = `popup-content ${isCorrect?'correct-feedback':'wrong-feedback'}`;
    document.getElementById('cardFeedbackIcon5').textContent = isCorrect?'✅':'❌';
    document.getElementById('cardFeedbackTitle5').textContent = isCorrect?'Correto!':'Incorreto!';
    document.getElementById('cardFeedbackDesc5').textContent = scenario.exp;
    document.getElementById('cardFeedback5').classList.remove('hidden');
}

function nextCardRound5() {
    document.getElementById('cardFeedback5').classList.add('hidden');
    G.cardIdx++;
    document.getElementById('cardProgress5').textContent = G.cardIdx;
    loadCard5();
}

// ============================================================
// PHASE 6: VERDADEIRO OU FALSO
// ============================================================
const VF_STATEMENTS = [
    { text:'A NR-17 se aplica apenas a escritórios.', answer:false, exp:'FALSO. A NR-17 se aplica a todas as organizações e órgãos com empregados CLT, incluindo fábricas, hospitais, comércios etc.' },
    { text:'As pausas para recuperação devem ser feitas fora do posto de trabalho.', answer:true, exp:'VERDADEIRO. A NR-17 determina que as pausas devem ser usufruídas fora dos postos de trabalho, em local apropriado.' },
    { text:'O empregador pode impedir o trabalhador de ir ao banheiro durante o expediente.', answer:false, exp:'FALSO. A NR-17 assegura a saída do posto de trabalho para necessidades fisiológicas a qualquer momento.' },
    { text:'A distância horizontal máxima para levantamento não eventual de cargas é de 60cm do corpo.', answer:true, exp:'VERDADEIRO. A NR-17 veda o levantamento não eventual de cargas quando a distância de alcance horizontal for superior a 60cm.' },
    { text:'Cadeiras de escritório devem ter altura regulável conforme a NR-17.', answer:true, exp:'VERDADEIRO. A NR-17 exige que as cadeiras tenham ajuste de altura para permitir adaptação às características do trabalhador.' },
    { text:'O topo do monitor deve ficar na altura do peito do trabalhador.', answer:false, exp:'FALSO. O topo da tela deve ficar na linha dos olhos ou ligeiramente abaixo, para manter postura cervical neutra.' },
    { text:'A AEP (Avaliação Ergonômica Preliminar) é obrigatória para todas as empresas.', answer:true, exp:'VERDADEIRO. A AEP é obrigatória para todas as organizações, servindo para identificar perigos e riscos ergonômicos.' },
    { text:'As pausas para recuperação podem ser descontadas do salário do trabalhador.', answer:false, exp:'FALSO. As pausas devem ser computadas como tempo de trabalho efetivo, sem desconto salarial.' },
    { text:'A iluminação no posto de trabalho deve evitar reflexos na tela do computador.', answer:true, exp:'VERDADEIRO. A NR-17 exige iluminação adequada sem ofuscamento, reflexos incômodos e sombras sobre o campo de trabalho.' },
    { text:'É aceitável que a cadeira de trabalho tenha borda frontal quadrada/reta.', answer:false, exp:'FALSO. A NR-17 exige borda frontal arredondada para não comprimir a parte posterior dos joelhos e comprometer a circulação.' },
    { text:'A NR-17 recomenda alternância de tarefas para variar grupos musculares.', answer:true, exp:'VERDADEIRO. A norma recomenda a alternância de tarefas para variar posturas e grupos musculares utilizados, prevenindo LER/DORT.' },
    { text:'O apoio para os pés é sempre obrigatório em postos de trabalho sentado.', answer:false, exp:'FALSO. O apoio para os pés é necessário apenas quando os pés não alcançam o chão com a cadeira na altura correta.' }
];

function startVF() {
    G.vfIdx = 0; G.correct = 0; G.wrong = 0;
    document.getElementById('vfProgress').textContent = '0';
    document.getElementById('vfTotal').textContent = VF_STATEMENTS.length;
    document.getElementById('vfCorrect').textContent = '0';
    document.getElementById('vfWrong').textContent = '0';
    showScreen('phase6');
    loadVF();
}

function loadVF() {
    if(G.vfIdx >= VF_STATEMENTS.length) {
        G.results[5] = {c:G.correct, w:G.wrong};
        showComplete();
        return;
    }
    const st = VF_STATEMENTS[G.vfIdx];
    document.getElementById('vfNumber').textContent = `${G.vfIdx+1} / ${VF_STATEMENTS.length}`;
    document.getElementById('vfStatement').textContent = st.text;
    
    document.getElementById('btnTrue').classList.remove('disabled');
    document.getElementById('btnFalse').classList.remove('disabled');
    document.getElementById('btnTrue').className = 'vf-btn vf-true';
    document.getElementById('btnFalse').className = 'vf-btn vf-false';
    
    // Animate card entrance
    const card = document.getElementById('vfCard');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'slideUp 0.4s ease';
}

function answerVF(answer) {
    const st = VF_STATEMENTS[G.vfIdx];
    const isCorrect = answer === st.answer;
    
    document.getElementById('btnTrue').classList.add('disabled');
    document.getElementById('btnFalse').classList.add('disabled');
    
    if(isCorrect) { playOk(); G.correct++; }
    else { playErr(); G.wrong++; }
    
    // Highlight correct/wrong
    if(st.answer === true) {
        document.getElementById('btnTrue').classList.add(isCorrect?'vf-correct':'');
        if(!isCorrect) document.getElementById('btnFalse').classList.add('vf-wrong');
    } else {
        document.getElementById('btnFalse').classList.add(isCorrect?'vf-correct':'');
        if(!isCorrect) document.getElementById('btnTrue').classList.add('vf-wrong');
    }
    
    document.getElementById('vfCorrect').textContent = G.correct;
    document.getElementById('vfWrong').textContent = G.wrong;
    document.getElementById('vfProgress').textContent = G.vfIdx + 1;
    
    // Show feedback
    const content = document.getElementById('vfFeedbackContent');
    content.className = `popup-content ${isCorrect?'correct-feedback':'wrong-feedback'}`;
    document.getElementById('vfFeedbackIcon').textContent = isCorrect?'✅':'❌';
    document.getElementById('vfFeedbackTitle').textContent = isCorrect?'Correto!':'Incorreto!';
    document.getElementById('vfFeedbackDesc').textContent = st.exp;
    document.getElementById('vfFeedback').classList.remove('hidden');
}

function nextVF() {
    document.getElementById('vfFeedback').classList.add('hidden');
    G.vfIdx++;
    loadVF();
}

// ============================================================
// PHASE COMPLETE
// ============================================================
function showComplete() {
    playWin();
    /* Era `G.results[G.phase] = G.results[G.phase] || {...}`. Como o objeto já
       nascia preenchido com zeros (e todo objeto é verdadeiro), o resultado da
       fase NUNCA entrava e o certificado saía zerado. */
    G.results[G.phase] = { c: G.correct, w: G.wrong };
    
    const stars = G.wrong <= 2 ? 3 : G.wrong <= 5 ? 2 : 1;
    ['s1','s2','s3'].forEach((id,i) => {
        document.getElementById(id).className = `star ${i<stars?'':'empty'}`;
    });
    
    const stats = document.getElementById('completeStats');
    stats.innerHTML = `
        <div class="complete-stat"><span>Acertos</span><span class="correct-text">${G.correct}</span></div>
        <div class="complete-stat"><span>Erros</span><span class="wrong-text">${G.wrong}</span></div>
    `;
    
    const btn = document.getElementById('btnNext');
    btn.innerHTML = G.phase < 5 ? '<span>Próxima Fase</span><span class="btn-arrow">→</span>' : '<span>Ver Certificado</span><span class="btn-arrow">→</span>';
    
    showScreen('phaseComplete');
}

function goNextPhase() {
    G.phase++;
    if(G.phase <= 5) showPhaseIntro(G.phase);
    else showCertificate();
}

// ============================================================
// CERTIFICATE
// ============================================================
function showCertificate() {
    playWin();

    const totalC = Object.values(G.results).reduce((s, r) => s + r.c, 0);
    const totalW = Object.values(G.results).reduce((s, r) => s + r.w, 0);
    const pct = totalC + totalW > 0 ? Math.round((totalC / (totalC + totalW)) * 100) : 0;
    registrarNaPlanilha({
        etapa: 'Conclusão',
        pontuacao: totalC,
        resultado: `${pct}% de aproveitamento (${totalC} acertos / ${totalW} erros)`
    });

    document.getElementById('certName').textContent = G.name;
    document.getElementById('certDate').textContent = new Date().toLocaleDateString('pt-BR', {day:'2-digit',month:'long',year:'numeric'});
    
    const icons = ['🪑','🔍','⏱️','🃏','🧠'];
    const names = ['Monte o Posto','Escritório','Quiz NR-17','Cartas','V ou F'];
    let html = '';
    for(let i=1;i<=5;i++) {
        const r = G.results[i];
        html += `<div class="cert-result-item"><span class="cert-result-icon">${icons[i-1]}</span><span class="cert-result-label">${names[i-1]}</span><span class="cert-result-value">${r.c} ✓ / ${r.w} ✗</span></div>`;
    }
    document.getElementById('certResults').innerHTML = html;
    showScreen('certificate');
}

function restartGame() {
    Object.assign(G, { name:'',email:'',empresa:'',phase:0,found:[],correct:0,wrong:0,
        results:{1:{c:0,w:0},2:{c:0,w:0},3:{c:0,w:0},4:{c:0,w:0},5:{c:0,w:0}},
        quizIdx:0,cardIdx:0,vfIdx:0,p1Idx:0 });
    clearInterval(G.timerInterval);
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputEmpresa').value = '';
    document.getElementById('setupErro').classList.add('hidden');
    showScreen('landing');
}
