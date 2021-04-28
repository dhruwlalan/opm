import execa from 'execa';
import { log } from '../utils/clogs';

export default async (command: string, debug = false): Promise<never> => {
   try {
      if (debug) {
         console.log(command);
      } else {
         await execa.command(command, { stdio: 'inherit' });
      }
      process.exit(0);
   } catch (error) {
      log.erOut(error.message);
      process.exit(1);
   }
};

export const run = async (command: string, debug = false): Promise<void> => {
   try {
      if (debug) {
         console.log(command);
      } else {
         await execa.command(command, { stdio: 'inherit' });
      }
   } catch (error) {
      log.erOut(error.message);
   }
};
