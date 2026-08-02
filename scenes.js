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
  <!-- pernas e pés: risco 8 -->
  <g class="risco" data-risco="o8" data-area="196,376,168,92" tabindex="0" role="button" aria-label="Pernas e pés do trabalhador">
    <path d="M206 336 q54 4 96 8 q14 2 14 16 q0 14 -14 14 q-52 2 -96 -6 z" fill="#2a3f63"/>
    <path d="M302 358 q16 26 14 52 q-1 13 -15 13 q-14 0 -14 -13 q1 -26 -9 -46 z" fill="#22355a"/>
    <path d="M288 414 h44 q10 0 10 9 v9 h-58 q-6 0 -6 -8 z" fill="#16202e"/>
    <!-- o vão entre o pé e o piso é o próprio risco: fica explícito -->
    <path d="M310 436 v28" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 5" opacity="0.9"/>
    <path d="M196 468 h168" stroke="#dc2626" stroke-width="4" stroke-dasharray="11 8" opacity="0.75"/>
  </g>

  <!-- tronco, cabeça e pescoço: risco 7 -->
  <g class="risco" data-risco="o7" data-area="188,132,150,206" tabindex="0" role="button" aria-label="Postura do trabalhador">
    <!-- tronco arredondado (cifose) -->
    <path d="M204 344 q-14 -62 14 -100 q16 -22 44 -30 l16 40 q-24 8 -34 26 q-14 26 -6 62 z" fill="#2563eb"/>
    <path d="M212 300 q10 -34 34 -52" stroke="#1d4ed8" stroke-width="5" fill="none" opacity="0.8"/>
    <!-- pescoço projetado à frente -->
    <path d="M262 214 q22 -12 40 -12 l4 26 q-16 0 -30 10 z" fill="#f2cfa8"/>
    <!-- cabeça de perfil -->
    <path d="M300 148 q34 0 40 30 q4 22 -10 34 q-12 10 -30 8 q-22 -2 -28 -24 q-6 -30 28 -48 z" fill="#f5d5b0"/>
    <path d="M340 182 l9 8 -9 5 z" fill="#e8bd91"/>
    <circle cx="330" cy="176" r="4" fill="#2b1d12"/>
    <path d="M276 168 q16 -26 46 -22 q22 3 28 22 q-16 -12 -40 -10 q-22 2 -34 10 z" fill="#4a3323"/>
    <path d="M288 190 q-8 4 -7 12 q1 8 9 8" fill="none" stroke="#e0b489" stroke-width="4"/>
    <!-- braço até o teclado alto, ombro elevado -->
    <path d="M242 246 q34 -6 62 8 q14 6 22 20 l-22 14 q-8 -12 -20 -16 q-24 -8 -46 -4 z" fill="#2f6ef0"/>
    <ellipse cx="336" cy="290" rx="15" ry="12" fill="#f2cfa8"/>
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
    <path d="M842 258 q30 0 34 26 q3 20 -12 28 q-16 8 -30 -2 q-14 -10 -12 -28 q3 -24 20 -24 z" fill="#f5d5b0"/>
    <path d="M820 276 q14 -22 40 -18 q20 3 24 20 q-16 -12 -36 -9 q-18 3 -28 7 z" fill="#3b2a1c"/>
    <path d="M828 312 q28 -8 46 8 q14 14 12 44 l-58 4 q-8 -32 0 -56 z" fill="#0e9488"/>
    <path class="braco-repete" d="M834 322 q-30 14 -38 38 l24 12 q6 -18 24 -28 z" fill="#0e9488"/>
    <ellipse cx="812" cy="376" rx="14" ry="11" fill="#f2cfa8"/>
    <path d="M834 366 v52" stroke="#0e9488" stroke-width="24" stroke-linecap="round"/>
    <path d="M824 412 v44" stroke="#334155" stroke-width="18" stroke-linecap="round"/>
    <path d="M850 412 v44" stroke="#334155" stroke-width="18" stroke-linecap="round"/>
    <path d="M806 456 h38 l4 18 h-46 z" fill="#1e293b"/>
    <path d="M838 456 h38 l4 18 h-46 z" fill="#1e293b"/>
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
    <path d="M470 268 q32 0 36 28 q3 22 -13 30 q-18 8 -32 -4 q-14 -12 -10 -30 q4 -24 19 -24 z" fill="#f5d5b0"/>
    <path d="M446 288 q14 -24 42 -20 q22 3 26 22 q-17 -13 -38 -10 q-19 3 -30 8 z" fill="#3b2a1c"/>
    <path d="M452 320 q-30 30 -26 82 l58 4 q-4 -44 14 -66 z" fill="#7c3aed"/>
    <path d="M430 402 v40" stroke="#3730a3" stroke-width="19" stroke-linecap="round"/>
    <path d="M462 402 v40" stroke="#3730a3" stroke-width="19" stroke-linecap="round"/>
    <path d="M412 442 h38 l4 20 h-46 z" fill="#1e293b"/>
    <path d="M446 442 h38 l4 20 h-46 z" fill="#1e293b"/>
  </g>

  <!-- ============ RISCO 5: ferramenta que desvia o punho ============ -->
  <g class="risco" data-risco="f5" data-area="470,330,132,64" tabindex="0" role="button" aria-label="Ferramenta manual">
    <path d="M486 336 q34 4 54 26 l-20 20 q-16 -18 -38 -22 z" fill="#7c3aed"/>
    <ellipse cx="530" cy="386" rx="15" ry="12" fill="#f2cfa8"/>
    <g transform="rotate(30 530 386)">
      <rect x="504" y="380" width="48" height="13" rx="6" fill="#1e2937"/>
      <rect x="496" y="372" width="15" height="28" rx="4" fill="#dc2626"/>
      <path d="M552 386 h20" stroke="#7b8794" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ============ RISCO 1: levantamento com a coluna curvada ============ -->
  <g class="risco" data-risco="f1" data-area="82,296,224,176" tabindex="0" role="button" aria-label="Levantamento de carga">
    <path d="M118 322 q32 -6 42 20 q7 20 -8 32 q-18 12 -34 2 q-15 -10 -12 -28 q4 -24 12 -26 z" fill="#f5d5b0"/>
    <path d="M100 336 q10 -26 38 -24 q22 2 28 20 q-18 -11 -38 -7 q-18 4 -28 11 z" fill="#3b2a1c"/>
    <!-- tronco quase horizontal -->
    <path d="M150 344 q54 10 84 48 q16 20 20 44 l-58 12 q-6 -26 -20 -40 q-20 -20 -50 -28 z" fill="#dc2626"/>
    <!-- pernas retas -->
    <path d="M244 428 v40" stroke="#243244" stroke-width="21" stroke-linecap="round"/>
    <path d="M272 424 v44" stroke="#243244" stroke-width="21" stroke-linecap="round"/>
    <path d="M226 462 h40 l4 18 h-48 z" fill="#16202e"/>
    <path d="M258 462 h40 l4 18 h-48 z" fill="#16202e"/>
    <!-- braço esticado até a caixa no chão -->
    <path d="M150 366 q-24 26 -28 56 q-2 14 10 18 l24 -8 q-8 -10 -4 -24 q5 -18 16 -32 z" fill="#b91c1c"/>
    <ellipse cx="146" cy="432" rx="15" ry="12" fill="#f2cfa8"/>
    <rect x="118" y="426" width="82" height="48" rx="5" fill="#d98324" stroke="#8f5a20" stroke-width="4"/>
    <path d="M118 450 h82" stroke="#8f5a20" stroke-width="4"/>
    <path d="M104 480 h150" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.85"/>
  </g>

  <!-- ============ RISCO 7: carga afastada do corpo ============ -->
  <g class="risco" data-risco="f7" data-area="556,300,186,178" tabindex="0" role="button" aria-label="Transporte de carga">
    <path d="M590 324 q32 0 36 28 q3 22 -13 30 q-18 8 -32 -4 q-14 -12 -10 -30 q4 -24 19 -24 z" fill="#f5d5b0"/>
    <path d="M568 342 q14 -22 40 -18 q21 3 25 21 q-17 -12 -37 -9 q-18 3 -28 6 z" fill="#3b2a1c"/>
    <path d="M572 384 q30 -10 46 6 q12 14 10 44 l-56 4 q-6 -34 0 -54 z" fill="#0369a1"/>
    <path d="M604 396 q54 -4 84 4 l-4 24 q-32 -8 -80 -4 z" fill="#0369a1"/>
    <path d="M578 436 v36" stroke="#1e3a5f" stroke-width="19" stroke-linecap="round"/>
    <path d="M606 436 v36" stroke="#1e3a5f" stroke-width="19" stroke-linecap="round"/>
    <path d="M560 472 h38 l4 18 h-46 z" fill="#16202e"/>
    <path d="M592 472 h38 l4 18 h-46 z" fill="#16202e"/>
    <rect x="680" y="384" width="66" height="52" rx="5" fill="#ca8a04" stroke="#7f5307" stroke-width="4"/>
    <path d="M680 410 h66" stroke="#7f5307" stroke-width="4"/>
    <path d="M608 360 h108" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8" opacity="0.9"/>
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
