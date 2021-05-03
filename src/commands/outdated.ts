import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import execute from '../utils/execute';

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();

   if (options.includes('-g'))
      await execute(`npm outdated -g ${packages.join(' ')}`);

   await execute(getCommand(agent, 'outdated', packages));
};
