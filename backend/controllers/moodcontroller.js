const { analyzeTextMood } = require('../services/textAnalyzer',path={__dirname});
const { analyzeVoiceMood } = require('../services/voiceAnalyzer',path={__dirname});

// Text-based mood analysis
exports.analyzeText = (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text input is required.' });
    }

    const mood = analyzeTextMood(text);
    res.json({ mood });
};

// Voice-based mood analysis
exports.analyzeVoice = (req, res) => {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ message: 'Voice input is required.' });
    }

    const mood = analyzeVoiceMood(file.buffer);
    res.json({ mood });
};
