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
      <stop offset="0" stop-color="#e3ebf4"/><stop offset="1" stop-color="#c3d0de"/>
    </linearGradient>
    <linearGradient id="fPiso" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#98a2ae"/><stop offset="1" stop-color="#78838f"/>
    </linearGradient>
    <linearGradient id="pele2" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#f8dcbc"/><stop offset="1" stop-color="#eec69c"/>
    </linearGradient>
    <linearGradient id="uniVerm" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#b91c1c"/>
    </linearGradient>
    <linearGradient id="uniRoxo" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="uniAzul" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#0284c7"/><stop offset="1" stop-color="#075985"/>
    </linearGradient>
    <linearGradient id="uniVerde" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#0f766e"/>
    </linearGradient>
    <radialGradient id="fSombra" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#0f172a" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="0.6"/>
    </radialGradient>
  </defs>

  <!-- ================= GALPÃO ================= -->
  <rect width="1000" height="470" fill="url(#fParede)"/>
  <rect y="470" width="1000" height="110" fill="url(#fPiso)"/>
  <rect y="462" width="1000" height="12" fill="#5f6975"/>
  <g stroke="#aab6c4" stroke-width="8" fill="none" opacity="0.65">
    <path d="M70 46 V462 M330 46 V300 M670 46 V300 M930 46 V462"/>
    <path d="M50 52 H950"/>
    <path d="M70 128 L330 64 M670 64 L930 128"/>
  </g>

  <!-- ============ RISCO 8: inspeção mal iluminada ============ -->
  <g class="risco" data-risco="f8" data-area="76,64,196,244" tabindex="0" role="button" aria-label="Bancada de inspeção mal iluminada">
    <rect x="80" y="70" width="188" height="234" rx="10" fill="#516070" opacity="0.32"/>
    <path d="M174 70 v34" stroke="#5a6875" stroke-width="6"/>
    <path d="M146 104 h56 l-13 28 h-30 z" fill="#3d4a58"/>
    <g class="lampada-fraca"><circle cx="174" cy="140" r="9" fill="#fde68a" opacity="0.5"/></g>
    <rect x="96" y="246" width="156" height="12" rx="4" fill="#b0b8c2"/>
    <rect x="106" y="258" width="12" height="46" fill="#8d97a3"/>
    <rect x="230" y="258" width="12" height="46" fill="#8d97a3"/>
    <g fill="#dbe3ec" opacity="0.6">
      <rect x="120" y="228" width="38" height="18" rx="3"/>
      <rect x="176" y="228" width="38" height="18" rx="3"/>
    </g>
    <rect x="80" y="70" width="188" height="234" rx="10" fill="url(#fSombra)"/>
  </g>

  <!-- ============ RISCO 2: carga acima dos ombros ============ -->
  <g class="risco" data-risco="f2" data-area="352,84,266,132" tabindex="0" role="button" aria-label="Prateleira acima dos ombros">
    <rect x="360" y="160" width="250" height="14" fill="#7c7368"/>
    <rect x="360" y="204" width="250" height="14" fill="#7c7368"/>
    <rect x="364" y="160" width="13" height="58" fill="#5f5851"/>
    <rect x="594" y="160" width="13" height="58" fill="#5f5851"/>
    <g stroke="#8f5a20" stroke-width="3">
      <rect x="380" y="116" width="62" height="44" rx="4" fill="#d98324"/>
      <rect x="452" y="122" width="56" height="38" rx="4" fill="#e2701d"/>
      <rect x="518" y="112" width="66" height="48" rx="4" fill="#d98324"/>
    </g>
    <path d="M372 98 h226" stroke="#dc2626" stroke-width="4" stroke-dasharray="11 8" opacity="0.8"/>
  </g>

  <!-- ============ RISCO 6: esteira com movimento repetitivo ============ -->
  <g class="risco" data-risco="f6" data-area="744,246,238,182" tabindex="0" role="button" aria-label="Esteira transportadora">
    <rect x="748" y="352" width="230" height="26" rx="11" fill="#4a586a"/>
    <g class="esteira-rolos" fill="#98a5b4">
      <circle cx="770" cy="365" r="9"/><circle cx="810" cy="365" r="9"/>
      <circle cx="850" cy="365" r="9"/><circle cx="890" cy="365" r="9"/>
      <circle cx="930" cy="365" r="9"/><circle cx="962" cy="365" r="9"/>
    </g>
    <rect x="758" y="378" width="14" height="84" fill="#39465a"/>
    <rect x="954" y="378" width="14" height="84" fill="#39465a"/>
    <g class="esteira-caixas" stroke="#b06a13" stroke-width="3">
      <rect x="778" y="318" width="42" height="34" rx="3" fill="#f0a824"/>
      <rect x="866" y="318" width="42" height="34" rx="3" fill="#f0a824"/>
      <rect x="928" y="318" width="42" height="34" rx="3" fill="#f0a824"/>
    </g>
    <!-- operadora em pé, repetindo o mesmo movimento sobre a esteira -->
    <ellipse cx="838" cy="470" rx="44" ry="7" fill="#0f172a" opacity="0.2"/>
    <path d="M846 254 q36 0 41 30 q4 20 -8 32 q-11 12 -28 10 q-23 -3 -27 -25 q-5 -26 13 -42 q4 -4 9 -5 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.5"/>
    <path d="M818 286 q4 -34 36 -34 q30 0 34 24 q2 10 -2 18 q-8 -18 -32 -18 q-26 0 -36 22 z"
          fill="#3b2a1c" stroke="#241708" stroke-width="2"/>
    <ellipse cx="873" cy="290" rx="4.5" ry="5" fill="#22303f"/>
    <path d="M865 279 q10 -4 17 0" fill="none" stroke="#241708" stroke-width="3" stroke-linecap="round"/>
    <path d="M884 294 q8 5 8 9 q0 4 -8 4 z" fill="#f2cda4" stroke="#d9ab7e" stroke-width="1.4"/>
    <path d="M828 296 q-9 3 -9 12 q0 10 10 10" fill="none" stroke="#d9ab7e" stroke-width="4"/>
    <!-- tronco -->
    <path d="M824 318 q34 -8 54 4 q10 12 8 46 l-66 4 q-6 -32 4 -54 z"
          fill="url(#uniVerde)" stroke="#0b5d56" stroke-width="2.5"/>
    <path d="M834 340 q24 -6 40 2" fill="none" stroke="#0f766e" stroke-width="4" opacity="0.7"/>
    <!-- braço que repete o ciclo -->
    <path class="braco-repete" d="M834 330 q-34 16 -44 42 l28 14 q8 -20 28 -30 z"
          fill="url(#uniVerde)" stroke="#0b5d56" stroke-width="2.5"/>
    <path d="M804 380 q20 -4 27 8 q6 9 -4 15 q-14 8 -28 0 q-8 -5 -5 -13 q2 -8 10 -10 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2"/>
    <!-- pernas atrás da esteira -->
    <path d="M824 368 q6 44 4 72 q-1 11 -12 11 q-11 0 -11 -11 q2 -34 -2 -68 z" fill="#334155" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M856 368 q6 44 4 72 q-1 11 -12 11 q-11 0 -11 -11 q2 -34 -2 -68 z" fill="#243244" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M794 450 h42 l4 16 h-50 z" fill="#16202e"/>
    <path d="M826 450 h42 l4 16 h-50 z" fill="#1b2637"/>
  </g>

  <!-- ============ RISCO 4: bancada em altura inadequada ============ -->
  <g class="risco" data-risco="f4" data-area="352,398,254,72" tabindex="0" role="button" aria-label="Bancada baixa">
    <rect x="360" y="402" width="238" height="15" rx="4" fill="#aab3bd"/>
    <rect x="374" y="417" width="14" height="53" fill="#828d99"/>
    <rect x="570" y="417" width="14" height="53" fill="#828d99"/>
    <path d="M340 410 h-38 M618 410 h38" stroke="#dc2626" stroke-width="4" stroke-dasharray="9 7" opacity="0.85"/>
  </g>

  <!-- operador da bancada, tronco muito fletido -->
  <g>
    <ellipse cx="452" cy="466" rx="56" ry="8" fill="#0f172a" opacity="0.2"/>
    <path d="M420 400 q8 26 6 44 q-1 10 -11 10 q-10 0 -10 -10 q2 -20 -3 -40 z" fill="#2a2a6a" stroke="#1b1b4a" stroke-width="2"/>
    <!-- tronco fletido sobre a bancada -->
    <path d="M448 322 q-34 30 -30 84 l66 4 q-6 -46 16 -70 z"
          fill="url(#uniRoxo)" stroke="#4c1d95" stroke-width="2.5"/>
    <path d="M436 356 q10 -22 30 -34" fill="none" stroke="#6d28d9" stroke-width="4" opacity="0.7"/>
    <!-- pernas -->
    <path d="M436 404 q6 26 4 46 q-1 11 -12 11 q-11 0 -11 -11 q2 -22 -2 -42 z" fill="#3730a3" stroke="#1e1b6b" stroke-width="2.5"/>
    <path d="M468 404 q6 26 4 46 q-1 11 -12 11 q-11 0 -11 -11 q2 -22 -2 -42 z" fill="#312e81" stroke="#1e1b6b" stroke-width="2.5"/>
    <path d="M404 452 h42 l4 16 h-50 z" fill="#16202e"/>
    <path d="M438 452 h42 l4 16 h-50 z" fill="#1b2637"/>
    <!-- cabeça inclinada para a bancada -->
    <path d="M470 264 q36 0 41 30 q4 20 -8 32 q-11 12 -28 10 q-23 -3 -27 -25 q-5 -26 13 -42 q4 -4 9 -5 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.5"/>
    <path d="M444 292 q8 -28 36 -28 q26 0 32 20 q-14 -12 -34 -10 q-22 2 -34 18 z" fill="#3b2a1c" stroke="#241708" stroke-width="2"/>
    <ellipse cx="497" cy="300" rx="4.5" ry="5" fill="#22303f"/>
    <path d="M489 289 q10 -4 17 0" fill="none" stroke="#241708" stroke-width="3" stroke-linecap="round"/>
    <path d="M508 304 q8 5 8 9 q0 4 -8 4 z" fill="#f2cda4" stroke="#d9ab7e" stroke-width="1.4"/>
    <path d="M452 306 q-9 3 -9 12 q0 10 10 10" fill="none" stroke="#d9ab7e" stroke-width="4"/>
  </g>

  <!-- ============ RISCO 5: ferramenta que desvia o punho ============ -->
  <g class="risco" data-risco="f5" data-area="470,330,132,64" tabindex="0" role="button" aria-label="Ferramenta manual">
    <path d="M478 334 q40 8 62 32 l-24 22 q-16 -20 -42 -26 z" fill="url(#uniRoxo)" stroke="#4c1d95" stroke-width="2.5"/>
    <path d="M516 374 q20 -4 28 8 q6 9 -4 15 q-14 8 -28 0 q-8 -5 -5 -13 q2 -8 9 -10 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2"/>
    <path d="M524 366 q6 -12 2 -22" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="4 3" opacity="0.9"/>
    <g transform="rotate(30 530 386)">
      <rect x="504" y="380" width="48" height="13" rx="6" fill="#1e2937"/>
      <rect x="496" y="372" width="15" height="28" rx="4" fill="#dc2626"/>
      <path d="M552 386 h20" stroke="#7b8794" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ============ RISCO 1: levantamento com a coluna curvada ============ -->
  <g class="risco" data-risco="f1" data-area="82,296,224,190" tabindex="0" role="button" aria-label="Levantamento de carga">
    <ellipse cx="200" cy="482" rx="86" ry="9" fill="#0f172a" opacity="0.2"/>
    <!-- perna de trás -->
    <path d="M248 396 q12 40 10 72 q-1 10 -11 10 q-10 0 -10 -10 q1 -34 -8 -66 z" fill="#1b2637" stroke="#0f172a" stroke-width="2"/>
    <!-- tronco quase horizontal, com o quadril alto -->
    <path d="M146 336 q62 4 104 34 q26 20 32 46 l-64 16 q-8 -26 -28 -40 q-22 -16 -50 -22 z"
          fill="url(#uniVerm)" stroke="#8f1616" stroke-width="2.5"/>
    <path d="M176 360 q42 12 66 40" fill="none" stroke="#b91c1c" stroke-width="4" opacity="0.7"/>
    <!-- cinta de segurança na lombar -->
    <path d="M214 374 q26 10 40 28" fill="none" stroke="#f59e0b" stroke-width="7" opacity="0.9"/>
    <!-- pernas longas e RETAS: é isso que sobrecarrega a lombar -->
    <path d="M256 404 q14 42 12 72 q-1 11 -12 11 q-11 0 -11 -11 q2 -32 -10 -68 z" fill="#243244" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M286 398 q14 44 12 78 q-1 11 -12 11 q-11 0 -11 -11 q2 -36 -10 -72 z" fill="#2a3a52" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M228 476 h44 q8 0 8 8 v6 h-58 q-6 0 -6 -7 z" fill="#16202e"/>
    <path d="M260 476 h44 q8 0 8 8 v6 h-58 q-6 0 -6 -7 z" fill="#1b2637"/>
    <!-- cabeça de perfil, olhando o chão -->
    <path d="M124 316 q34 -4 42 26 q5 20 -7 33 q-11 12 -28 10 q-23 -3 -28 -25 q-5 -26 12 -40 q4 -3 9 -4 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.5"/>
    <path d="M104 340 q6 -30 34 -32 q28 -2 34 20 q-14 -12 -34 -10 q-22 2 -34 22 z" fill="#4a3323" stroke="#33220f" stroke-width="2"/>
    <ellipse cx="128" cy="352" rx="4.5" ry="5" fill="#22303f"/>
    <path d="M120 340 q10 -4 17 0" fill="none" stroke="#3f2a1c" stroke-width="3" stroke-linecap="round"/>
    <path d="M104 356 q-9 3 -9 12 q0 10 10 10" fill="none" stroke="#d9ab7e" stroke-width="4"/>
    <!-- braço esticado até a alça da caixa -->
    <path d="M142 368 q-24 26 -28 56 q-2 14 12 18 l22 -10 q-8 -10 -4 -22 q6 -20 18 -34 z"
          fill="#c62828" stroke="#8f1616" stroke-width="2.5"/>
    <path d="M124 426 q18 -4 26 6 q6 8 -2 13 q-13 8 -25 1 q-7 -4 -5 -11 q1 -7 6 -9 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2"/>
    <!-- caixa no chão -->
    <rect x="110" y="432" width="84" height="48" rx="5" fill="#d98324" stroke="#8f5a20" stroke-width="4"/>
    <path d="M110 456 h84" stroke="#8f5a20" stroke-width="4"/>
    <rect x="140" y="422" width="26" height="12" rx="4" fill="#a86416"/>
    <path d="M96 490 h150" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.85"/>
  </g>

  <!-- ============ RISCO 7: carga afastada do corpo ============ -->
  <g class="risco" data-risco="f7" data-area="548,300,208,182" tabindex="0" role="button" aria-label="Transporte de carga">
    <ellipse cx="600" cy="478" rx="52" ry="8" fill="#0f172a" opacity="0.2"/>
    <path d="M576 428 q8 26 6 44 q-1 10 -11 10 q-10 0 -10 -10 q2 -20 -3 -40 z" fill="#0b4a6f" stroke="#062f46" stroke-width="2"/>
    <!-- tronco compensando o peso para trás -->
    <path d="M568 378 q34 -12 54 6 q14 16 12 48 l-64 4 q-8 -36 -2 -58 z"
          fill="url(#uniAzul)" stroke="#054868" stroke-width="2.5"/>
    <path d="M578 396 q22 -8 38 2" fill="none" stroke="#0369a1" stroke-width="4" opacity="0.7"/>
    <!-- braços esticados à frente, longe do tronco -->
    <path d="M604 388 q56 -6 90 4 l-6 28 q-36 -10 -84 -6 z" fill="url(#uniAzul)" stroke="#054868" stroke-width="2.5"/>
    <path d="M686 388 q20 -2 26 10 q5 10 -6 15 q-16 6 -28 -3 q-7 -6 -3 -13 q3 -7 11 -9 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2"/>
    <!-- pernas -->
    <path d="M582 430 q6 24 4 42 q-1 11 -12 11 q-11 0 -11 -11 q2 -20 -2 -38 z" fill="#1e3a5f" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M610 430 q6 24 4 42 q-1 11 -12 11 q-11 0 -11 -11 q2 -20 -2 -38 z" fill="#17304f" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M550 474 h42 l4 16 h-50 z" fill="#16202e"/>
    <path d="M582 474 h42 l4 16 h-50 z" fill="#1b2637"/>
    <!-- cabeça de perfil -->
    <path d="M588 320 q36 0 41 30 q4 20 -8 32 q-11 12 -28 10 q-23 -3 -27 -25 q-5 -26 13 -42 q4 -4 9 -5 z"
          fill="url(#pele2)" stroke="#d9ab7e" stroke-width="2.5"/>
    <path d="M562 348 q8 -28 36 -28 q26 0 32 20 q-14 -12 -34 -10 q-22 2 -34 18 z" fill="#4a3323" stroke="#33220f" stroke-width="2"/>
    <ellipse cx="615" cy="356" rx="4.5" ry="5" fill="#22303f"/>
    <path d="M607 345 q10 -4 17 0" fill="none" stroke="#3f2a1c" stroke-width="3" stroke-linecap="round"/>
    <path d="M626 360 q8 5 8 9 q0 4 -8 4 z" fill="#f2cda4" stroke="#d9ab7e" stroke-width="1.4"/>
    <path d="M570 362 q-9 3 -9 12 q0 10 10 10" fill="none" stroke="#d9ab7e" stroke-width="4"/>
    <!-- caixa longe do corpo -->
    <rect x="700" y="382" width="66" height="54" rx="5" fill="#ca8a04" stroke="#7f5307" stroke-width="4"/>
    <path d="M700 408 h66" stroke="#7f5307" stroke-width="4"/>
    <path d="M624 356 h104" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.9"/>
  </g>

  <!-- ============ RISCO 3: piso duro, sem tapete antifadiga ============ -->
  <g class="risco" data-risco="f3" data-area="300,486,336,84" tabindex="0" role="button" aria-label="Piso de concreto">
    <rect x="304" y="490" width="328" height="76" rx="7" fill="#6b7684" opacity="0.6"/>
    <g stroke="#54606d" stroke-width="3" opacity="0.9">
      <path d="M304 516 H632 M304 542 H632 M386 490 V566 M468 490 V566 M550 490 V566"/>
    </g>
    <text x="468" y="536" text-anchor="middle" font-family="Outfit, sans-serif"
          font-size="21" font-weight="800" fill="#e8edf3" opacity="0.85">CONCRETO</text>
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
