import path from 'path';
import execa from 'execa';
import findUp from 'find-up';
import prompts from 'prompts';

import { LOCKS, agents, Agent } from './agents';
import cmdExists from '../utils/cmdExists';

export default async (): Promise<Agent> => {
   const result = await findUp(Object.keys(LOCKS));
   let agent = result ? LOCKS[path.basename(result)] : null;
   let chosen = false;

   if (!agent) {
      agent = (
         await prompts({
            name: 'agent',
            type: 'select',
            message: 'Choose the agent',
            choices: agents.map((value) => ({ title: value, value })),
         })
      ).agent;
      if (!agent) process.exit(0);
      chosen = true;
   }

   if (agent && !cmdExists(agent)) {
      if (chosen) {
         console.warn(`${agent} doesn't seem to be installed.\n`);
      } else {
         console.warn(
            `Detected ${agent} but it doesn't seem to be installed.\n`,
         );
      }

      const { tryInstall } = await prompts({
         name: 'tryInstall',
         type: 'confirm',
         message: `Would you like to globally install ${agent}?`,
         initial: 1,
      });
      if (!tryInstall) process.exit(1);

      await execa.command(`npm i -g ${agent}`, { stdio: 'inherit' });
   }

   if (!agent) process.exit(0);

   return agent;
};
