import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import execute from '../utils/execute';

export default async (packages: string[], options: string[]) => {
   if (options.includes('-g'))
      await execute(`npm outdated -g ${packages.join(' ')}`);

   const agent = await getAgent();

   await execute(getCommand(agent, 'outdated', packages));
};
