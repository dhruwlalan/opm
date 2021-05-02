import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import execute from '../utils/execute';

export interface OutdatedOptions {
   g: boolean;
}

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();
   if (!agent) process.exit(0);

   if (options.includes('-g')) {
      const command = `npm outdated -g ${packages.join(' ')}`;
      await execute(command);
   }

   const command = getCommand(agent, 'outdated', packages);
   await execute(command);
};
