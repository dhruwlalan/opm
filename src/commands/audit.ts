import getAgent from '../main/getAgent';
import execute from '../utils/execute';

export default async (args: string[]) => {
   try {
      const hasFix = args.includes('fix');

      if (hasFix && args.length > 1) throw new Error('invalid arguments');

      const agent = await getAgent();
      if (!agent) process.exit(0);

      if (!hasFix) {
         const command = `${agent} audit`;
         await execute(command);
      }

      if (hasFix && agent !== 'npm')
         throw new Error(`${agent} dose not contain fix command`);

      const command = 'npm audit fix';
      await execute(command);
   } catch (error) {
      console.log('ERROR:', error.message);
      process.exit(1);
   }
};
