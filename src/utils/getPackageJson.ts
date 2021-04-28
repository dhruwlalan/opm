import { resolve } from 'path';
import fs from 'fs';
import { log } from './clogs';

export default (): any => {
   const path = resolve(process.cwd(), 'package.json');

   if (fs.existsSync(path)) {
      try {
         const raw = fs.readFileSync(path, 'utf-8');
         const data = JSON.parse(raw);
         return data;
      } catch (e) {
         log.out('Failed to parse package.json');
      }
   }
};
