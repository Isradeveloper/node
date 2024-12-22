import fs from 'fs/promises';
import { yarg } from './config/plugins/args.plugin';

const { b: number, l: maxNumber, s: show } = yarg;

const headerMessage = `
=====================================================================
========================  Tabla del ${number}  ==============================
=====================================================================
`;

let outputMessage = headerMessage;

for (let index = 1; index <= maxNumber; index++) {
  outputMessage += `${number} x ${index} = ${number * index}\n`;
}

const outputPath = 'outputs/';

fs.mkdir(outputPath, { recursive: true });
fs.writeFile(`${outputPath}tabla-${number}.txt`, outputMessage, 'utf-8')
  .then(() => {
    console.log(`Tabla del ${number} generada`);

    if (show) {
      console.log(outputMessage);
    }
  })
  .catch((error) => {
    console.error(`Error al generar la tabla del ${number}`, error);
  });
