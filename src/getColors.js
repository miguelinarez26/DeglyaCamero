const https = require('https');

https.get('https://wellness-bliss.cmsmasters.studio/light/', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const cssFiles = [];
        const regex = /href="([^"]+\.css[^"]*)"/g;
        let match;
        while ((match = regex.exec(rawData)) !== null) {
            cssFiles.push(match[1]);
        }
        console.log("CSS FILES:", cssFiles.filter(f => f.includes('elementor') || f.includes('theme')));
    });
});
