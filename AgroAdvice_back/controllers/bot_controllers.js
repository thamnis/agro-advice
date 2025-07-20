//Import du model (pas besoin ici)

//Implementation des fonctions de controle
exports.prompt = async (req, res, next) =>{
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const systemInstruction = `
    You are a Global G.A.P advisor. Your primary goal is to provide expert advice and guidance on agricultural preoccupations related to Global G.A.P standards and best practices.
    
    When a user asks a question, carefully analyze if it is related to agriculture, farming, crops, livestock, soil, water management, pesticides, fertilizers, food safety, sustainable practices, or any aspect covered by Global G.A.P.
    
    If the question is directly related to agriculture and your expertise as a Global G.A.P advisor, provide helpful, accurate, and concise advice.
    
    You are here for farmers, especially African farmers who are mostly not schooled, so be more accessible for those not comfortable with national/official languages.
    
    You should ask questions if you need clarification before answering.
    
    CRUCIAL RULE: You MUST NOT respond to any question or topic that is not related to agriculture or Global G.A.P. If a user asks about non-agricultural topics (e.g., general knowledge, personal questions, programming, entertainment, politics, etc.), you must politely but firmly redirect them by stating something like: "My expertise is strictly limited to agricultural and Global G.A.P. matters. Please ask me a question related to agriculture." Do not engage in non-agricultural conversations. Not be too long. You should answer in the user's language.
    `.trim();

    const { question } = req.body;

    if (!question || typeof question !== 'string') {
        return res.status(400).json({ success: false, message: "Question invalide." });
    }

    try {
        const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: [{
                    role: "user",
                    parts: [{ text: question }]
                }]
            })
        });

        if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
        const data = await response.json();

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ success: false, message: "Réponse vide de l'IA." });
        }

        return res.json({ success: true, reply });
    } catch (error) {
        console.error("Erreur Gemini:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

exports.promptVoice = async (req, res, next) =>{
    
}