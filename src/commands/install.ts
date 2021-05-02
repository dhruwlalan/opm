import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import resolveOptions from '../utils/resolveOptions';
import execute from '../utils/execute';

export interface InstallOptions {
   D: boolean;
   P: boolean;
   O: boolean;
   E: boolean;
   g: boolean;
}

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();

   if (packages.length === 0 && options.length === 0) {
      await execute(`${agent} install`);
   }

   if (options.includes('-g')) {
      const command = getCommand('npm', 'add', ['-g', ...packages]);
      await execute(command);
   }

   const resolvedOptions = resolveOptions(agent, 'add', options);
   const command = getCommand(agent, 'add', [...resolvedOptions, ...packages]);
   await execute(command);
};
