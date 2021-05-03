import { Agent, Command, AGENTS } from './agents';

export default (agent: Agent, command: Command, args: string[] = []) => {
   if (!(agent in AGENTS)) throw new Error(`Unsupported agent "${agent}"`);

   const agentCommandObj = AGENTS[agent][command];
   const agentCommand = agentCommandObj['cmd' as keyof typeof agentCommandObj];

   if (typeof agentCommand === 'function') return agentCommand(args);

   if (!agentCommand) {
      console.log(`Command "${command}" is not support by agent "${agent}"`);
      process.exit(1);
   }
   return agentCommand.replace('{0}', args.join(' ')).trim();
};
