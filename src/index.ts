import { program } from 'commander';
import updateNotifier from 'update-notifier';

import { name, version } from '../package.json';

///version///
updateNotifier({
   pkg: {
      name,
      version,
   },
   updateCheckInterval: 1000 * 60 * 60 * 24,
}).notify({
   isGlobal: true,
});
program.name('opm').usage('[option] [command]');
program.version(`${version}`, '-v, --version', 'output the current version');

///commands///
program
   .command('hello')
   .description('test command')
   .action(() => console.log('hello'));

///help///
program.parse(process.argv);
if (!program.args.length) program.help();
