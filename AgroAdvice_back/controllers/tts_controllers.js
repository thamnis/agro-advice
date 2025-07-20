
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

exports.speak = async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ success: false, message: "Aucun texte fourni." });
    }

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.75
                }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            return res.status(response.status).json({ success: false, message: "Erreur Eleven Labs", detail: error });
        }

        // Retourner le flux audio directement
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'inline; filename="speech.mp3"'
        });

        response.body.pipe(res);
    } catch (err) {
        console.error("Erreur TTS:", err);
        res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
    }
};
