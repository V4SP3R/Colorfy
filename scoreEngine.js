
export function computeFinalResult({ quizAnswers, vision }) {
  // --- 1. INITIALIZE SCORE COUNTERS ---
  const s = {
    "Primavera Quente": 0, "Primavera Quente Oliva": 0, "Primavera Brilhante": 0, "Primavera Clara": 0,
    "Outono Quente": 0, "Outono Quente Oliva": 0, "Outono Suave": 0, "Outono Profundo": 0, "Outono Profundo Oliva": 0,
    "Verão Frio": 0, "Verão Frio Oliva": 0, "Verão Suave": 0, "Verão Claro": 0,
    "Inverno Frio": 0, "Inverno Frio Oliva": 0, "Inverno Brilhante": 0, "Inverno Profundo": 0, "Inverno Profundo Oliva": 0,
    "Oliva Quente": 0,
    "Oliva Frio": 0
  };

  const groupWarm = ["Primavera Clara", "Primavera Quente", "Primavera Brilhante", "Outono Suave", "Outono Quente", "Outono Profundo"];
  const groupCool = ["Verão Claro", "Verão Suave", "Verão Frio", "Inverno Brilhante", "Inverno Frio", "Inverno Profundo"];
  const allAutumns = ["Outono Suave", "Outono Quente", "Outono Profundo", "Outono Quente Oliva", "Outono Profundo Oliva"];
  const allSummers = ["Verão Claro", "Verão Suave", "Verão Frio", "Verão Frio Oliva"];
  const allWinters = ["Inverno Brilhante", "Inverno Frio", "Inverno Profundo", "Inverno Frio Oliva", "Inverno Profundo Oliva"];

  // --- 2. BASIC SCORING (Q1-Q11) ---
  const q1 = quizAnswers["q1"];
  if (q1 === "A") { s["Inverno Profundo"] += 2; s["Outono Profundo"] += 2; s["Outono Quente"] += 1; }
  if (q1 === "B") { s["Primavera Quente"] += 1; s["Outono Quente"] += 1; s["Oliva Quente"] += 1; s["Outono Suave"] += 1; }
  if (q1 === "C") { allAutumns.forEach(k => s[k] += 1); s["Oliva Quente"] += 1; s["Primavera Quente"] += 1; }
  if (q1 === "D") { s["Outono Suave"] += 1; s["Primavera Clara"] += 1; s["Primavera Quente"] += 1; }
  if (q1 === "E") { allSummers.forEach(k => s[k] += 1); allWinters.forEach(k => s[k] += 1); }

  const q2 = quizAnswers["q2"];
  if (q2 === "A") { s["Inverno Brilhante"] += 1; s["Inverno Profundo"] += 1; s["Inverno Frio"] += 1; s["Primavera Quente"] += 1; s["Outono Profundo"] += 1; }

  const q3 = quizAnswers["q3"];
  if (q3 === "B") { s["Inverno Brilhante"] += 1; s["Inverno Profundo"] += 1; s["Inverno Frio"] += 1; s["Primavera Quente"] += 1; s["Outono Profundo"] += 1; }

  const q4 = quizAnswers["q4"];
  if (q4 === "a") { s["Inverno Profundo"] += 3; s["Inverno Brilhante"] += 2; }
  if (q4 === "b") { s["Inverno Profundo"] += 2; s["Outono Profundo"] += 2; }
  if (q4 === "c") { s["Outono Quente"] += 1; s["Primavera Quente"] += 1; }
  if (q4 === "d") { s["Primavera Quente"] += 2; s["Outono Suave"] += 1; }
  if (q4 === "e") { s["Verão Suave"] += 2; s["Verão Frio"] += 1; }
  if (q4 === "f") { s["Primavera Clara"] += 2; s["Verão Claro"] += 2; }
  if (q4 === "g") { s["Primavera Quente"] += 3; s["Primavera Clara"] += 1; }
  if (q4 === "h") { s["Outono Quente"] += 3; s["Outono Profundo"] += 2; }

  const q5 = quizAnswers["q5"];
  if (q5 === "A") { s["Oliva Frio"] += 2; allWinters.forEach(k => s[k] += 2); allSummers.forEach(k => s[k] += 2); }
  if (q5 === "B") { s["Oliva Quente"] += 2; s["Oliva Frio"] += 2; groupWarm.forEach(k => s[k] += 2); }
  if (q5 === "C") { s["Oliva Quente"] += 3; s["Oliva Frio"] += 3; }

  const q6 = quizAnswers["q6"];
  if (q6 === "B") { s["Primavera Clara"] += 3; s["Primavera Quente"] += 3; s["Primavera Brilhante"] += 3; allAutumns.forEach(k => s[k] += 3); }
  if (q6 === "C") { allAutumns.forEach(k => s[k] += 3); s["Primavera Quente"] += 1; }
  if (q6 === "D") { s["Oliva Frio"] += 3; s["Oliva Quente"] += 1; }

  const q7 = quizAnswers["q7"];
  if (q7 === "A") { allSummers.forEach(k => s[k] += 2); allWinters.forEach(k => s[k] += 2); }
  if (q7 === "B") { s["Primavera Clara"] += 1; s["Primavera Quente"] += 1; s["Primavera Brilhante"] += 1; allAutumns.forEach(k => s[k] += 1); }
  if (q7 === "C") { s["Outono Quente"] += 2; s["Oliva Quente"] += 2; s["Outono Profundo"] += 1; }
  if (q7 === "D") { s["Oliva Frio"] += 2; }

  const q8 = quizAnswers["q8"];
  if (q8 === "C") { s["Primavera Quente"] += 2; s["Primavera Brilhante"] += 2; s["Outono Suave"] += 1; s["Outono Quente"] += 3; s["Outono Profundo"] += 2; s["Oliva Quente"] += 2; }
  if (q8 === "D") { s["Oliva Frio"] += 2; s["Verão Claro"] += 2; s["Inverno Brilhante"] += 2; }
  if (q8 === "E") { s["Oliva Frio"] += 3; s["Oliva Quente"] += 3; }

  const q9 = quizAnswers["q9"];
  if (q9 === "A") { 
    // ✅ CORRIGIDO: Nunca consegui bronzear. Sempre fico rosa. (1pt conforme PDF)
    allWinters.forEach(k => s[k] += 1); 
    allSummers.forEach(k => s[k] += 1); 
  }
  if (q9 === "B") { 
    // ✅ CORRIGIDO: Tom opaco (mostarda/terracota) → apenas Oliva Quente
    s["Oliva Quente"] += 2; 
  }
  if (q9 === "C") { 
    // Tom acinzentado (argila) → Oliva Frio
    s["Oliva Frio"] += 3; 
  }
  if (q9 === "D") { 
    // ✅ CORRIGIDO: Tom dourado luminoso (outono/caramelo) → Primaveras e Outonos
    s["Primavera Quente"] += 3;
    s["Primavera Clara"] += 3;
    s["Primavera Brilhante"] += 3;
    allAutumns.forEach(k => s[k] += 3);
  }
  if (q9 === "E") { 
    // ✅ NOVO: Fica vermelha e normaliza em 1-2 dias
    allSummers.forEach(k => s[k] += 1);
    s["Inverno Brilhante"] += 1; // "Inverno Claro" = "Inverno Brilhante"
  }

  const q10 = quizAnswers["q10"];
  if (q10 === "A") { allWinters.forEach(k => s[k] += 3); allSummers.forEach(k => s[k] += 3); }
  if (q10 === "B") { allAutumns.forEach(k => s[k] += 3); s["Primavera Quente"] += 3; s["Primavera Clara"] += 3; s["Primavera Brilhante"] += 3; }
  if (q10 === "C") { s["Oliva Quente"] += 3; }
  if (q10 === "D") { s["Oliva Frio"] += 3; }

  const q11 = quizAnswers["q11"];
  if (q11 === "A") { s["Oliva Quente"] += 3; s["Oliva Frio"] += 3; }
  if (q11 === "C") { allSummers.forEach(k => s[k] += 4); allWinters.forEach(k => s[k] += 4); }
  if (q11 === "D") { s["Primavera Quente"] += 4; s["Primavera Clara"] += 4; s["Primavera Brilhante"] += 4; allAutumns.forEach(k => s[k] += 4); }
  if (q11 === "E") { allSummers.forEach(k => s[k] += 4); allAutumns.forEach(k => s[k] += 4); }

  // --- 3. PREMISSAS DE LÓGICA (USER RULES) ---
  const q12 = quizAnswers["q12"];

  // Premissa 1: Esclera branca + cabelo escuro (+ pele clara/média)
  if (q2 === "A" && (q4 === "a" || q4 === "b")) {
    s["Inverno Brilhante"] += 3;
    s["Inverno Profundo"] += 3;
    // Se pele clara ou média, reforça Invernos
    if (q12 === "A" || q12 === "B") {
      s["Inverno Brilhante"] += 4;
      s["Inverno Profundo"] += 4;
    }
  }

  // Premissa 2: Olhos verdes + cabelo ruivo claro + sardas douradas
  if (q1 === "D" && q4 === "g" && q6 === "B") {
    s["Primavera Brilhante"] += 3;
    s["Primavera Quente"] += 3;
  }

  // Premissa 3: Esclera suave + cabelo claro + pele morena/profunda
  if (q2 === "B" && (q4 === "d" || q4 === "e" || q4 === "f") && (q12 === "C" || q12 === "D")) {
    s["Verão Suave"] += 3;
    s["Primavera Clara"] += 3;
    s["Outono Suave"] += 3;
  }

  // --- 4. GATING & WINNER ---
  let isOliva = false;
  let finalSeason = null;

  if (s["Oliva Frio"] >= 13) {
    isOliva = true;
    const candidates = ["Inverno Frio Oliva", "Verão Frio Oliva", "Inverno Profundo Oliva", "Inverno Frio", "Verão Frio", "Verão Suave", "Inverno Profundo"];
    finalSeason = pickWinner(s, candidates);
    
    // Aplicar desempate se necessário
    const topScore = s[finalSeason] || 0;
    const tied = candidates.filter(c => (s[c] || 0) === topScore);
    if (tied.length > 1) {
      finalSeason = resolveTie(tied, quizAnswers);
    }
  } else if (s["Oliva Quente"] >= 13) {
    isOliva = true;
    const candidates = ["Outono Quente Oliva", "Primavera Quente Oliva", "Outono Profundo Oliva", "Primavera Quente", "Outono Suave", "Outono Profundo", "Outono Quente"];
    finalSeason = pickWinner(s, candidates);
    
    // Aplicar desempate se necessário
    const topScore = s[finalSeason] || 0;
    const tied = candidates.filter(c => (s[c] || 0) === topScore);
    if (tied.length > 1) {
      finalSeason = resolveTie(tied, quizAnswers);
    }
  } else {
    const gates = {
      "Primavera Clara": 7, "Primavera Quente": 11, "Primavera Brilhante": 3,
      "Outono Suave": 8, "Outono Quente": 12, "Outono Profundo": 11,
      "Verão Claro": 5, "Verão Suave": 7, "Verão Frio": 5,
      "Inverno Brilhante": 6, "Inverno Frio": 4, "Inverno Profundo": 8
    };

    let valid = Object.keys(gates).filter(k => s[k] >= gates[k]);
    if (valid.length === 0) valid = Object.keys(gates);

    valid.sort((a, b) => s[b] - s[a]);
    const winner = valid[0];
    const topScore = s[winner];
    const ties = valid.filter(k => s[k] === topScore);

    if (ties.length > 1) {
      finalSeason = resolveTie(ties, quizAnswers);
    } else {
      finalSeason = winner;
    }
  }

  // Get full season data
  const season = SEASON_DATA[finalSeason] || SEASON_DATA["Inverno Frio"];

  // Confidence: based on margin between winner and runner-up
  const sortedByScore = Object.entries(s).sort((a, b) => b[1] - a[1]);
  const winnerScore = s[finalSeason] ?? 0;
  const runnerUp = sortedByScore.find(([name]) => name !== finalSeason);
  const runnerUpScore = runnerUp ? runnerUp[1] : 0;

  const margin = Math.max(0, winnerScore - runnerUpScore);
  const computedConfidence = Math.max(0.55, Math.min(0.95, 0.55 + margin * 0.05));


  // Construct return object matching frontend expectations
  return {
    final_palette: {
      name: finalSeason,
      confidence: Number(computedConfidence.toFixed(2))
    },
    report: {
      sections: {
        technical_note: `Classificação baseada em leitura combinada (questionário + regras de visagismo). A paleta "${finalSeason}" apresentou maior coerência com contraste, valor e temperatura.`,
        feature_inventory: season.inventory,
        seasonal_classification: `Sua classificação principal é ${finalSeason}.`,
        quick_summary: `Sua paleta ${finalSeason} valoriza sua aparência. ` + season.summary,
        main_palette: season.colors,
        best_combinations: season.combinations,
        use_with_moderation: season.moderation,
        contrast_management: season.contrast,
        real_world_style: {
          roupas: "Use a paleta como base para peças próximas ao rosto.",
          maquiagem: "Base neutra compatível com subtom; blush e batom da paleta.",
          cabelo: "Reflexos e tonalizações dentro da família cromática."
        },
        next_steps: [
          "Salve sua paleta.",
          "Teste combinações no guarda-roupa.",
          "Use como guia para compras futuras."
        ]
      }
    },
    audit: { scores: s }
  };
}

