import * as fs from 'fs';

const archivo = 'datos.txt';
const datos = fs.readFileSync(archivo, 'utf-8');