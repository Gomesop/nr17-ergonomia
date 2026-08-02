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
    <linearGradient id="oParede" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef4fb"/><stop offset="1" stop-color="#d7e3f0"/>
    </linearGradient>
    <linearGradient id="oPiso" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9ad91"/><stop offset="1" stop-color="#a98a6e"/>
    </linearGradient>
    <linearGradient id="oTela" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#67c7f5"/><stop offset="1" stop-color="#2b8fc9"/>
    </linearGradient>
    <linearGradient id="oLuz" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#fde68a" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fde68a" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="pele" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#f8dcbc"/><stop offset="1" stop-color="#eec69c"/>
    </linearGradient>
    <linearGradient id="camisaA" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="calcaA" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#33455f"/><stop offset="1" stop-color="#1e2d42"/>
    </linearGradient>
    <linearGradient id="oAr" x1="0" y1="0" x2="-0.6" y2="1">
      <stop offset="0" stop-color="#7dd3fc" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- ================= AMBIENTE ================= -->
  <rect width="1000" height="470" fill="url(#oParede)"/>
  <rect y="470" width="1000" height="110" fill="url(#oPiso)"/>
  <rect y="462" width="1000" height="12" fill="#7e6247"/>
  <g stroke="#96795d" stroke-width="2" opacity="0.55">
    <path d="M0 502 H1000 M0 534 H1000 M0 566 H1000"/>
  </g>

  <!-- janela ao fundo -->
  <g>
    <rect x="646" y="168" width="248" height="150" rx="5" fill="#d6ecff" stroke="#a9b8c9" stroke-width="6"/>
    <path d="M770 168 V318 M646 243 H894" stroke="#a9b8c9" stroke-width="6"/>
    <rect x="660" y="182" width="96" height="52" fill="#e8f5ff" opacity="0.65"/>
  </g>

  <!-- planta -->
  <g>
    <path d="M916 470 h62 l-9 -66 h-44 z" fill="#b4643a"/>
    <path d="M947 404 v-52" stroke="#166534" stroke-width="7"/>
    <g fill="#22a34a">
      <ellipse cx="947" cy="336" rx="17" ry="40"/>
      <ellipse cx="921" cy="356" rx="14" ry="32" transform="rotate(-28 921 356)"/>
      <ellipse cx="973" cy="356" rx="14" ry="32" transform="rotate(28 973 356)"/>
    </g>
  </g>

  <!-- ================= MESA ================= -->
  <g>
    <rect x="336" y="360" width="372" height="14" rx="4" fill="#c58f52"/>
    <rect x="336" y="374" width="372" height="7" fill="#a3702f"/>
    <rect x="356" y="381" width="15" height="89" fill="#8a5d25"/>
    <rect x="672" y="381" width="15" height="89" fill="#8a5d25"/>
  </g>

  <!-- ============ RISCO 5: luminária ofuscando a tela ============ -->
  <g class="risco" data-risco="o5" data-area="352,86,86,96" tabindex="0" role="button" aria-label="Luminária">
    <path d="M395 60 v42" stroke="#64748b" stroke-width="6"/>
    <path d="M358 102 h74 l-16 44 h-42 z" fill="#3f4c5c"/>
    <ellipse cx="395" cy="150" rx="14" ry="9" fill="#fde68a"/>
    <path class="luz-cone" d="M395 156 L662 300 L470 344 Z" fill="url(#oLuz)"/>
  </g>

  <!-- ============ RISCO 6: ar-condicionado no trabalhador ============ -->
  <g class="risco" data-risco="o6" data-area="700,58,206,74" tabindex="0" role="button" aria-label="Ar-condicionado">
    <rect x="704" y="62" width="198" height="56" rx="12" fill="#f4f7fb" stroke="#a9b8c9" stroke-width="5"/>
    <rect x="718" y="100" width="170" height="11" rx="5" fill="#c8d3de"/>
    <circle cx="878" cy="78" r="5" fill="#22c55e"/>
    <g class="ar-jato">
      <path d="M712 120 q-180 20 -360 44" stroke="url(#oAr)" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M756 120 q-190 38 -392 62" stroke="url(#oAr)" stroke-width="17" fill="none" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ============ RISCO 1: monitor abaixo da linha dos olhos ============ -->
  <g class="risco" data-risco="o1" data-area="466,240,196,142" tabindex="0" role="button" aria-label="Monitor">
    <rect x="470" y="244" width="188" height="112" rx="9" fill="#243244" stroke="#16202e" stroke-width="5"/>
    <rect x="481" y="255" width="166" height="90" rx="4" fill="url(#oTela)"/>
    <g fill="#eaf6ff" opacity="0.85">
      <rect x="494" y="270" width="86" height="9" rx="4"/>
      <rect x="494" y="289" width="128" height="9" rx="4"/>
      <rect x="494" y="308" width="104" height="9" rx="4"/>
    </g>
    <path d="M550 356 h58 l9 20 h-76 z" fill="#33465c"/>
    <rect x="524" y="376" width="110" height="9" rx="4" fill="#33465c"/>
  </g>

  <!-- ============ RISCO 3: teclado acima dos cotovelos ============ -->
  <g class="risco" data-risco="o3" data-area="330,274,132,50" tabindex="0" role="button" aria-label="Teclado em suporte alto">
    <rect x="336" y="308" width="122" height="13" rx="3" fill="#94a3b8"/>
    <rect x="346" y="321" width="12" height="39" fill="#7b8a9c"/>
    <rect x="438" y="321" width="12" height="39" fill="#7b8a9c"/>
    <rect x="334" y="284" width="126" height="24" rx="6" fill="#e8edf3" stroke="#9aa8b8" stroke-width="3"/>
    <g fill="#a9b6c4">
      <rect x="344" y="291" width="13" height="9" rx="2"/><rect x="362" y="291" width="13" height="9" rx="2"/>
      <rect x="380" y="291" width="13" height="9" rx="2"/><rect x="398" y="291" width="13" height="9" rx="2"/>
      <rect x="416" y="291" width="34" height="9" rx="2"/>
    </g>
  </g>

  <!-- ================= CADEIRA ================= -->
  <g>
    <rect x="150" y="352" width="128" height="20" rx="9" fill="#4b5c72"/>
    <rect x="205" y="372" width="16" height="66" fill="#6b7c92"/>
    <path d="M162 452 h98" stroke="#4b5c72" stroke-width="11" stroke-linecap="round"/>
    <path d="M213 440 l-56 24 M213 440 l56 24" stroke="#4b5c72" stroke-width="10" stroke-linecap="round"/>
    <circle cx="152" cy="466" r="9" fill="#39485b"/>
    <circle cx="274" cy="466" r="9" fill="#39485b"/>
  </g>

  <!-- ============ RISCO 2: assento sem encosto nem regulagem ============ -->
  <g class="risco" data-risco="o2" data-area="146,344,138,34" tabindex="0" role="button" aria-label="Assento">
    <rect x="150" y="348" width="128" height="24" rx="11" fill="#5b6d84" stroke="#3c4a5c" stroke-width="3"/>
    <path d="M158 356 h112" stroke="#7387a0" stroke-width="5" stroke-linecap="round"/>
  </g>

  <!-- ================= TRABALHADOR (de perfil, olhando o monitor) ================= -->
  <!-- sombra de contato no assento -->
  <ellipse cx="222" cy="352" rx="62" ry="7" fill="#0f172a" opacity="0.18"/>

  <!-- pernas e pés: risco 8 -->
  <g class="risco" data-risco="o8" data-area="196,376,168,92" tabindex="0" role="button" aria-label="Pernas e pés do trabalhador">
    <!-- coxa -->
    <path d="M198 330 q56 -2 100 6 q16 3 16 18 q0 16 -17 16 q-54 1 -99 -8 z"
          fill="url(#calcaA)" stroke="#16202e" stroke-width="2.5"/>
    <!-- joelho e canela -->
    <path d="M296 336 q22 8 24 34 q2 22 -4 42 q-3 12 -16 11 q-13 -1 -12 -14 q3 -22 -1 -38 q-3 -14 -12 -24 z"
          fill="#2a3a52" stroke="#16202e" stroke-width="2.5"/>
    <!-- sapato social com sola -->
    <path d="M286 406 q30 -3 46 4 q12 5 12 15 h-62 q-8 0 -8 -9 z" fill="#243244" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M274 425 h70 q6 0 6 6 t-6 6 h-70 q-6 0 -6 -6 t6 -6 z" fill="#0f172a"/>
    <!-- o vão até o piso é o risco: fica explícito -->
    <path d="M312 442 v22" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 5" opacity="0.9"/>
    <path d="M196 468 h168" stroke="#dc2626" stroke-width="4" stroke-dasharray="11 8" opacity="0.7"/>
  </g>

  <!-- tronco, cabeça e pescoço: risco 7 -->
  <g class="risco" data-risco="o7" data-area="188,124,152,214" tabindex="0" role="button" aria-label="Postura do trabalhador">
    <!-- braço de trás, mais escuro, dá profundidade -->
    <path d="M232 244 q40 -4 70 12 l-12 26 q-26 -12 -54 -10 z" fill="#1e40af" opacity="0.85"/>
    <!-- tronco com as costas arredondadas -->
    <path d="M198 340 q-18 -66 12 -108 q18 -26 52 -34 l20 44 q-28 8 -40 28 q-18 30 -8 70 z"
          fill="url(#camisaA)" stroke="#173c8a" stroke-width="2.5"/>
    <!-- dobra da camisa acompanhando a curva -->
    <path d="M212 306 q8 -40 34 -62" fill="none" stroke="#1e40af" stroke-width="4" opacity="0.65"/>
    <path d="M204 330 q42 8 76 6" fill="none" stroke="#1e40af" stroke-width="3" opacity="0.5"/>
    <!-- pescoço projetado à frente -->
    <path d="M258 212 q20 -14 42 -14 l5 30 q-18 0 -32 12 z" fill="url(#pele)" stroke="#d9ab7e" stroke-width="2"/>
    <!-- cabeça de perfil, proporção mais natural -->
    <path d="M300 142 q38 2 43 34 q3 20 -8 33 q-9 11 -26 12 q-24 1 -32 -20 q-9 -25 5 -44 q7 -13 18 -15 z"
          fill="url(#pele)" stroke="#d9ab7e" stroke-width="2.5"/>
    <!-- orelha -->
    <path d="M288 186 q-10 2 -10 12 q0 11 11 11" fill="none" stroke="#d9ab7e" stroke-width="4"/>
    <!-- nariz e boca de perfil -->
    <path d="M342 178 q8 6 8 10 q0 4 -8 4 z" fill="#f2cda4" stroke="#d9ab7e" stroke-width="1.4"/>
    <path d="M336 199 q7 2 10 0" fill="none" stroke="#c4855c" stroke-width="2.2" stroke-linecap="round"/>
    <!-- olho e sobrancelha -->
    <ellipse cx="330" cy="173" rx="4.5" ry="5" fill="#22303f"/>
    <path d="M322 161 q10 -4 18 0" fill="none" stroke="#3f2a1c" stroke-width="3" stroke-linecap="round"/>
    <!-- cabelo com volume -->
    <path d="M272 170 q4 -34 34 -38 q30 -4 40 20 q3 8 2 16 q-10 -16 -32 -17 q-26 -1 -44 19 z"
          fill="#4a3323" stroke="#33220f" stroke-width="2"/>
    <!-- braço da frente até o teclado, ombro elevado -->
    <path d="M240 240 q40 -8 72 8 q18 8 28 24 l-26 16 q-9 -14 -24 -20 q-26 -10 -50 -6 z"
          fill="#2f6ef0" stroke="#173c8a" stroke-width="2.5"/>
    <!-- punho e mão -->
    <path d="M330 278 q18 -2 26 8 q6 8 -2 14 q-12 8 -26 2 q-8 -4 -6 -12 q1 -8 8 -12 z"
          fill="url(#pele)" stroke="#d9ab7e" stroke-width="2"/>
  </g>

  <!-- ============ RISCO 4: cabos soltos no piso ============ -->
  <g class="risco" data-risco="o4" data-area="440,470,340,96" tabindex="0" role="button" aria-label="Cabos no piso">
    <path d="M470 470 q-16 44 34 62 q56 20 132 4 q66 -14 106 8"
          fill="none" stroke="#1e2937" stroke-width="9" stroke-linecap="round"/>
    <path d="M520 470 q-8 52 52 66 q60 14 118 -12"
          fill="none" stroke="#46525f" stroke-width="8" stroke-linecap="round"/>
    <path d="M598 470 q10 46 76 56 q42 6 78 -6"
          fill="none" stroke="#67717d" stroke-width="7" stroke-linecap="round"/>
    <rect x="706" y="524" width="58" height="24" rx="6" fill="#39424e"/>
    <circle cx="720" cy="536" r="4" fill="#22c55e"/>
  </g>
</svg>`;
}

function svgFabrica() {
    return `
<svg viewBox="0 0 1000 580" class="cena-svg" role="img" aria-label="Setor de produção com riscos ergonômicos">
  <defs>
    <linearGradient id="fParede" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e8eff7"/><stop offset="1" stop-color="#c6d3e1"/>
    </linearGradient>
    <linearGradient id="fPiso" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9ba6b3"/><stop offset="1" stop-color="#78838f"/>
    </linearGradient>
    <linearGradient id="pele2" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#f8dcbc"/><stop offset="1" stop-color="#eec69c"/>
    </linearGradient>
    <linearGradient id="uniforme" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#f97316"/><stop offset="1" stop-color="#c2410c"/>
    </linearGradient>
    <linearGradient id="calcaF" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#33455f"/><stop offset="1" stop-color="#1e2d42"/>
    </linearGradient>
    <linearGradient id="caixa" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#e0a04a"/><stop offset="1" stop-color="#b97722"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c3cbd5"/><stop offset="1" stop-color="#8e99a6"/>
    </linearGradient>
    <radialGradient id="fSombra" cx="0.5" cy="0.42" r="0.6">
      <stop offset="0" stop-color="#0b1220" stop-opacity="0"/>
      <stop offset="1" stop-color="#0b1220" stop-opacity="0.66"/>
    </radialGradient>
  </defs>

  <!-- ================= GALPÃO ================= -->
  <rect width="1000" height="470" fill="url(#fParede)"/>
  <rect y="470" width="1000" height="110" fill="url(#fPiso)"/>
  <rect y="462" width="1000" height="12" fill="#5f6975"/>
  <g stroke="#b4c0cd" stroke-width="9" fill="none" opacity="0.6">
    <path d="M60 40 V462 M940 40 V462"/>
    <path d="M40 46 H960"/>
    <path d="M60 118 L300 56 M700 56 L940 118"/>
  </g>
  <g fill="#d6e0ea" opacity="0.5">
    <rect x="330" y="62" width="150" height="58" rx="5"/>
    <rect x="520" y="62" width="150" height="58" rx="5"/>
  </g>

  <!-- ============ RISCO 8: inspeção mal iluminada ============ -->
  <g class="risco" data-risco="f8" data-area="70,132,206,214" tabindex="0" role="button" aria-label="Bancada de inspeção mal iluminada">
    <rect x="74" y="136" width="198" height="206" rx="10" fill="#4a586a" opacity="0.3"/>
    <path d="M172 136 v40" stroke="#5f6b79" stroke-width="7"/>
    <path d="M142 176 h60 l-14 30 h-32 z" fill="#39465a" stroke="#26313f" stroke-width="2.5"/>
    <g class="lampada-fraca"><circle cx="172" cy="214" r="10" fill="#fde68a" opacity="0.42"/></g>
    <rect x="94" y="288" width="158" height="13" rx="4" fill="url(#metal)" stroke="#6f7b88" stroke-width="2"/>
    <rect x="104" y="301" width="13" height="41" fill="#7f8b98"/>
    <rect x="230" y="301" width="13" height="41" fill="#7f8b98"/>
    <g fill="#e2e8f0" opacity="0.55" stroke="#94a3b8" stroke-width="1.5">
      <rect x="118" y="268" width="40" height="20" rx="3"/>
      <rect x="176" y="268" width="40" height="20" rx="3"/>
    </g>
    <rect x="74" y="136" width="198" height="206" rx="10" fill="url(#fSombra)"/>
  </g>

  <!-- ============ RISCO 2: carga acima dos ombros ============ -->
  <g class="risco" data-risco="f2" data-area="330,96,270,138" tabindex="0" role="button" aria-label="Prateleira acima dos ombros">
    <rect x="338" y="176" width="254" height="15" rx="2" fill="#7a7168" stroke="#57504a" stroke-width="2"/>
    <rect x="338" y="218" width="254" height="15" rx="2" fill="#7a7168" stroke="#57504a" stroke-width="2"/>
    <rect x="342" y="176" width="14" height="58" fill="#5f5851"/>
    <rect x="574" y="176" width="14" height="58" fill="#5f5851"/>
    <g stroke="#8f5a20" stroke-width="3">
      <rect x="358" y="128" width="66" height="48" rx="4" fill="url(#caixa)"/>
      <rect x="434" y="134" width="60" height="42" rx="4" fill="#dd7f22"/>
      <rect x="504" y="124" width="70" height="52" rx="4" fill="url(#caixa)"/>
    </g>
    <path d="M350 110 h232" stroke="#dc2626" stroke-width="4" stroke-dasharray="11 8" opacity="0.85"/>
    <text x="466" y="104" text-anchor="middle" font-family="Outfit, sans-serif" font-size="15"
          font-weight="800" fill="#b91c1c">ACIMA DOS OMBROS</text>
  </g>

  <!-- ============ RISCO 6: esteira com movimento repetitivo ============ -->
  <g class="risco" data-risco="f6" data-area="676,268,300,176" tabindex="0" role="button" aria-label="Esteira transportadora">
    <rect x="684" y="336" width="288" height="28" rx="12" fill="#4a586a" stroke="#313d4d" stroke-width="2.5"/>
    <g class="esteira-rolos" fill="#9dabbb">
      <circle cx="710" cy="350" r="9"/><circle cx="754" cy="350" r="9"/><circle cx="798" cy="350" r="9"/>
      <circle cx="842" cy="350" r="9"/><circle cx="886" cy="350" r="9"/><circle cx="930" cy="350" r="9"/>
    </g>
    <rect x="694" y="364" width="15" height="98" fill="#39465a"/>
    <rect x="946" y="364" width="15" height="98" fill="#39465a"/>
    <g class="esteira-caixas" stroke="#8f5a20" stroke-width="3">
      <rect x="716" y="298" width="48" height="38" rx="3" fill="url(#caixa)"/>
      <rect x="812" y="298" width="48" height="38" rx="3" fill="url(#caixa)"/>
      <rect x="900" y="298" width="48" height="38" rx="3" fill="url(#caixa)"/>
    </g>
    <!-- par de mãos repetindo o ciclo sobre a esteira -->
    <g class="braco-repete">
      <path d="M826 274 q26 -6 34 10 q6 12 -6 18 q-16 8 -30 -2 q-8 -6 -4 -14 z"
            fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.2"/>
      <path d="M846 268 q22 -10 40 4" fill="none" stroke="#0f766e" stroke-width="16" stroke-linecap="round"/>
    </g>
    <!-- seta de ciclo: o movimento se repete sem pausa -->
    <g opacity="0.95">
      <path d="M796 250 a34 34 0 1 1 -2 28" fill="none" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/>
      <path d="M788 272 l7 18 l16 -11 z" fill="#dc2626"/>
      <text x="828" y="410" text-anchor="middle" font-family="Outfit, sans-serif" font-size="15" font-weight="800" fill="#b91c1c">CICLO SEM PAUSA</text>
    </g>
  </g>

  <!-- ============ RISCO 4: bancada em altura inadequada ============ -->
  <g class="risco" data-risco="f4" data-area="330,376,268,90" tabindex="0" role="button" aria-label="Bancada baixa">
    <rect x="338" y="382" width="252" height="16" rx="4" fill="url(#metal)" stroke="#6f7b88" stroke-width="2.5"/>
    <rect x="354" y="398" width="15" height="64" fill="#7f8b98"/>
    <rect x="560" y="398" width="15" height="64" fill="#7f8b98"/>
    <path d="M338 420 h252" stroke="#8e99a6" stroke-width="6"/>
    <!-- cota mostrando que a bancada é baixa -->
    <path d="M318 382 v80" stroke="#dc2626" stroke-width="3"/>
    <path d="M312 382 h12 M312 462 h12" stroke="#dc2626" stroke-width="3"/>
    <text x="306" y="428" text-anchor="end" font-family="Outfit, sans-serif" font-size="15"
          font-weight="800" fill="#b91c1c">BAIXA</text>
  </g>

  <!-- ============ RISCO 5: ferramenta que força o desvio do punho ============ -->
  <g class="risco" data-risco="f5" data-area="404,300,190,84" tabindex="0" role="button" aria-label="Ferramenta manual">
    <!-- parafusadeira em ângulo ruim, apoiada na bancada -->
    <g transform="rotate(-24 500 344)">
      <rect x="440" y="330" width="104" height="28" rx="12" fill="#1f2937" stroke="#0f172a" stroke-width="3"/>
      <rect x="432" y="316" width="26" height="54" rx="8" fill="#dc2626" stroke="#8f1616" stroke-width="3"/>
      <rect x="452" y="358" width="30" height="22" rx="5" fill="#374151"/>
      <path d="M544 344 h34" stroke="#8e99a6" stroke-width="12" stroke-linecap="round"/>
      <circle cx="586" cy="344" r="9" fill="#6b7280"/>
    </g>
    <!-- arco de cota mostrando o ângulo forçado da empunhadura -->
    <path d="M436 356 a52 52 0 0 1 28 -44" fill="none" stroke="#dc2626" stroke-width="3.5" stroke-dasharray="6 5"/>
    <path d="M462 306 l10 16 l-18 4 z" fill="#dc2626"/>
    <path d="M436 356 h-24" stroke="#dc2626" stroke-width="3"/>
    <text x="406" y="360" text-anchor="end" font-family="Outfit, sans-serif" font-size="14"
          font-weight="800" fill="#b91c1c">PUNHO TORTO</text>
  </g>

  <!-- ============ RISCO 7: carga afastada do corpo (silhueta ao fundo) ============ -->
  <g class="risco" data-risco="f7" data-area="620,150,190,150" tabindex="0" role="button" aria-label="Transporte de carga">
    <g opacity="0.34" fill="#334155">
      <circle cx="664" cy="186" r="21"/>
      <path d="M646 214 q22 -8 38 4 q10 12 8 40 l-50 2 q-6 -28 4 -46 z"/>
      <path d="M676 226 q46 -4 74 4 l-4 22 q-30 -8 -68 -4 z"/>
      <path d="M652 262 v34 M676 262 v34" stroke="#334155" stroke-width="15" stroke-linecap="round"/>
    </g>
    <rect x="748" y="216" width="56" height="44" rx="4" fill="url(#caixa)" stroke="#8f5a20" stroke-width="3" opacity="0.85"/>
    <path d="M690 178 h96" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.9"/>
    <text x="738" y="170" text-anchor="middle" font-family="Outfit, sans-serif" font-size="14"
          font-weight="800" fill="#b91c1c">CARGA LONGE</text>
  </g>

  <!-- ============ RISCO 3: piso duro, sem tapete antifadiga ============ -->
  <g class="risco" data-risco="f3" data-area="596,478,382,92" tabindex="0" role="button" aria-label="Piso de concreto">
    <rect x="600" y="482" width="374" height="84" rx="7" fill="#6b7684" opacity="0.6"/>
    <g stroke="#54606d" stroke-width="3" opacity="0.9">
      <path d="M600 510 H974 M600 538 H974 M694 482 V566 M788 482 V566 M882 482 V566"/>
    </g>
    <text x="787" y="530" text-anchor="middle" font-family="Outfit, sans-serif"
          font-size="22" font-weight="800" fill="#e8edf3" opacity="0.85">CONCRETO</text>
  </g>

  <!-- ====== RISCO 1: levantamento com a coluna curvada (figura principal) ====== -->
  <g class="risco" data-risco="f1" data-area="96,330,244,206" tabindex="0" role="button" aria-label="Levantamento de carga">
    <ellipse cx="222" cy="524" rx="104" ry="11" fill="#0b1220" opacity="0.24"/>

    <!-- perna de trás -->
    <path d="M254 412 q16 56 12 92 q-1 13 -14 13 q-13 0 -13 -13 q2 -42 -10 -86 z"
          fill="#25344a" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M226 512 h48 q10 0 10 10 v8 h-64 q-8 0 -8 -9 z" fill="#111c2b"/>

    <!-- tronco quase horizontal: a coluna faz todo o esforço -->
    <path d="M160 356 q66 2 114 38 q30 22 38 54 l-70 20 q-10 -30 -34 -46 q-24 -16 -52 -22 z"
          fill="url(#uniforme)" stroke="#9a3412" stroke-width="3"/>
    <path d="M190 378 q46 12 74 42" fill="none" stroke="#c2410c" stroke-width="4.5" opacity="0.75"/>
    <!-- faixa refletiva do uniforme -->
    <path d="M206 372 q44 14 66 44" fill="none" stroke="#fde68a" stroke-width="8" opacity="0.95"/>
    <path d="M206 372 q44 14 66 44" fill="none" stroke="#a16207" stroke-width="1.6" opacity="0.5"/>

    <!-- perna da frente, reta: o erro que sobrecarrega a lombar -->
    <path d="M300 402 q20 58 16 100 q-1 13 -15 13 q-14 0 -14 -13 q3 -46 -14 -94 z"
          fill="url(#calcaF)" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M276 512 h50 q10 0 10 10 v8 h-66 q-8 0 -8 -9 z" fill="#16202e"/>
    <path d="M222 530 h122" stroke="#0b1220" stroke-width="5" stroke-linecap="round" opacity="0.5"/>

    <!-- capacete e cabeça de perfil, olhando o chão -->
    <path d="M136 330 q40 -6 50 28 q6 22 -8 36 q-13 13 -32 10 q-25 -4 -29 -28 q-4 -28 14 -42 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.5"/>
    <path d="M118 348 q4 -32 38 -34 q32 -2 40 22 q3 9 1 17 q-13 -17 -37 -16 q-27 1 -42 21 z"
          fill="#facc15" stroke="#a16207" stroke-width="2.5"/>
    <path d="M112 366 q-8 4 -6 12 q2 8 12 8" fill="none" stroke="#a16207" stroke-width="6"/>
    <ellipse cx="150" cy="368" rx="4.8" ry="5.4" fill="#22303f"/>
    <path d="M141 356 q11 -4 19 0" fill="none" stroke="#3f2a1c" stroke-width="3" stroke-linecap="round"/>
    <path d="M181 372 q9 6 9 11 q0 4 -9 4 z" fill="#f2cda4" stroke="#d9ab7e" stroke-width="1.5"/>
    <path d="M172 396 q8 3 12 1" fill="none" stroke="#c4855c" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M118 378 q-10 3 -10 13 q0 11 11 11" fill="none" stroke="#d9ab7e" stroke-width="4.5"/>

    <!-- braço esticado por fora do tronco, mão fechada na alça da caixa -->
    <path d="M182 396 q-14 34 -14 62 q0 14 16 16 l24 -14 q-10 -10 -8 -24 q3 -20 12 -38 z"
          fill="#fb923c" stroke="#9a3412" stroke-width="3"/>
    <path d="M186 452 q24 -6 33 8 q7 11 -4 17 q-17 9 -31 0 q-8 -6 -6 -14 q2 -9 8 -11 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.2"/>
    <path d="M196 458 q10 -2 16 4" fill="none" stroke="#d9ab7e" stroke-width="2"/>

    <!-- caixa pesada no chão -->
    <rect x="112" y="464" width="96" height="56" rx="6" fill="url(#caixa)" stroke="#8f5a20" stroke-width="4"/>
    <path d="M112 492 h96" stroke="#8f5a20" stroke-width="4"/>
    <rect x="176" y="450" width="34" height="14" rx="5" fill="#a86416" stroke="#7c4a12" stroke-width="2"/>
    <text x="160" y="512" text-anchor="middle" font-family="Outfit, sans-serif" font-size="15"
          font-weight="800" fill="#7c4a12">25 kg</text>

    <!-- indicação da coluna fletida -->
    <path d="M156 344 q70 6 120 52" fill="none" stroke="#dc2626" stroke-width="3.5" stroke-dasharray="7 6" opacity="0.9"/>
  </g>
</svg>`;
}

function montarCena(chave) {
    return chave === 'escritorio' ? svgEscritorio() : svgFabrica();
}

/* Em SVG o clique só é capturado onde há preenchimento ou traço. Num desenho
   feito de linhas — um cabo, uma haste de luminária, o contorno de um braço —
   o miolo fica vazado e o usuário clica "em cima" do risco sem acertar nada.
   Aqui cada grupo ganha um retângulo de captura invisível, derivado do próprio
   getBBox do desenho: a área clicável passa a ser exatamente a figura, com uma
   folga pequena, e continua alinhada em qualquer tamanho de tela.
   Os retângulos são inseridos como PRIMEIRO filho para não cobrir o desenho,
   e os grupos menores são processados por último para vencerem a disputa
   quando duas áreas se encostam. */
function ativarAreasDeClique(svg) {
    if (!svg) return;
    const grupos = [...svg.querySelectorAll('.risco')];

    // ordena do maior para o menor: no SVG, quem vem depois no DOM fica por cima
    grupos
        .map(g => ({ g, area: (() => {
            if (g.dataset.area) { const [, , w, h] = g.dataset.area.split(',').map(Number); return w * h; }
            try { const b = g.getBBox(); return b.width * b.height; } catch (e) { return 0; }
        })() }))
        .sort((a, b) => b.area - a.area)
        .forEach(({ g }) => {
            if (g.querySelector('.area-clique')) return;
            /* Onde dois desenhos se encostam — a luminária e o ar-condicionado,
               o assento e os pés, a bancada e a ferramenta — a caixa automática
               de um engolia o vizinho. Nesses casos a área vem escrita à mão no
               próprio SVG, em coordenadas do viewBox. */
            let b;
            const manual = g.dataset.area;
            if (manual) {
                const [x, y, w, h] = manual.split(',').map(Number);
                b = { x, y, width: w, height: h };
            } else {
                try { b = g.getBBox(); } catch (e) { return; }
            }
            if (!b.width || !b.height) return;

            const folga = manual ? 0 : 6;
            const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            r.setAttribute('class', 'area-clique');
            r.setAttribute('x', b.x - folga);
            r.setAttribute('y', b.y - folga);
            r.setAttribute('width', b.width + folga * 2);
            r.setAttribute('height', b.height + folga * 2);
            r.setAttribute('fill', '#fff');
            r.setAttribute('fill-opacity', '0');
            r.setAttribute('pointer-events', 'all');
            g.insertBefore(r, g.firstChild);

            // o grupo inteiro vira alvo, inclusive o que é só traço
            g.setAttribute('pointer-events', 'all');
            svg.appendChild(g);   // reposiciona: menores acabam por cima
        });
}
