// import execa from 'execa';
import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';

export interface OutdatedOptions {
   g: boolean;
}

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();
   if (!agent) process.exit(0);

   if (options.includes('-g')) {
      const command = `npm outdated -g ${packages.join(' ')}`;
      console.log(command);
      // await execa.command(command, { stdio: 'inherit' });
      process.exit(0);
   }

   const command = getCommand(agent, 'outdated', packages);
   console.log(command);
   // await execa.command(command, { stdio: 'inherit' });
   process.exit(0);
};
