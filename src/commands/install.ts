import execa from 'execa';
import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import resolveOptions from '../utils/resolveOptions';

export interface InstallOptions {
   D: boolean;
   P: boolean;
   O: boolean;
   E: boolean;
}

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();
   if (!agent) process.exit(0);

   if (packages.length === 0 && options.length === 0) {
      const command = getCommand(agent, 'install', []);
      await execa.command(command, { stdio: 'inherit' });
      process.exit(0);
   }

   const resolvedOptions = resolveOptions(agent, 'add', options);
   const command = getCommand(agent, 'add', [...resolvedOptions, ...packages]);
   console.log(command);

   // await execa.command(command, { stdio: 'inherit' });
   process.exit(0);
};
