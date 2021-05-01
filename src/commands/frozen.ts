import execa from 'execa';
import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';

export default async (args: string[]) => {
   try {
      if (args.length !== 0) throw new Error('no arguments expected');

      const agent = await getAgent();
      if (!agent) process.exit(0);

      const command = getCommand(agent, 'frozen', []);
      // console.log(command);
      await execa.command(command, { stdio: 'inherit' });

      process.exit(0);
   } catch (error) {
      console.log('error:', error.message);
      process.exit(1);
   }
};
