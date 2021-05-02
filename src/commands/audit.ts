import getAgent from '../main/getAgent';
import execute from '../utils/execute';

export default async (fix: string) => {
   if (fix && fix !== 'fix') {
      console.log(`invalid argument '${fix}'`);
      process.exit(0);
   }

   const agent = await getAgent();

   if (!fix) await execute(`${agent} audit`);

   if (fix && agent !== 'npm') {
      console.log(`${agent} dose not contain fix command`);
      process.exit(0);
   }

   await execute('npm audit fix');
};
