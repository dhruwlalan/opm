import { Agent, Command, AGENTS } from './agents';

export default (agent: Agent, command: Command, args: string[] = []) => {
   if (!(agent in AGENTS)) throw new Error(`Unsupported agent "${agent}"`);

   const com = AGENTS[agent][command];
   const c = com['cmd' as keyof typeof com];

   if (typeof c === 'function') return c(args);

   if (!c) {
      throw new Error(
         `Command "${command}" is not support by agent "${agent}"`,
      );
   }
   return c.replace('{0}', args.join(' ')).trim();
};
