import prompts from 'prompts';
import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import getPackageJson from '../utils/getPackageJson';
import execute from '../utils/execute';

export default async (cmd: string, args: string[]) => {
   const agent = await getAgent();

   const noCmd = !cmd;

   const ifPresentIndex = args.findIndex((o) => o === '--if-present');
   const ifPresent = ifPresentIndex !== -1;
   if (ifPresent) args.splice(ifPresentIndex, 1);

   if (ifPresent || noCmd) {
      const scripts = getPackageJson().scripts || {};
      const names = Object.keys(scripts);

      if (names.length === 0) {
         console.log('no scripts detected!');
         process.exit(0);
      }

      const namesDesc = Object.entries(scripts) as [string, string][];

      if (noCmd) {
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
         if (!script) process.exit(0);
         cmd = script;
      }

      if (ifPresent && !names.includes(cmd)) process.exit(0);
   }

   const command = getCommand(agent, 'run', [cmd, ...args]);
   await execute(command);
};
