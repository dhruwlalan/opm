import { Agent, Command, AGENTS } from './agents';
import { log } from '../utils/clogs';

export default (agent: Agent, command: Command, args: string[] = []) => {
   if (!(agent in AGENTS)) log.erOut(`Unsupported agent "${agent}"`);

   const agentCommandObj = AGENTS[agent][command];
   const agentCommand = agentCommandObj['cmd' as keyof typeof agentCommandObj];

   if (typeof agentCommand === 'function') return agentCommand(args);

   if (!agentCommand)
      log.erOut(`Command "${command}" is not support by agent "${agent}"`);

   return agentCommand.replace('{0}', args.join(' ')).trim();
};
