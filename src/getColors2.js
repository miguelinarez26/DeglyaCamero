const https = require('https');
https.get('https://wellness-bliss.cmsmasters.studio/light/', (res) => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
        let regex = /--e-global-color-[^:]+:\s*(#[a-fA-F0-9]+);/g;
        let match;
        const colors = new Set();
        while (match = regex.exec(raw)) {
            colors.add(match[1]);
        }
        console.log("Global Variables in inline CSS:", Array.from(colors));

        let bgRegex = /background-color:\s*(#[a-fA-F0-9]+);/g;
        while (match = bgRegex.exec(raw)) {
            colors.add(match[1]);
        }
        console.log("All Background Hexes found:", Array.from(colors));
    });
});