function pickWinner(scores, candidates) {
  let best = candidates[0];
  let max = -1;
  candidates.forEach(c => {
    if ((scores[c] || 0) > max) {
      max = scores[c];
      best = c;
    }
  });
  return best;
}

function resolveTie(ties, qa) {
  // Critério 1: Esclera + Recorte da Íris
  const hasBrightSclera = (qa["q2"] === "A");  // Branca muito clara
  const hasSharpIris = (qa["q3"] === "B");     // Recorte nítido
  
  if (hasBrightSclera && hasSharpIris) {
    // Favorece: Brilhantes e Profundos
    const preferred = ties.filter(c => 
      c.includes("Brilhante") || c.includes("Profundo")
    );
    if (preferred.length > 0) return preferred[0];
  }
  
  if (qa["q2"] === "B" && qa["q3"] === "A") {
    // Esclera off-white + transição suave → Favorece Suaves e Claros
    const preferred = ties.filter(c => 
      c.includes("Suave") || c.includes("Clara") || c.includes("Claro")
    );
    if (preferred.length > 0) return preferred[0];
  }

  // Critério 2: Reação de Rubor
  if (qa["q7"] === "A") {
    // Rubor rápido/rosado → Primaveras Claras / Verões
    const preferred = ties.filter(c => 
      c.includes("Primavera Clara") || c.includes("Verão")
    );
    if (preferred.length > 0) return preferred[0];
  }
  
  if (qa["q7"] === "C") {
    // Escurece/bronzeia → Outonos
    const preferred = ties.filter(c => c.includes("Outono"));
    if (preferred.length > 0) return preferred[0];
  }

  // Critério 3: Olheiras + Sardas
  if (qa["q8"] === "C" || qa["q6"] === "C") {
    // Olheiras/sardas castanhas ou caramelo → Outonos
    const preferred = ties.filter(c => c.includes("Outono"));
    if (preferred.length > 0) return preferred[0];
  }
  
  if (qa["q8"] === "D") {
    // Olheiras azuladas → Primaveras
    const preferred = ties.filter(c => c.includes("Primavera"));
    if (preferred.length > 0) return preferred[0];
  }
  
  if (qa["q8"] === "E" || qa["q6"] === "D") {
    // Olheiras/sardas acinzentadas → Profundas
    const preferred = ties.filter(c => c.includes("Profundo"));
    if (preferred.length > 0) return preferred[0];
  }

  // Fallback: mantém primeira opção
  return ties[0];
}

