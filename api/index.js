const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Proxy endpoint untuk semua request API
app.all('/proxy/:category/:action', async (req, res) => {
  try {
    const { category, action } = req.params;
    const query = req.query;
    let targetUrl = '';

    // Mapping endpoint
    const endpoints = {
      'stalk/tiktok': `https://api.siputzx.my.id/api/stalk/tiktok?username=${query.username || 'nejeoyn'}`,
      'stalk/instagram': `https://api.siputzx.my.id/api/stalk/instagram?username=${query.username || 'ambatukam'}`,
      'stalk/threads': `https://api.siputzx.my.id/api/stalk/threads?q=${query.q || 'ambatukam'}`,
      'stalk/youtube': `https://api.siputzx.my.id/api/stalk/youtube?username=${query.username || 'Windah Basudara'}`,
      'stalk/twitter': `https://api.siputzx.my.id/api/stalk/twitter?user=${query.user || 'ambatukam'}`,
      'stalk/pinterest': `https://api.siputzx.my.id/api/stalk/pinterest?q=${query.q || 'dimas'}`,
      'search/youtube': `https://api.siputzx.my.id/api/s/youtube?query=${query.query || 'Windah Basudara'}`,
      'search/spotify': `https://api.siputzx.my.id/api/s/spotify?query=${query.query || 'serana'}`,
      'search/mangatoon': `https://api.siputzx.my.id/api/s/mangatoon?query=${query.query || 'Chainsawman'}`,
      'search/seegore': `https://https://api.siputzx.my.id/api/s/seegore?query=${query.query || 'train'}`,
      'search/applemusic': `https://api.siputzx.my.id/api/s/applemusic?query=${query.query || 'duka'}&region=${query.region || 'id'}`,
      'search/resep': `https://api.siputzx.my.id/api/s/resep?query=${query.query || 'nasi goreng'}`,
      'search/lahelu': `https://api.siputzx.my.id/api/s/lahelu?query=${query.query || 'meme upin ipin'}`,
      'search/duckduckgo': `https://api.siputzx.my.id/api/s/duckduckgo?query=${query.query || 'openai'}&kl=us-en&df=w`,
      'downloader/instagram': `https://api.siputzx.my.id/api/d/igdl?url=${query.url}`,
      'downloader/tiktok': `https://api.siputzx.my.id/api/d/tiktok?url=${query.url}`,
      'downloader/tiktokv2': `https://api.siputzx.my.id/api/d/tiktok/v2?url=${query.url}`,
      'downloader/facebook': `https://api.siputzx.my.id/api/d/facebook?url=${query.url}`,
      'downloader/spotifyv2': `https://api.siputzx.my.id/api/d/spotifyv2?url=${query.url}`,
      'downloader/igfastdl': `https://api.siputzx.my.id/api/d/fastdl?url=${query.url}`,
      'downloader/twitter': `https://api.siputzx.my.id/api/d/twitter?url=${query.url}`,
      'downloader/pinterest': `https://api.siputzx.my.id/api/d/pinterest?url=${query.url}`
    };

    const key = `${category}/${action}`;
    targetUrl = endpoints[key];

    if (!targetUrl) {
      return res.status(404).json({ error: 'Endpoint tidak ditemukan' });
    }

    const response = await axios.get(targetUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
