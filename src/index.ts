import './utils/info';
import { program } from 'commander';
import updateNotifier from 'update-notifier';

import { name, version } from '../package.json';
import install, { InstallOptions } from './commands/install';

///version///
updateNotifier({
   pkg: {
      name,
      version,
   },
   updateCheckInterval: 1000 * 60 * 60 * 24,
}).notify({ isGlobal: true });
program.name('opm');
program.usage('[command] [option]');
program.version(`${version}`, '-v, --version', 'output the current version');

///commands///
program
   .command('i [packages...]')
   .option('-d, -D', 'dev', false)
   .description('test command')
   .action((packages: string[], options: InstallOptions) => {
      install(packages, options);
   });
program
   .command('default', { isDefault: true })
   .arguments('[cmd] [args...]')
   .description('run default command')
   .allowUnknownOption()
   .action((cmd, args) => {
      if (!cmd) return;

      console.log(cmd);
      console.log(args);
   });

///help///
program.parse();
if (!program.args.length) install();
