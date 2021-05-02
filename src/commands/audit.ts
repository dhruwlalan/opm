import execa from 'execa';
import getAgent from '../main/getAgent';

export default async (args: string[]) => {
   try {
      const hasFix = args.includes('fix');

      if (hasFix && args.length > 1) throw new Error('invalid arguments');

      const agent = await getAgent();
      if (!agent) process.exit(0);

      if (!hasFix) {
         const command = `${agent} audit`;
         // console.log(command);
         await execa.command(command, { stdio: 'inherit' });
         process.exit(0);
      }

      if (hasFix && agent !== 'npm')
         throw new Error(`${agent} dose not contain fix command`);

      const command = 'npm audit fix';
      // console.log(command);
      await execa.command(command, { stdio: 'inherit' });

      process.exit(0);
   } catch (error) {
      console.log('ERROR:', error.message);
      process.exit(1);
   }
};
