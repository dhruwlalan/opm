import getAgent from '../main/getAgent';
import getCommand from '../main/getCommand';
import getPackageJson from '../utils/getPackageJson';
import resolveOptions from '../utils/resolveOptions';
import execute, { run } from '../utils/execute';

export default async (packages: string[], options: string[]) => {
   const agent = await getAgent();

   if (options.includes('-g')) {
      await execute(`npm update -g ${packages.join(' ')}`);
   }

   if (agent === 'npm') {
      if (!options.includes('-l') && packages.length === 0) {
         await execute('npm update');
      }

      const packageJson = getPackageJson();
      const deps = packageJson.dependencies
         ? Object.keys(packageJson.dependencies)
         : [];
      const devDeps = packageJson.devDependencies
         ? Object.keys(packageJson.devDependencies)
         : [];
      const optionalDeps = packageJson.optionalDependencies
         ? Object.keys(packageJson.optionalDependencies)
         : [];
      const peerDeps = packageJson.peerDependencies
         ? Object.keys(packageJson.peerDependencies)
         : [];

      const depsCmd = ['npm i'];
      const devCmd = ['npm i -D'];
      const optionalCmd = ['npm i -O'];
      const peerCmd = ['npm i --save-peer'];

      if (!options.includes('-l') && packages.length > 0) {
         packages.forEach((p) => {
            if (deps.includes(p)) depsCmd.push(p);
            if (devDeps.includes(p)) devCmd.push(p);
            if (optionalDeps.includes(p)) optionalCmd.push(p);
            if (peerDeps.includes(p)) peerCmd.push(p);
         });
         if (depsCmd.length > 1) await run(depsCmd.join(' '));
         if (devCmd.length > 1) await run(devCmd.join(' '));
         if (optionalCmd.length > 1) await run(optionalCmd.join(' '));
         if (peerCmd.length > 1) await run(peerCmd.join(' '));
         process.exit(0);
      }

      if (options.includes('-l') && packages.length > 0) {
         packages.forEach((p) => {
            if (deps.includes(p)) depsCmd.push(`${p}@latest`);
            if (devDeps.includes(p)) devCmd.push(`${p}@latest`);
            if (optionalDeps.includes(p)) optionalCmd.push(`${p}@latest`);
            if (peerDeps.includes(p)) peerCmd.push(`${p}@latest`);
         });
         if (depsCmd.length > 1) await run(depsCmd.join(' '));
         if (devCmd.length > 1) await run(devCmd.join(' '));
         if (optionalCmd.length > 1) await run(optionalCmd.join(' '));
         if (peerCmd.length > 1) await run(peerCmd.join(' '));
         process.exit(0);
      }

      if (deps.length > 0) {
         const depsL = deps.map((d) => `${d}@latest`);
         const command = [...depsCmd, ...depsL].join(' ');
         await run(command);
      }
      if (devDeps.length > 0) {
         const devDepsL = devDeps.map((d) => `${d}@latest`);
         const command = [...devCmd, ...devDepsL].join(' ');
         await run(command);
      }
      if (optionalDeps.length > 0) {
         const optionalDepsL = optionalDeps.map((d) => `${d}@latest`);
         const command = [...optionalCmd, ...optionalDepsL].join(' ');
         await run(command);
      }
      if (peerDeps.length > 0) {
         const peerDepsL = peerDeps.map((d) => `${d}@latest`);
         const command = [...peerCmd, ...peerDepsL].join(' ');
         await run(command);
      }
      process.exit(0);
   }

   const resolvedOptions = resolveOptions(agent, 'update', options);
   const command = getCommand(agent, 'update', [
      ...packages,
      ...resolvedOptions,
   ]);
   await execute(command);
};
