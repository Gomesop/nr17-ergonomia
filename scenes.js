/**
 * Cenas vetoriais — NR-17 Ergonomia
 * www.horadaseguranca.com
 *
 * As fases 2 e 3 usavam fotos com hotspots posicionados por porcentagem. Como a
 * foto tem proporção própria e o container muda com a tela, o retângulo do risco
 * quase nunca caía sobre o objeto certo — o usuário clicava no monitor e o jogo
 * dizia que era o ar-condicionado.
 *
 * Aqui a cena é desenhada em SVG com viewBox fixo: cada risco é um <g> com o
 * próprio desenho dentro. O clique acerta o risco porque acerta o DESENHO dele,
 * não uma caixa invisível. Isso vale em qualquer largura de tela.
 */

const CENAS = {

    /* ======================= ESCRITÓRIO ======================= */
    escritorio: {
        titulo: 'Escritório administrativo',
        viewBox: '0 0 1000 580',
        riscos: [
            {
                id: 'o1',
                nome: 'Monitor abaixo da linha dos olhos',
                desc: 'O monitor está baixo demais, obrigando a flexão do pescoço para frente e para baixo. A NR-17 pede o topo da tela na linha dos olhos ou pouco abaixo, a 50–70 cm de distância.'
            },
            {
                id: 'o2',
                nome: 'Banqueta sem encosto nem regulagem',
                desc: 'Assento sem apoio lombar, sem encosto e sem ajuste de altura. A NR-17 exige cadeira com altura regulável, apoio lombar, borda frontal arredondada e base estável.'
            },
            {
                id: 'o3',
                nome: 'Teclado acima da altura dos cotovelos',
                desc: 'O teclado está sobre um suporte alto, elevando os ombros e abrindo o ângulo do cotovelo. Antebraços devem ficar paralelos ao piso e os punhos em posição neutra.'
            },
            {
                id: 'o4',
                nome: 'Cabos soltos no piso',
                desc: 'Fiação atravessando a área de circulação, criando risco de tropeço e prendendo os pés sob a mesa. A organização do posto faz parte das exigências da NR-17.'
            },
            {
                id: 'o5',
                nome: 'Luminária refletindo na tela',
                desc: 'A luminária aponta direto para o monitor e provoca ofuscamento e reflexo. A NR-17 exige iluminação sem reflexos incômodos sobre a superfície de trabalho.'
            },
            {
                id: 'o6',
                nome: 'Ar-condicionado soprando no trabalhador',
                desc: 'O fluxo de ar incide diretamente sobre a pessoa. A NR-17 trata do conforto térmico e veda correntes de ar desconfortáveis sobre o posto de trabalho.'
            },
            {
                id: 'o7',
                nome: 'Tronco curvado e pescoço projetado',
                desc: 'Postura com as costas arredondadas e a cabeça projetada à frente, sobrecarregando a coluna cervical e lombar. O tronco deve ficar ereto ou levemente inclinado.'
            },
            {
                id: 'o8',
                nome: 'Pés sem apoio no piso',
                desc: 'Os pés ficam suspensos, comprimindo a coxa contra o assento e prejudicando a circulação. Quando os pés não alcançam o piso, o apoio é obrigatório.'
            }
        ]
    },

    /* ========================= FÁBRICA ========================= */
    fabrica: {
        titulo: 'Setor de produção',
        viewBox: '0 0 1000 580',
        riscos: [
            {
                id: 'f1',
                nome: 'Levantamento com a coluna curvada',
                desc: 'A carga é erguida com as pernas retas e a coluna fletida, concentrando o esforço nos discos lombares. O correto é dobrar os joelhos, manter a coluna ereta e a carga junto ao corpo.'
            },
            {
                id: 'f2',
                nome: 'Carga armazenada acima dos ombros',
                desc: 'Material guardado acima da linha dos ombros exige elevação dos braços e desequilíbrio. O armazenamento deve ficar entre a altura do quadril e dos ombros.'
            },
            {
                id: 'f3',
                nome: 'Trabalho em pé sobre piso duro',
                desc: 'Permanência prolongada em pé sobre concreto, sem tapete antifadiga nem assento para as pausas. A NR-17 exige medidas para reduzir a fadiga no trabalho estático em pé.'
            },
            {
                id: 'f4',
                nome: 'Bancada em altura inadequada',
                desc: 'A bancada é baixa demais para a tarefa e força a flexão contínua do tronco. A altura da superfície deve ser compatível com o tipo de atividade executada.'
            },
            {
                id: 'f5',
                nome: 'Ferramenta que força o desvio do punho',
                desc: 'A empunhadura obriga o punho a trabalhar desviado e em força. Ferramentas manuais devem ter pegada adequada, peso compatível e permitir o punho neutro.'
            },
            {
                id: 'f6',
                nome: 'Movimento repetitivo sem rodízio',
                desc: 'Tarefa cíclica na esteira, sem alternância de atividade nem pausa programada. A NR-17 determina pausas e alternância para reduzir a repetitividade.'
            },
            {
                id: 'f7',
                nome: 'Carga afastada do corpo',
                desc: 'A caixa é transportada com os braços estendidos, muito longe do tronco. A NR-17 veda o levantamento não eventual com alcance horizontal superior a 60 cm do corpo.'
            },
            {
                id: 'f8',
                nome: 'Iluminação insuficiente na inspeção',
                desc: 'A bancada de inspeção está mal iluminada, forçando a aproximação dos olhos e a flexão do pescoço. A iluminação deve ser adequada à natureza da atividade.'
            }
        ]
    }
};

