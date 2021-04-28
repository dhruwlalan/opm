import { Agent, AGENTS, Command } from '../main/agents';

export default (
   agent: Agent,
   command: Command,
   options: string[],
): string[] => {
   return options.map((o) => {
      const agentCommand = AGENTS[agent][command];
      const agentOptions = agentCommand['options' as keyof typeof agentCommand];
      return agentOptions[o as keyof typeof agentOptions];
   });
};
