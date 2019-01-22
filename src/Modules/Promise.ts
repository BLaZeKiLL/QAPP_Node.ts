import * as fs from 'fs';
import { promisify } from 'util';

export const fs_writeFile = promisify(fs.writeFile);
export const fs_readFile = promisify(fs.readFile);
