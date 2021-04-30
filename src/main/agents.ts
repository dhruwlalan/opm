const npmRun = (agent: string) => (args: string[]) => {
   if (args.length > 1)
      return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`;
   else return `${agent} run ${args[0]}`;
};

export const AGENTS = {
   npm: {
      install: 'npm install',
      run: npmRun('npm'),
   },
   yarn: {
      install: 'yarn install',
      run: 'yarn run {0}',
   },
   pnpm: {
      install: 'pnpm install',
      run: npmRun('pnpm'),
   },
};

// export const AGENTS = {
//    npm: {
//       run: npmRun('npm'),
//       install: 'npm install',
//       add: 'npm install {0}',
//       update: 'npm update {0}',
//       remove: 'npm r {0}',
//       audit: 'npm audit {0}',
//       outdated: 'npm outdated {0}',
//       frozen: 'npm ci',
//    },
//    yarn: {
//       run: 'yarn run {0}',
//       install: 'yarn install',
//       add: 'yarn add {0}',
//       update: 'yarn upgrade {0}',
//       remove: 'yarn remove {0}',
//       audit: 'yarn audit',
//       outdated: 'yarn outdated',
//       frozen: 'yarn install --frozen-lockfile',
//    },
//    pnpm: {
//       run: npmRun('pnpm'),
//       install: 'pnpm install',
//       add: 'pnpm add {0}',
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

export const LOCKS: Record<string, Agent> = {
   'pnpm-lock.yaml': 'pnpm',
   'yarn.lock': 'yarn',
   'package-lock.json': 'npm',
};
