import fs from "fs";
import chalk from "chalk";
import theme from "../../yama.config.json" assert { type: "json" };

const convert6DHexToModernRGB = (hex) => {
    if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
    }
    if (hex.length > 6) {
        return;
    }
    let aRgbHex = hex.match(/.{1,2}/g);
    let aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];
    return aRgb.toString().replaceAll(",", " ");
};

const createVars = (object, keyFormat) => {
    let css = `${keyFormat} {\n`

    for (const [key, value] of Object.entries(object)) {
        css += `  --yama-${key}: ${convert6DHexToModernRGB(value)};\n`;
    }

    css += "}";

    return css;
}

const css = [
    createVars(theme.extra.variables.light, ":root"),
    createVars(theme.extra.variables.dark, '[data-theme="dark"]')
].join('\n\n');

const writeVars = () => {
    const filePath = "./src/styles/_vars.css";

    try {
        fs.writeFileSync(filePath, css);
        console.log(chalk.bgCyan(`\nGenerated CSS from yama.config.json at ${filePath}`));
    } catch (err) {
        console.log(chalk.bgRed("Error writing theme CSS file!"));
        throw err;
    }
}

export default function() {
    return {
        name:"astro-yama",
        hooks: {
            "astro:config:done": () => {
                writeVars()
            }
        }
    }
}