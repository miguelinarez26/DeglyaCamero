const https = require('https');
const fs = require('fs');

https.get('https://wellness-bliss.cmsmasters.studio/light/', (res) => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
        let colors = new Set();
        let bgRegex = /(background-color|background|color):\s*(#[a-fA-F0-9]{6})/gi;
        let match;
        while ((match = bgRegex.exec(raw))) {
            colors.add(match[2].toLowerCase());
        }
        let cssVars = /(#[a-fA-F0-9]{6})/gi;
        while ((match = cssVars.exec(raw))) {
            colors.add(match[1].toLowerCase());
        }
        fs.writeFileSync('c:/Users/Personal/Documents/MundoCarMi/Deglyacamero/colors_dump.txt', Array.from(colors).join('\n'));
        console.log("Done");
    });
});
