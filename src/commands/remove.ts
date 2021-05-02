import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import execute from '../utils/execute';

export interface RemoveOptions {
   g: boolean;
}

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();
   if (!agent) process.exit(0);

   if (options.includes('-g')) {
      const command = getCommand('npm', 'remove', ['-g', ...packages]);
      await execute(command);
   }

   const command = getCommand(agent, 'remove', packages);
   await execute(command);
};