/* ============================================================
   DESENHO DAS CENAS
   Cada risco vira <g class="risco" data-risco="id">. O clique é
   capturado no grupo, então acertar o desenho é acertar o risco.
   ============================================================ */

function svgEscritorio() {
    return `
<svg viewBox="0 0 1000 580" class="cena-svg" role="img" aria-label="Escritório com riscos ergonômicos">
  <defs>
    <linearGradient id="parede" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e8f1fb"/><stop offset="1" stop-color="#cfe0f2"/>
    </linearGradient>
    <linearGradient id="piso" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b7a394"/><stop offset="1" stop-color="#9c8779"/>
    </linearGradient>
    <linearGradient id="luzLum" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#fde68a" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="jatoAr" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#7dd3fc" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- ambiente -->
  <rect width="1000" height="430" fill="url(#parede)"/>
  <rect y="430" width="1000" height="150" fill="url(#piso)"/>
  <rect y="424" width="1000" height="10" fill="#8d7a6c"/>
  <g opacity="0.5" stroke="#8d7a6c" stroke-width="2">
    <path d="M0 470 H1000 M0 512 H1000 M0 552 H1000"/>
  </g>

  <!-- janela ao fundo -->
  <g>
    <rect x="640" y="70" width="250" height="170" rx="6" fill="#cbe7ff" stroke="#94a3b8" stroke-width="5"/>
    <path d="M765 70 V240 M640 155 H890" stroke="#94a3b8" stroke-width="5"/>
    <rect x="655" y="150" width="55" height="80" fill="#a7d3f5" opacity="0.7"/>
  </g>

  <!-- planta decorativa -->
  <g>
    <path d="M905 430 h60 l-8 -70 h-44 z" fill="#b45309"/>
    <g fill="#16a34a">
      <ellipse cx="935" cy="330" rx="16" ry="40"/>
      <ellipse cx="912" cy="345" rx="14" ry="34" transform="rotate(-25 912 345)"/>
      <ellipse cx="958" cy="345" rx="14" ry="34" transform="rotate(25 958 345)"/>
    </g>
  </g>

  <!-- ============ RISCO 6: ar-condicionado ============ -->
  <g class="risco" data-risco="o6" tabindex="0" role="button" aria-label="Ar-condicionado">
    <rect x="392" y="40" width="190" height="58" rx="12" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4"/>
    <rect x="404" y="80" width="166" height="10" rx="5" fill="#cbd5e1"/>
    <circle cx="560" cy="56" r="5" fill="#22c55e"/>
    <g class="ar-jato">
      <path d="M404 92 q-70 60 -120 128" stroke="url(#jatoAr)" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M452 92 q-60 70 -104 136" stroke="url(#jatoAr)" stroke-width="20" fill="none" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ============ RISCO 5: luminária ofuscando ============ -->
  <g class="risco" data-risco="o5" tabindex="0" role="button" aria-label="Luminária">
    <path d="M240 60 v92" stroke="#475569" stroke-width="7"/>
    <path d="M198 152 h84 l-20 42 h-44 z" fill="#334155"/>
    <circle cx="240" cy="196" r="12" fill="#fde68a"/>
    <path class="luz-cone" d="M240 200 L392 330 L292 372 Z" fill="url(#luzLum)"/>
  </g>

  <!-- ============ RISCO 3: teclado alto ============ -->
  <g class="risco" data-risco="o3" tabindex="0" role="button" aria-label="Teclado em suporte alto">
    <rect x="486" y="286" width="184" height="14" rx="4" fill="#a16207"/>
    <rect x="500" y="256" width="18" height="30" fill="#78350f"/>
    <rect x="638" y="256" width="18" height="30" fill="#78350f"/>
    <rect x="496" y="256" width="166" height="22" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
    <g fill="#94a3b8">
      <rect x="506" y="262" width="14" height="10" rx="2"/><rect x="526" y="262" width="14" height="10" rx="2"/>
      <rect x="546" y="262" width="14" height="10" rx="2"/><rect x="566" y="262" width="14" height="10" rx="2"/>
      <rect x="586" y="262" width="14" height="10" rx="2"/><rect x="606" y="262" width="42" height="10" rx="2"/>
    </g>
  </g>

  <!-- mesa -->
  <g>
    <rect x="150" y="330" width="420" height="18" rx="5" fill="#c98f4e"/>
    <rect x="150" y="348" width="420" height="8" fill="#a9743a"/>
    <rect x="168" y="356" width="16" height="74" fill="#8b5e2f"/>
    <rect x="536" y="356" width="16" height="74" fill="#8b5e2f"/>
  </g>

  <!-- ============ RISCO 1: monitor baixo ============ -->
  <g class="risco" data-risco="o1" tabindex="0" role="button" aria-label="Monitor">
    <rect x="286" y="238" width="190" height="120" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
    <rect x="296" y="248" width="170" height="100" rx="4" fill="#38bdf8" opacity="0.85"/>
    <g fill="#e0f2fe" opacity="0.8">
      <rect x="308" y="262" width="86" height="9" rx="4"/>
      <rect x="308" y="280" width="130" height="9" rx="4"/>
      <rect x="308" y="298" width="110" height="9" rx="4"/>
    </g>
    <rect x="360" y="358" width="42" height="16" fill="#334155"/>
    <rect x="336" y="374" width="90" height="10" rx="5" fill="#334155"/>
  </g>

  <!-- ============ RISCO 7: postura curvada ============ -->
  <g class="risco" data-risco="o7" tabindex="0" role="button" aria-label="Postura do trabalhador">
    <!-- tronco arredondado + pescoço projetado -->
    <path d="M188 402 q-8 -66 30 -96 q22 -18 46 -22" fill="none" stroke="#2563eb" stroke-width="34" stroke-linecap="round"/>
    <path d="M264 284 q26 -10 40 -2" fill="none" stroke="#f5d0a9" stroke-width="20" stroke-linecap="round"/>
    <circle cx="316" cy="268" r="30" fill="#f5d0a9" stroke="#c99b6e" stroke-width="3"/>
    <path d="M292 250 q26 -20 50 -4 q-12 -14 -30 -14 q-16 0 -20 18z" fill="#3f2a1d"/>
    <!-- braço até o teclado -->
    <path d="M236 320 q66 22 110 40" fill="none" stroke="#2563eb" stroke-width="20" stroke-linecap="round"/>
    <circle cx="352" cy="364" r="12" fill="#f5d0a9"/>
  </g>

  <!-- ============ RISCO 2: banqueta sem encosto ============ -->
  <g class="risco" data-risco="o2" tabindex="0" role="button" aria-label="Assento">
    <ellipse cx="196" cy="412" rx="60" ry="16" fill="#475569"/>
    <rect x="188" y="412" width="16" height="56" fill="#64748b"/>
    <path d="M150 470 h92" stroke="#475569" stroke-width="10" stroke-linecap="round"/>
    <path d="M196 468 l-42 22 M196 468 l42 22" stroke="#475569" stroke-width="9" stroke-linecap="round"/>
  </g>

  <!-- ============ RISCO 8: pés sem apoio ============ -->
  <g class="risco" data-risco="o8" tabindex="0" role="button" aria-label="Pés do trabalhador">
    <path d="M206 402 q10 42 -2 62" fill="none" stroke="#1e3a8a" stroke-width="24" stroke-linecap="round"/>
    <path d="M232 404 q14 40 4 60" fill="none" stroke="#1e3a8a" stroke-width="24" stroke-linecap="round"/>
    <path d="M186 466 h40 l6 18 h-52 z" fill="#111827"/>
    <path d="M222 464 h40 l6 18 h-52 z" fill="#111827"/>
    <path d="M150 500 h160" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.75"/>
  </g>

  <!-- ============ RISCO 4: cabos no piso ============ -->
  <g class="risco" data-risco="o4" tabindex="0" role="button" aria-label="Cabos no piso">
    <path d="M330 430 q60 40 30 74 q-30 34 60 30 q80 -4 130 -34"
          fill="none" stroke="#1f2937" stroke-width="9" stroke-linecap="round"/>
    <path d="M382 430 q-20 52 40 72 q60 20 148 -14"
          fill="none" stroke="#4b5563" stroke-width="8" stroke-linecap="round"/>
    <path d="M430 436 q30 60 120 62"
          fill="none" stroke="#6b7280" stroke-width="7" stroke-linecap="round"/>
    <rect x="556" y="486" width="46" height="22" rx="5" fill="#374151"/>
  </g>
</svg>`;
}

