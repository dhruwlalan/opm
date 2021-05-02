const npmRun = (agent: string) => (args: string[]) => {
   if (agent === 'yarn' && args.length > 1) {
      return `${agent} run ${args.join(' ')}`;
   } else if (args.length > 1) {
      return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`;
   }
   return `${agent} run ${args[0]}`;
};

export const AGENTS = {
   npm: {
      run: { cmd: npmRun('npm') },
      install: { cmd: 'npm install' },
      frozen: { cmd: 'npm ci' },
      remove: { cmd: 'npm r {0}' },
      update: { cmd: 'npm update {0}' },
      outdated: { cmd: 'npm outdated {0}' },
      audit: { cmd: 'npm audit' },
      add: {
         cmd: 'npm install {0}',
         options: {
            '-D': '--save-dev',
            '-P': '--save-peer',
            '-O': '--save-optional',
            '-E': '--save-exact',
         },
      },
   },
   yarn: {
      run: { cmd: npmRun('yarn') },
      install: { cmd: 'yarn install' },
      frozen: { cmd: 'yarn install --frozen-lockfile' },
      remove: { cmd: 'yarn remove {0}' },
      outdated: { cmd: 'yarn outdated {0}' },
      audit: { cmd: 'yarn audit' },
      update: {
         cmd: 'yarn upgrade {0}',
         options: { '-l': '--latest' },
      },
      add: {
         cmd: 'yarn add {0}',
         options: {
            '-D': '--dev',
            '-P': '--peer',
            '-O': '--optional',
            '-E': '--exact',
         },
      },
   },
   pnpm: {
      run: { cmd: npmRun('pnpm') },
      install: { cmd: 'pnpm install' },
      frozen: { cmd: 'pnpm install --frozen-lockfile' },
      remove: { cmd: 'pnpm remove {0}' },
      outdated: { cmd: 'pnpm outdated {0}' },
      audit: { cmd: 'pnpm audit' },
      update: {
         cmd: 'pnpm update {0}',
         options: { '-l': '--latest' },
      },
      add: {
         cmd: 'pnpm add {0}',
         options: {
            '-D': '--save-dev',
            '-P': '--save-peer',
            '-O': '--save-optional',
            '-E': '--save-exact',
         },
      },
   },
};

export const LOCKS: Record<string, Agent> = {
   'pnpm-lock.yaml': 'pnpm',
   'yarn.lock': 'yarn',
   'package-lock.json': 'npm',
};

export type Agent = keyof typeof AGENTS;
export type Command = keyof typeof AGENTS.npm;
export const agents = Object.keys(AGENTS) as Agent[];
