import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import execute from '../utils/execute';

export default async () => {
   const agent = await getAgent();

   const command = getCommand(agent, 'frozen');

   await execute(command);
};
