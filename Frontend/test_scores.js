const PALETTES = [
    "Primavera Clara", "Primavera Quente", "Primavera Quente Oliva", "Primavera Brilhante",
    "Outono Suave", "Outono Quente", "Outono Quente Oliva", "Outono Profundo", "Outono Profundo Oliva",
    "Verão Claro", "Verão Suave", "Verão Frio", "Verão Frio Oliva",
    "Inverno Brilhante", "Inverno Frio", "Inverno Frio Oliva", "Inverno Profundo", "Inverno Profundo Oliva",
    "Oliva Quente", "Oliva Frio"
];

const groupWarm = ["Primavera Clara", "Primavera Quente", "Primavera Brilhante", "Outono Suave", "Outono Quente", "Outono Profundo"];
const groupCool = ["Verão Claro", "Verão Suave", "Verão Frio", "Inverno Brilhante", "Inverno Frio", "Inverno Profundo"];
const allAutumns = ["Outono Suave", "Outono Quente", "Outono Profundo", "Outono Quente Oliva", "Outono Profundo Oliva"];
const allSummers = ["Verão Claro", "Verão Suave", "Verão Frio", "Verão Frio Oliva"];
const allWinters = ["Inverno Brilhante", "Inverno Frio", "Inverno Profundo", "Inverno Frio Oliva", "Inverno Profundo Oliva"];

function scoreInit() {
    const obj = {};
    PALETTES.forEach(p => obj[p] = 0);
    return obj;
}

