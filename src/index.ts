import { program } from 'commander';
import updateNotifier from 'update-notifier';
import { name, version } from '../package.json';
import parseOptions from './utils/parseOptions';

import install, { InstallOptions } from './commands/install';
import outdated from './commands/outdated';
import update from './commands/update';
import remove from './commands/remove';
import list from './commands/list';
import frozen from './commands/frozen';
import audit from './commands/audit';
import run from './commands/run';

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
//#frozen#//
program
   .command('ci')
   .description('clean install')
   .allowExcessArguments(false)
   .action(frozen);
//#list#//
program
   .command('list')
   .option('-g', 'global', false)
   .description('list dependencies')
   .allowExcessArguments(false)
   .action((options: { g: boolean }) => list(parseOptions(options)));
//#audit#//
program
   .command('audit [fix]')
   .description('audit command')
   .allowExcessArguments(false)
   .action((fix: string) => audit(fix));
//#install#//
program
   .command('i [packages...]')
   .option('-d, -D', 'devDependency', false)
   .option('-p, -P', 'peerDependency', false)
   .option('-o, -O', 'optionalDependency', false)
   .option('-e, -E', 'exact', false)
   .option('-g', 'global', false)
   .description('install packages')
   .action((packages: string[], options: InstallOptions) => {
      const parsedOptions = parseOptions(options, true);
      install(packages, parsedOptions);
   });
//#remove#//
program
   .command('r <packages...>')
   .option('-g', 'global', false)
   .description('remove packages')
   .action((packages: string[], options: { g: boolean }) => {
      remove(packages, parseOptions(options));
   });
//#run#//
program
   .command('run [script] [args...]')
   .description('run scripts')
   .allowUnknownOption()
   .action((script: string, args: string[]) => run(script, args));
program
   .command('run [script] [args...]', { isDefault: true })
   .description('run default command')
   .allowUnknownOption()
   .action((script: string, args: string[]) => run(script, args));
//#outdated#//
program
   .command('outdated  [packages...]')
   .option('-g', 'global', false)
   .description('outdated packages')
   .action((packages: string[], options: { g: boolean }) => {
      outdated(packages, parseOptions(options));
   });
//#update#//
program
   .command('update  [packages...]')
   .option('-l', 'latest', false)
   .option('-g', 'global', false)
   .description('update command')
   .action((packages: string[], options: { g: boolean; l: boolean }) => {
      update(packages, parseOptions(options));
   });
///empty command///
program.parse();
if (!program.args.length) install([], []);
