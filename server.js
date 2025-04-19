require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5500', // Update with your frontend origin
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

// Working video URL example
const SAMPLE_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

app.post('/api/generate', (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Validate input
        if (!prompt || prompt.length > 1000) {
            return res.status(400).json({ error: 'Invalid prompt' });
        }

        // Simulate successful response with working video URL
        res.json({
            success: true,
            videoUrl: SAMPLE_VIDEO_URL,
            metadata: {
                prompt,
                duration: '30s',
                resolution: '1080p',
                generatedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
