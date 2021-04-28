import getAgent from '../main/getAgent';
import execute from '../utils/execute';
import { log } from '../utils/clogs';

export default async (fix: string) => {
   if (fix && fix !== 'fix') log.erOut(`invalid argument '${fix}'`);

   const agent = await getAgent();

   if (!fix) await execute(`${agent} audit`);

   if (fix && agent !== 'npm')
      log.out(`${agent} dose not contain fix command.`);

   await execute('npm audit fix');
};