function svgFabrica() {
    return `
<svg viewBox="0 0 1000 580" class="cena-svg" role="img" aria-label="Fábrica com riscos ergonômicos">
  <defs>
    <linearGradient id="galpao" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dbe4ee"/><stop offset="1" stop-color="#b9c6d6"/>
    </linearGradient>
    <linearGradient id="chao" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8b95a3"/><stop offset="1" stop-color="#6f7986"/>
    </linearGradient>
    <radialGradient id="penumbra" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#0f172a" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="0.62"/>
    </radialGradient>
  </defs>

  <rect width="1000" height="420" fill="url(#galpao)"/>
  <rect y="420" width="1000" height="160" fill="url(#chao)"/>
  <rect y="414" width="1000" height="10" fill="#5b6673"/>

  <!-- estrutura do galpão -->
  <g stroke="#94a3b8" stroke-width="7" fill="none" opacity="0.75">
    <path d="M60 40 V414 M300 40 V300 M700 40 V300 M940 40 V414"/>
    <path d="M40 46 H960"/>
    <path d="M60 120 L300 60 M700 60 L940 120"/>
  </g>
  <g fill="#cbd5e1" opacity="0.65">
    <rect x="330" y="72" width="120" height="70" rx="5"/>
    <rect x="560" y="72" width="120" height="70" rx="5"/>
  </g>

  <!-- ============ RISCO 2: prateleira acima dos ombros ============ -->
  <g class="risco" data-risco="f2" tabindex="0" role="button" aria-label="Prateleira alta">
    <rect x="386" y="150" width="230" height="14" fill="#78716c"/>
    <rect x="386" y="228" width="230" height="14" fill="#78716c"/>
    <rect x="392" y="150" width="12" height="92" fill="#57534e"/>
    <rect x="598" y="150" width="12" height="92" fill="#57534e"/>
    <g>
      <rect x="410" y="108" width="58" height="42" rx="4" fill="#d97706" stroke="#92400e" stroke-width="3"/>
      <rect x="478" y="112" width="52" height="38" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="3"/>
      <rect x="540" y="104" width="60" height="46" rx="4" fill="#d97706" stroke="#92400e" stroke-width="3"/>
    </g>
    <path d="M400 96 h216" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.8"/>
  </g>

  <!-- ============ RISCO 6: esteira / repetitivo ============ -->
  <g class="risco" data-risco="f6" tabindex="0" role="button" aria-label="Esteira transportadora">
    <rect x="690" y="322" width="280" height="26" rx="10" fill="#475569"/>
    <g class="esteira-rolos" fill="#94a3b8">
      <circle cx="714" cy="335" r="9"/><circle cx="756" cy="335" r="9"/>
      <circle cx="798" cy="335" r="9"/><circle cx="840" cy="335" r="9"/>
      <circle cx="882" cy="335" r="9"/><circle cx="924" cy="335" r="9"/>
    </g>
    <rect x="700" y="348" width="14" height="72" fill="#334155"/>
    <rect x="936" y="348" width="14" height="72" fill="#334155"/>
    <g class="esteira-caixas">
      <rect x="726" y="292" width="42" height="30" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <rect x="822" y="292" width="42" height="30" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <rect x="906" y="292" width="42" height="30" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
    </g>
    <!-- operador repetindo o movimento -->
    <g>
      <circle cx="800" cy="238" r="24" fill="#f5d0a9" stroke="#c99b6e" stroke-width="3"/>
      <path d="M800 262 v54" stroke="#0d9488" stroke-width="30" stroke-linecap="round"/>
      <path class="braco-repete" d="M790 276 q-34 24 -46 44" fill="none" stroke="#0d9488" stroke-width="16" stroke-linecap="round"/>
      <path d="M812 276 q32 20 40 40" fill="none" stroke="#0d9488" stroke-width="16" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ============ RISCO 4: bancada baixa ============ -->
  <g class="risco" data-risco="f4" tabindex="0" role="button" aria-label="Bancada de trabalho">
    <rect x="380" y="382" width="240" height="16" rx="4" fill="#a8a29e"/>
    <rect x="394" y="398" width="14" height="42" fill="#78716c"/>
    <rect x="592" y="398" width="14" height="42" fill="#78716c"/>
    <rect x="424" y="362" width="60" height="20" rx="3" fill="#94a3b8"/>
    <path d="M360 398 h-40 M640 398 h40" stroke="#dc2626" stroke-width="4" stroke-dasharray="9 7" opacity="0.8"/>
  </g>

  <!-- operador da bancada (tronco fletido) -->
  <g>
    <circle cx="516" cy="288" r="24" fill="#f5d0a9" stroke="#c99b6e" stroke-width="3"/>
    <path d="M498 306 q-20 44 -8 82" fill="none" stroke="#7c3aed" stroke-width="30" stroke-linecap="round"/>
    <path d="M492 424 v22" stroke="#3730a3" stroke-width="18" stroke-linecap="round"/>
    <path d="M514 424 v22" stroke="#3730a3" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- ============ RISCO 5: ferramenta com punho desviado ============ -->
  <g class="risco" data-risco="f5" tabindex="0" role="button" aria-label="Ferramenta manual">
    <path d="M498 344 q-24 14 -30 30" fill="none" stroke="#7c3aed" stroke-width="16" stroke-linecap="round"/>
    <circle cx="466" cy="378" r="12" fill="#f5d0a9"/>
    <g transform="rotate(38 466 378)">
      <rect x="436" y="370" width="62" height="15" rx="6" fill="#111827"/>
      <rect x="428" y="362" width="18" height="31" rx="4" fill="#dc2626"/>
      <path d="M498 377 h26" stroke="#6b7280" stroke-width="9" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ============ RISCO 1: levantamento com coluna curvada ============ -->
  <g class="risco" data-risco="f1" tabindex="0" role="button" aria-label="Levantamento de carga">
    <circle cx="140" cy="292" r="26" fill="#f5d0a9" stroke="#c99b6e" stroke-width="3"/>
    <!-- tronco quase horizontal, pernas retas -->
    <path d="M158 312 q46 34 62 74" fill="none" stroke="#dc2626" stroke-width="32" stroke-linecap="round"/>
    <path d="M222 392 v54" stroke="#1f2937" stroke-width="20" stroke-linecap="round"/>
    <path d="M240 392 v54" stroke="#1f2937" stroke-width="20" stroke-linecap="round"/>
    <path d="M170 330 q-16 40 -14 66" fill="none" stroke="#dc2626" stroke-width="15" stroke-linecap="round"/>
    <rect x="118" y="392" width="76" height="56" rx="5" fill="#d97706" stroke="#92400e" stroke-width="4"/>
    <path d="M118 418 h76" stroke="#92400e" stroke-width="4"/>
    <path d="M104 452 h150" stroke="#dc2626" stroke-width="4" stroke-dasharray="9 7" opacity="0.85"/>
  </g>

  <!-- ============ RISCO 3: piso duro sem tapete ============ -->
  <g class="risco" data-risco="f3" tabindex="0" role="button" aria-label="Piso da área de trabalho">
    <rect x="300" y="470" width="330" height="86" rx="8" fill="#6b7280" opacity="0.55"/>
    <g stroke="#4b5563" stroke-width="3" opacity="0.9">
      <path d="M300 500 H630 M300 528 H630 M382 470 V556 M466 470 V556 M548 470 V556"/>
    </g>
    <text x="465" y="524" text-anchor="middle" font-family="Outfit, sans-serif"
          font-size="22" font-weight="800" fill="#e5e7eb" opacity="0.8">CONCRETO</text>
  </g>

  <!-- ============ RISCO 7: carga longe do corpo ============ -->
  <g class="risco" data-risco="f7" tabindex="0" role="button" aria-label="Transporte de carga">
    <circle cx="726" cy="452" r="24" fill="#f5d0a9" stroke="#c99b6e" stroke-width="3"/>
    <path d="M726 476 v56" stroke="#0369a1" stroke-width="28" stroke-linecap="round"/>
    <path d="M718 490 h74" stroke="#0369a1" stroke-width="15" stroke-linecap="round"/>
    <rect x="792" y="464" width="70" height="56" rx="5" fill="#ca8a04" stroke="#854d0e" stroke-width="4"/>
    <path d="M792 492 h70" stroke="#854d0e" stroke-width="4"/>
    <path d="M736 446 h140" stroke="#dc2626" stroke-width="4" stroke-dasharray="9 7" opacity="0.85"/>
  </g>

  <!-- ============ RISCO 8: inspeção mal iluminada ============ -->
  <g class="risco" data-risco="f8" tabindex="0" role="button" aria-label="Bancada de inspeção">
    <rect x="52" y="150" width="196" height="150" rx="8" fill="#334155" opacity="0.35"/>
    <rect x="66" y="248" width="168" height="14" rx="4" fill="#a8a29e"/>
    <rect x="80" y="262" width="12" height="38" fill="#78716c"/>
    <rect x="208" y="262" width="12" height="38" fill="#78716c"/>
    <g class="lampada-fraca">
      <path d="M150 150 v34" stroke="#475569" stroke-width="6"/>
      <path d="M126 184 h48 l-12 24 h-24 z" fill="#334155"/>
      <circle cx="150" cy="212" r="9" fill="#fef08a" opacity="0.55"/>
    </g>
    <rect x="52" y="150" width="196" height="150" rx="8" fill="url(#penumbra)"/>
    <g fill="#e2e8f0" opacity="0.55">
      <rect x="106" y="230" width="40" height="18" rx="3"/>
      <rect x="156" y="230" width="40" height="18" rx="3"/>
    </g>
  </g>
</svg>`;
}

function montarCena(chave) {
    return chave === 'escritorio' ? svgEscritorio() : svgFabrica();
}
