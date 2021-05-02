import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import execute from '../utils/execute';

export default async (args: string[]) => {
   try {
      if (args.length !== 0) throw new Error('no arguments expected');

      const agent = await getAgent();
      if (!agent) process.exit(0);

      const command = getCommand(agent, 'frozen', []);
      await execute(command);
   } catch (error) {
      console.log('error:', error.message);
      process.exit(1);
   }
};
