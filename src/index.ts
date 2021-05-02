import './utils/info';
import { program } from 'commander';
import updateNotifier from 'update-notifier';
import { name, version } from '../package.json';
import parseOptions from './utils/parseOptions';

import install, { InstallOptions } from './commands/install';
import remove, { RemoveOptions } from './commands/remove';
import list, { ListOptions } from './commands/list';
import update, { UpdateOptions } from './commands/update';
import frozen from './commands/frozen';
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
program
   .command('i [packages...]')
   .option('-d, -D', 'devDependency', false)
   .option('-p, -P', 'peerDependency', false)
   .option('-o, -O', 'optionalDependency', false)
   .option('-e, -E', 'exact', false)
   .option('-g', 'global', false)
   .description('test command')
   .action((packages: string[], options: InstallOptions) => {
      install(packages, parseOptions(options));
   });
program
   .command('run')
   .arguments('[cmd] [args...]')
   .description('run main command')
   .allowUnknownOption()
   .action((cmd: string, args: string[]) => {
      run(cmd, args);
   });
program
   .command('ci [args...]')
   .description('clean install')
   .action((args: string[]) => frozen(args));
program
   .command('r <packages...>')
   .option('-g', 'global', false)
   .description('remove command')
   .action((packages: string[], options: RemoveOptions) => {
      remove(packages, parseOptions(options));
   });
program
   .command('list  [args...]')
   .option('-g', 'global', false)
   .description('list command')
   .action((args: string[], options: ListOptions) => {
      list(args, parseOptions(options));
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
   .command('default', { isDefault: true })
   .arguments('[cmd] [args...]')
   .description('run default command')
   .allowUnknownOption()
   .action((cmd: string, args: string[]) => {
      if (!cmd) return;
      run(cmd, args);
   });

///help///
program.parse();
if (!program.args.length) install([], []);