function calculateScore(ans) {
    const s = scoreInit();
    const add = (p, v) => { if (s[p] !== undefined) s[p] += v; };
    const addList = (list, v) => list.forEach(p => add(p, v));

    // Q1
    if (ans.q1 === "A") { add("Inverno Profundo", 2); add("Outono Profundo", 2); add("Outono Quente", 1); }
    if (ans.q1 === "B") { add("Primavera Quente", 1); add("Outono Quente", 1); add("Oliva Quente", 1); add("Outono Suave", 1); }
    if (ans.q1 === "C") { addList(allAutumns, 1); add("Oliva Quente", 1); add("Primavera Quente", 1); }
    if (ans.q1 === "D") { add("Outono Suave", 1); add("Primavera Clara", 1); add("Primavera Quente", 1); }
    if (ans.q1 === "E") { addList(allSummers, 1); addList(allWinters, 1); }

    // Q2
    if (ans.q2 === "A") { add("Inverno Brilhante", 1); add("Inverno Profundo", 1); add("Inverno Frio", 1); add("Primavera Quente", 1); add("Outono Profundo", 1); }

    // Q3
    if (ans.q3 === "B") { add("Inverno Brilhante", 1); add("Inverno Profundo", 1); add("Inverno Frio", 1); add("Primavera Quente", 1); add("Outono Profundo", 1); }

    // Q4
    if (ans.q4 === "a" || ans.q4 === "A") { add("Inverno Profundo", 3); add("Inverno Brilhante", 2); }
    if (ans.q4 === "b" || ans.q4 === "B") { add("Inverno Profundo", 2); add("Outono Profundo", 2); }
    if (ans.q4 === "c" || ans.q4 === "C") { add("Outono Quente", 1); add("Primavera Quente", 1); }
    if (ans.q4 === "d" || ans.q4 === "D") { add("Primavera Quente", 2); add("Outono Suave", 1); }
    if (ans.q4 === "e" || ans.q4 === "E") { add("Verão Suave", 2); add("Verão Frio", 1); }
    if (ans.q4 === "f" || ans.q4 === "F") { add("Primavera Clara", 2); add("Verão Claro", 2); }
    if (ans.q4 === "g" || ans.q4 === "G") { add("Primavera Quente", 3); add("Primavera Clara", 1); }
    if (ans.q4 === "h" || ans.q4 === "H") { add("Outono Quente", 3); add("Outono Profundo", 2); }

    // Q5
    if (ans.q5 === "A") { add("Oliva Frio", 2); addList(allWinters, 2); addList(allSummers, 2); }
    if (ans.q5 === "B") { add("Oliva Quente", 2); add("Oliva Frio", 2); addList(groupWarm, 2); }
    if (ans.q5 === "C") { add("Oliva Quente", 3); add("Oliva Frio", 3); }

    // Q6
    if (ans.q6 === "B") { add("Primavera Clara", 3); add("Primavera Quente", 3); add("Primavera Brilhante", 3); addList(allAutumns, 3); }
    if (ans.q6 === "C") { addList(allAutumns, 3); add("Primavera Quente", 1); }
    if (ans.q6 === "D") { add("Oliva Frio", 3); add("Oliva Quente", 1); }

    // Q7
    if (ans.q7 === "A") { addList(allSummers, 2); addList(allWinters, 2); }
    if (ans.q7 === "B") { add("Primavera Clara", 1); add("Primavera Quente", 1); add("Primavera Brilhante", 1); addList(allAutumns, 1); }
    if (ans.q7 === "C") { add("Outono Quente", 2); add("Oliva Quente", 2); add("Outono Profundo", 1); }
    if (ans.q7 === "D") { add("Oliva Frio", 2); }

    // Q8
    if (ans.q8 === "C") { add("Primavera Quente", 2); add("Primavera Brilhante", 2); add("Outono Suave", 1); add("Outono Quente", 3); add("Outono Profundo", 2); add("Oliva Quente", 2); }
    if (ans.q8 === "D") { add("Oliva Frio", 2); add("Verão Claro", 2); add("Inverno Brilhante", 2); }
    if (ans.q8 === "E") { add("Oliva Frio", 3); add("Oliva Quente", 3); }

    // Q9
    if (ans.q9 === "A") { addList(allWinters, 1); addList(allSummers, 1); }
    if (ans.q9 === "B") { add("Oliva Quente", 2); }
    if (ans.q9 === "C") { add("Oliva Frio", 3); }
    if (ans.q9 === "D") { addList(groupWarm, 3); }
    if (ans.q9 === "E") { addList(allSummers, 1); add("Inverno Brilhante", 1); }

    // Q10
    if (ans.q10 === "A") { addList(allWinters, 3); addList(allSummers, 3); }
    if (ans.q10 === "B") { addList(allAutumns, 3); add("Primavera Quente", 3); add("Primavera Clara", 3); add("Primavera Brilhante", 3); }
    if (ans.q10 === "C") { add("Oliva Quente", 3); }
    if (ans.q10 === "D") { add("Oliva Frio", 3); }

    // Q11
    if (ans.q11 === "A") { add("Oliva Quente", 3); add("Oliva Frio", 3); }
    if (ans.q11 === "C") { addList(allSummers, 4); addList(allWinters, 4); }
    if (ans.q11 === "D") { add("Primavera Quente", 4); add("Primavera Clara", 4); add("Primavera Brilhante", 4); addList(allAutumns, 4); }
    if (ans.q11 === "E") { addList(allSummers, 4); addList(allAutumns, 4); }

    const families = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    Object.keys(s).forEach(k => {
        if (k.includes("Primavera")) families.spring += s[k];
        if (k.includes("Verao") || k.includes("Verão")) families.summer += s[k];
        if (k.includes("Outono") || k === "Oliva Quente") families.autumn += s[k];
        if (k.includes("Inverno") || k === "Oliva Frio") families.winter += s[k];
    });

    let maxF = -1, bestGroup = "winter";
    for (const [fam, val] of Object.entries(families)) {
        if (val > maxF) { maxF = val; bestGroup = fam; }
    }

    // Apply Frame modifications
    const group = bestGroup;
    const frame = ans.frame; // D or A

    if (group === "spring") {
        if (frame === "A") s["Primavera Clara"] += 3;
        if (frame === "B") s["Primavera Quente"] += 3;
        if (frame === "C") s["Primavera Brilhante"] += 3;
        if (frame === "D") { s["Oliva Quente"] += 3; s["Primavera Quente"] += 1; }
    } else if (group === "summer") {
        if (frame === "A") s["Verão Claro"] += 3;
        if (frame === "B") s["Verão Suave"] += 3;
        if (frame === "C") s["Verão Frio"] += 3;
    } else if (group === "autumn") {
        if (frame === "A") s["Outono Suave"] += 3;
        if (frame === "B") s["Outono Quente"] += 3;
        if (frame === "C") s["Outono Profundo"] += 3;
        if (frame === "D") { s["Oliva Quente"] += 3; s["Outono Quente"] += 1; }
    } else if (group === "winter") {
        if (frame === "A") s["Inverno Brilhante"] += 3;
        if (frame === "B") s["Inverno Frio"] += 3;
        if (frame === "C") s["Inverno Profundo"] += 3;
        if (frame === "D") { s["Oliva Frio"] += 3; s["Inverno Frio"] += 1; }
    }

    // Find winner
    let maxScore = -1;
    let winner = "";
    for (const p of PALETTES) {
        if (s[p] > maxScore) { maxScore = s[p]; winner = p; }
    }

    return { group, winner, scores: s };
}

const ans1 = {
    q1: "B", q2: "B", q3: "A", q4: "C", q5: "B", q6: "A", q7: "C", q8: "A", q9: "B", q10: "B", q11: "A", q12: "B", frame: "D"
};

const ans2 = {
    q1: "B", q2: "B", q3: "B", q4: "C", q5: "B", q6: "A", q7: "B", q8: "A", q9: "D", q10: "B", q11: "B", q12: "B", frame: "A"
};

console.log("=== ANS 1 ===");
console.log(calculateScore(ans1));

console.log("=== ANS 2 ===");
console.log(calculateScore(ans2));

