import prompts from 'prompts';
import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import getPackageJson from '../utils/getPackageJson';
import execute from '../utils/execute';

export default async (cmd: string, args: string[]) => {
   try {
      const agent = await getAgent();
      if (!agent) process.exit(0);

      const onlyRun = !cmd;
      const ifPresentIndex = args.findIndex((o) => o === '--if-present');
      const ifPresent = ifPresentIndex !== -1;
      if (ifPresent) args.splice(ifPresentIndex, 1);

      if (ifPresent || onlyRun) {
         const scripts = getPackageJson().scripts || {};
         const names = Object.keys(scripts);
         const namesDesc = Object.entries(scripts) as [string, string][];
         if (!names.length) process.exit(0);

         if (onlyRun) {
            const { script } = await prompts({
               name: 'script',
               message: 'script to run',
               type: 'select',
               choices: namesDesc.map(([value, description]) => ({
                  title: value,
                  value,
                  description,
               })),
            });
            if (!script) return;
            cmd = script;
         }

         if (ifPresent && !names.includes(cmd)) process.exit(0);
      }

      const command = getCommand(agent, 'run', [cmd, ...args]);
      await execute(command);
   } catch (error) {
      process.exit(1);
   }
};
