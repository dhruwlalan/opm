import { program } from 'commander';
import updateNotifier from 'update-notifier';
import { name, version } from '../package.json';
import parseOptions from './utils/parseOptions';

import outdated, { OutdatedOptions } from './commands/outdated';
import install, { InstallOptions } from './commands/install';
import update, { UpdateOptions } from './commands/update';
import remove, { RemoveOptions } from './commands/remove';
import list, { ListOptions } from './commands/list';
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
   .action((options: ListOptions) => list(parseOptions(options)));
//#next#//
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
program
   .command('run')
   .arguments('[script] [args...]')
   .description('run scripts')
   .allowUnknownOption()
   .action((script: string, args: string[]) => run(script, args));
program
   .command('r <packages...>')
   .option('-g', 'global', false)
   .description('remove command')
   .action((packages: string[], options: RemoveOptions) => {
      remove(packages, parseOptions(options));
   });
program
   .command('update  [packages...]')
   .option('-l', 'latest', false)
   .option('-g', 'global', false)
   .description('update command')
   .action((packages: string[], options: UpdateOptions) => {
      update(packages, parseOptions(options));
   });
program
   .command('outdated  [packages...]')
   .option('-g', 'global', false)
   .description('outdated command')
   .action((packages: string[], options: OutdatedOptions) => {
      outdated(packages, parseOptions(options));
   });
program
   .command('audit [args...]')
   .description('audit command')
   .action((args: string[]) => {
      audit(args);
   });
program
   .command('default', { isDefault: true })
   .arguments('[cmd] [args...]')
   .description('run default command')
   .allowUnknownOption()
   .action((cmd: string, args: string[]) => {
      if (!cmd) return;
      run(cmd, args);
   });

///no command///
program.parse();
if (!program.args.length) install([], []);