const SEASON_DATA = {
  "Primavera Brilhante": {
    summary: "Brilho e vivacidade são suas marcas.",
    inventory: { "Temp": "Quente/Oliva", "Valor": "Claro", "Contraste": "Médio" },
    combinations: ["Neutros + 1 cor neon/viva", "Tecidos acetinados", "Marfim Claríssimo no lugar de branco"],
    moderation: ["Preto puro colado ao rosto", "Cores empoeiradas", "Opacos"],
    contrast: "Médio a Alto. A vibração da cor ajuda a anular aspecto acinzentado.",
    colors: [{ name: "Coral Neon", hex: "#FF4040" }, { name: "Rosa Melancia", hex: "#FC6C85" }, { name: "Verde Lima", hex: "#32CD32" }, { name: "Azul Turquesa", hex: "#00E5FF" }, { name: "Amarelo Ouro", hex: "#FFD700" }, { name: "Vermelho Papoula", hex: "#FF2400" }, { name: "Roxo Ametista", hex: "#9966CC" }, { name: "Cinza Quente", hex: "#808080" }]
  },
  "Primavera Quente": {
    summary: "Cores quentes e alegres te iluminam.",
    inventory: { "Temp": "Quente pura", "Valor": "Médio-Claro", "Saturação": "Alta" },
    combinations: ["Color blocking quente", "Estampas florais vibrantes", "Dourado amarelo"],
    moderation: ["Cores frias (azul bebê, prata)", "Preto", "Tons pastéis lavados"],
    contrast: "Médio. Foco na vibração e cor.",
    colors: [{ name: "Laranja Tangerina", hex: "#FF8800" }, { name: "Verde Grama", hex: "#32CD32" }, { name: "Amarelo Narciso", hex: "#FFCC00" }, { name: "Coral Pêssego", hex: "#FF9966" }, { name: "Azul Royal Quente", hex: "#4169E1" }, { name: "Marrom Camel", hex: "#C19A6B" }, { name: "Vermelho Tomate", hex: "#FF6347" }, { name: "Salmão Vivo", hex: "#FA8072" }]
  },
  "Primavera Quente Oliva": {
    summary: "Dourado e vibração valorizam sua pele oliva.",
    inventory: { "Temp": "Quente/Oliva", "Valor": "Médio", "Saturação": "Alta" },
    combinations: ["Verde Lima e Coral", "Dourado para iluminar", "Estampas vivas"],
    moderation: ["Beges acinzentados", "Prata", "Cores frias apagadas"],
    contrast: "Médio. Use cores vivas para acender a pele.",
    colors: [{ name: "Verde Lima", hex: "#C9CF7A" }, { name: "Amarelo Solar", hex: "#FFCC00" }, { name: "Coral Vibrante", hex: "#FF9966" }, { name: "Salmão", hex: "#FA8072" }, { name: "Verde Folha", hex: "#6A994E" }, { name: "Dourado", hex: "#DDA15E" }, { name: "Creme", hex: "#F0EAD2" }, { name: "Verde Musgo", hex: "#3A5A40" }]
  },
  "Primavera Clara": {
    summary: "Delicadeza e luz são essenciais.",
    inventory: { "Temp": "Neutra-Quente", "Valor": "Claro", "Contraste": "Baixo" },
    combinations: ["Cores sorvete", "Monocromáticos claros (creme + pêssego)", "Tecidos fluidos"],
    moderation: ["Cores escuras e pesadas", "Preto", "Contrastes duros"],
    contrast: "Baixo a Médio. Mantenha tudo iluminado.",
    colors: [{ name: "Pêssego Suave", hex: "#FFDAB9" }, { name: "Verde Menta", hex: "#98FF98" }, { name: "Amarelo Banana", hex: "#FFE135" }, { name: "Rosa Coral Claro", hex: "#F08080" }, { name: "Azul Aqua", hex: "#00FFFF" }, { name: "Lavanda Quente", hex: "#E6E6FA" }, { name: "Bege Aveia", hex: "#F5F5DC" }, { name: "Champanhe", hex: "#F7E7CE" }]
  },
  "Outono Profundo": {
    summary: "Profundidade e sofisticação.",
    inventory: { "Temp": "Neutra-Quente", "Valor": "Escuro", "Contraste": "Alto" },
    combinations: ["Neutros escuros (café, militar)", "Metais envelhecidos", "Couro e camurça"],
    moderation: ["Tons pastéis bebê", "Neons sintéticos", "Branco puro"],
    contrast: "Alto (com cores profundas).",
    colors: [{ name: "Terracota", hex: "#8B0000" }, { name: "Verde Militar", hex: "#556B2F" }, { name: "Mostarda", hex: "#DAA520" }, { name: "Marinho Quente", hex: "#000080" }, { name: "Chocolate", hex: "#3D2B1F" }, { name: "Marsala", hex: "#955251" }, { name: "Berinjela", hex: "#4B0082" }, { name: "Cobre", hex: "#B87333" }]
  },
  "Outono Profundo Oliva": {
    summary: "Oliva escuro sofisticado e rico.",
    inventory: { "Temp": "Oliva/Quente", "Valor": "Escuro", "Contraste": "Alto" },
    combinations: ["Ocre e mostarda", "Verde Militar Intenso", "Vinho Marsala"],
    moderation: ["Cores muito claras ou frias", "Rosa bebê"],
    contrast: "Alto. Realça o bronzeado natural.",
    colors: [{ name: "Café", hex: "#3D2B1F" }, { name: "Verde Militar", hex: "#556B2F" }, { name: "Mostarda", hex: "#DAA520" }, { name: "Marsala", hex: "#955251" }, { name: "Berinjela", hex: "#4B0082" }, { name: "Cobre", hex: "#B87333" }, { name: "Marinho", hex: "#000080" }, { name: "Creme", hex: "#FFF1C8" }]
  },
  "Outono Quente": {
    summary: "Terrosos e quentes são seu habitat natural.",
    inventory: { "Temp": "Quente pura", "Valor": "Médio", "Saturação": "Opaca" },
    combinations: ["Tom sobre tom terroso", "Mostarda e ferrugem", "Texturas rústicas"],
    moderation: ["Cores frias brilhantes (pink, royal)", "Preto puro", "Branco óptico"],
    contrast: "Médio. Harmonia por repetição de tons quentes.",
    colors: [{ name: "Abóbora", hex: "#CC5500" }, { name: "Musgo", hex: "#8A9A5B" }, { name: "Mostarda", hex: "#E1AD01" }, { name: "Café", hex: "#6F4E37" }, { name: "Caqui", hex: "#F0E68C" }, { name: "Azul Petróleo", hex: "#008080" }, { name: "Bege Dourado", hex: "#C5A059" }, { name: "Tijolo", hex: "#CB4154" }]
  },
  "Outono Quente Oliva": {
    summary: "Repetição de quentes valoriza o oliva.",
    inventory: { "Temp": "Oliva/Quente", "Valor": "Médio", "Saturação": "Opaca" },
    combinations: ["Verde Musgo", "Mostarda Clássica", "Tons de especiarias"],
    moderation: ["Cinza", "Prata", "Azuis frios"],
    contrast: "Médio. Evite apagar o brilho natural.",
    colors: [{ name: "Musgo", hex: "#8A9A5B" }, { name: "Mostarda", hex: "#E1AD01" }, { name: "Abóbora", hex: "#CC5500" }, { name: "Café", hex: "#6F4E37" }, { name: "Caqui", hex: "#F0E68C" }, { name: "Azul Petróleo", hex: "#008080" }, { name: "Bege Dourado", hex: "#C5A059" }, { name: "Tijolo", hex: "#CB4154" }]
  },
  "Outono Suave": {
    summary: "Suavidade e elegância natural.",
    inventory: { "Temp": "Neutra-Quente", "Valor": "Médio", "Contraste": "Baixo" },
    combinations: ["Misturas suaves (sálvia + bege)", "Cores amanteigadas", "Foscos"],
    moderation: ["Preto", "Branco puro", "Neons", "Cores elétricas"],
    contrast: "Baixo. Evite quebras bruscas.",
    colors: [{ name: "Sálvia", hex: "#9DC183" }, { name: "Salmão Queimado", hex: "#FA8072" }, { name: "Areia", hex: "#F4A460" }, { name: "Rosé Antigo", hex: "#BC8F8F" }, { name: "Taupe", hex: "#483C32" }, { name: "Manteiga", hex: "#FFFACD" }, { name: "Oliva Claro", hex: "#808000" }, { name: "Jeans Desbotado", hex: "#5F9EA0" }]
  },
  "Inverno Brilhante": {
    summary: "Contraste alto e cores puras.",
    inventory: { "Temp": "Neutra-Fria", "Valor": "Médio-Escuro", "Contraste": "Altíssimo" },
    combinations: ["Preto + Branco", "Neutro escuro + Neon", "Verniz e paetê"],
    moderation: ["Terrosos (marrom, mostarda)", "Cores opacas e suaves"],
    contrast: "Extremo (Alto). Preto e branco funcionam bem.",
    colors: [{ name: "Rosa Choque", hex: "#FF00FF" }, { name: "Safira", hex: "#0F52BA" }, { name: "Esmeralda", hex: "#50C878" }, { name: "Limão Neon", hex: "#CCFF00" }, { name: "Preto", hex: "#000000" }, { name: "Cereja", hex: "#DE3163" }, { name: "Violeta", hex: "#8A2BE2" }, { name: "Branco Puro", hex: "#FFFFFF" }]
  },
  "Inverno Profundo": {
    summary: "Drama e intensidade fria.",
    inventory: { "Temp": "Neutra-Fria", "Valor": "Escuro", "Contraste": "Alto" },
    combinations: ["All Black", "All Navy", "Veludo", "Prata escurecida"],
    moderation: ["Pastéis", "Tons quentes 'sujos' (bege, pêssego)"],
    contrast: "Alto. Use o escuro perto do rosto.",
    colors: [{ name: "Preto", hex: "#000000" }, { name: "Bordeaux", hex: "#800020" }, { name: "Meia-Noite", hex: "#191970" }, { name: "Verde Garrafa", hex: "#013220" }, { name: "Ameixa", hex: "#4B0082" }, { name: "Cinza Chumbo", hex: "#36454F" }, { name: "Sangue", hex: "#660000" }, { name: "Café Preto", hex: "#3B2F2F" }]
  },
  "Inverno Profundo Oliva": {
    summary: "Oliva frio intenso e equilibrado.",
    inventory: { "Temp": "Oliva/Frio", "Valor": "Escuro", "Contraste": "Alto" },
    combinations: ["Marinho profundo", "Vinho", "Equilíbrio do verde da pele"],
    moderation: ["Tons amarelados", "Laranja"],
    contrast: "Alto. Valoriza a pele.",
    colors: [{ name: "Preto", hex: "#000000" }, { name: "Bordeaux", hex: "#800020" }, { name: "Meia-Noite", hex: "#191970" }, { name: "Verde Garrafa", hex: "#013220" }, { name: "Ameixa", hex: "#4B0082" }, { name: "Cinza Chumbo", hex: "#36454F" }, { name: "Sangue", hex: "#660000" }, { name: "Gelo", hex: "#e5e5e5" }]
  },
  "Inverno Frio": {
    summary: "Frieza pura e elegância real.",
    inventory: { "Temp": "Fria pura", "Valor": "Médio-Escuro", "Saturação": "Alta" },
    combinations: ["Cores Reais (Royal, Sangue)", "Prata brilhante"],
    moderation: ["Dourado", "Laranja", "Marrom", "Quentes"],
    contrast: "Médio a Alto. Pureza das cores frias.",
    colors: [{ name: "Cobalto", hex: "#0047AB" }, { name: "Gelo", hex: "#F0F8FF" }, { name: "Aço", hex: "#4682B4" }, { name: "Preto", hex: "#000000" }, { name: "Framboesa", hex: "#E30B5C" }, { name: "Pinho", hex: "#01796F" }, { name: "Roxo Real", hex: "#7851A9" }, { name: "Rubi", hex: "#E0115F" }]
  },
  "Inverno Frio Oliva": {
    summary: "Cores intensas para subtom frio.",
    inventory: { "Temp": "Oliva/Frio", "Valor": "Médio", "Saturação": "Alta" },
    combinations: ["Azul Cobalto", "Roxo Real", "Prata"],
    moderation: ["Dourado", "Amarelo", "Laranja"],
    contrast: "Alto. Cores frias limpam a pele.",
    colors: [{ name: "Cobalto", hex: "#0047AB" }, { name: "Gelo", hex: "#F0F8FF" }, { name: "Aço", hex: "#4682B4" }, { name: "Preto", hex: "#000000" }, { name: "Framboesa", hex: "#E30B5C" }, { name: "Pinho", hex: "#01796F" }, { name: "Roxo Real", hex: "#7851A9" }, { name: "Rubi", hex: "#E0115F" }]
  },
  "Verão Suave": {
    summary: "Suavidade fria e sofisticada.",
    inventory: { "Temp": "Neutra-Fria", "Valor": "Médio", "Contraste": "Baixo" },
    combinations: ["Camaieu (tons sobre tom)", "Tecidos foscos", "Cinza azulado"],
    moderation: ["Cores vibrantes", "Preto", "Laranja", "Contrastes duros"],
    contrast: "Baixo a Médio. Degradê suave.",
    colors: [{ name: "Azul Acinzentado", hex: "#B0E0E6" }, { name: "Sálvia Frio", hex: "#77DD77" }, { name: "Malva", hex: "#D473D4" }, { name: "Cinza Médio", hex: "#808080" }, { name: "Lavanda Opaca", hex: "#E6E6FA" }, { name: "Vinho Suave", hex: "#722F37" }, { name: "Marinho Suave", hex: "#5F9EA0" }, { name: "Off-White Frio", hex: "#F8F8FF" }]
  },
  "Verão Frio": {
    summary: "Frescor e serenidade.",
    inventory: { "Temp": "Fria pura", "Valor": "Médio-Claro", "Saturação": "Média" },
    combinations: ["Tons fundo do mar (azuis/verdes)", "Pérolas", "Prata"],
    moderation: ["Amarelados", "Dourado", "Preto perto do rosto"],
    contrast: "Médio. Serenidade e frescor.",
    colors: [{ name: "Hortênsia", hex: "#6495ED" }, { name: "Chiclete Suave", hex: "#FF69B4" }, { name: "Cinza Azulado", hex: "#708090" }, { name: "Esmeralda Suave", hex: "#50C878" }, { name: "Jeans Médio", hex: "#5F9EA0" }, { name: "Amora", hex: "#CC444B" }, { name: "Cacau Frio", hex: "#967bb6" }, { name: "Gelo", hex: "#F0F8FF" }]
  },
  "Verão Frio Oliva": {
    summary: "Cinzas e azuis equilibram o oliva.",
    inventory: { "Temp": "Oliva/Frio", "Valor": "Médio", "Saturação": "Média" },
    combinations: ["Cinza azulado", "Tons frios suaves"],
    moderation: ["Laranja", "Cores quentes"],
    contrast: "Médio. Equilíbrio de temperatura.",
    colors: [{ name: "Hortênsia", hex: "#6495ED" }, { name: "Chiclete Suave", hex: "#FF69B4" }, { name: "Cinza Azulado", hex: "#708090" }, { name: "Esmeralda Suave", hex: "#50C878" }, { name: "Jeans Médio", hex: "#5F9EA0" }, { name: "Amora", hex: "#CC444B" }, { name: "Cacau Frio", hex: "#967bb6" }, { name: "Gelo", hex: "#F0F8FF" }]
  },
  "Verão Claro": {
    summary: "Luz e suavidade fria.",
    inventory: { "Temp": "Neutra-Fria", "Valor": "Claro", "Contraste": "Baixo" },
    combinations: ["Pastéis frios (lavanda, menta)", "Off-white", "Rendas"],
    moderation: ["Cores escuras", "Preto", "Pesado"],
    contrast: "Baixo. Alta luminosidade.",
    colors: [{ name: "Rosa Bebê", hex: "#F4C2C2" }, { name: "Céu", hex: "#87CEEB" }, { name: "Amarelo Bebê", hex: "#FDFD96" }, { name: "Verde Água", hex: "#7FFFD4" }, { name: "Lilás", hex: "#C8A2C8" }, { name: "Prata", hex: "#C0C0C0" }, { name: "Framboesa Clara", hex: "#E30B5C" }, { name: "Branco Suave", hex: "#F5F5F5" }]
  }
};
