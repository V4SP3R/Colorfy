export default function handler(req, res) {
    try {
        const envCheck = process.env.GEMINI_API_KEY ? "Set" : "Missing";
        res.status(200).json({
            status: "Ok",
            message: "API is working",
            env_check: envCheck,
            node_version: process.version
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
