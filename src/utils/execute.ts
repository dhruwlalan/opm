import execa from 'execa';

export default async (command: string, debug = true): Promise<never> => {
   try {
      if (debug) {
         console.log(command);
      } else {
         await execa.command(command, { stdio: 'inherit' });
      }
      process.exit(0);
   } catch (error) {
      console.log('ERROR:', error.message);
      process.exit(1);
   }
};

export const run = async (command: string, debug = true): Promise<void> => {
   try {
      if (debug) {
         console.log(command);
      } else {
         await execa.command(command, { stdio: 'inherit' });
      }
   } catch (error) {
      console.log('ERROR:', error.message);
      process.exit(1);
   }
};
