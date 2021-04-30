import execa from 'execa';
import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';

export interface InstallOptions {
   D: boolean;
}

export default async (packages?: string[], options?: InstallOptions) => {
   const agent = await getAgent();

   if (!packages && !options) {
      if (!agent) process.exit(0);
      const command = getCommand(agent, 'install', []);
      await execa.command(command, { stdio: 'inherit' });
      process.exit(0);
   }

   console.log('install command');
   console.log(packages);
   console.log(options);
   process.exit(0);
};
