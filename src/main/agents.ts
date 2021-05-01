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

// export const AGENTS = {
//    npm: {
//       update: 'npm update {0}',
//       remove: 'npm r {0}',
//       audit: 'npm audit {0}',
//       outdated: 'npm outdated {0}',
//       frozen: 'npm ci',
//    },
//    yarn: {
//       update: 'yarn upgrade {0}',
//       remove: 'yarn remove {0}',
//       audit: 'yarn audit',
//       outdated: 'yarn outdated',
//       frozen: 'yarn install --frozen-lockfile',
//    },
//    pnpm: {
//       update: 'pnpm update {0}',
//       remove: 'pnpm remove {0}',
//       audit: 'pnpm audit',
//       outdated: 'pnpm outdated',
//       frozen: 'pnpm install --frozen-lockfile',
//    },
// };

export type Agent = keyof typeof AGENTS;
export type Command = keyof typeof AGENTS.npm;
export const agents = Object.keys(AGENTS) as Agent[];
