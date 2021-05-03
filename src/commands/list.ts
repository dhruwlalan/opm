import getPackageJson from '../utils/getPackageJson';
import execute from '../utils/execute';

const showDeps = <T>(dependencies: T, type: string) => {
   const deps = Object.keys(dependencies);
   if (!deps.length) process.exit(0);

   console.log(`${type}:`);
   if (deps.length === 1) {
      console.log(`└─ ${deps[0]}: ${dependencies[deps[0] as keyof T]}`);
   } else {
      deps.forEach((d, i) => {
         if (i === deps.length - 1) {
            console.log(`└─ ${d}: ${dependencies[d as keyof T]}`);
         } else {
            console.log(`├─ ${d}: ${dependencies[d as keyof T]}`);
         }
      });
   }
   console.log();
};

export default async (options: string[]) => {
   if (options.includes('-g')) await execute('npm list -g --depth=0');

   const packageJson = getPackageJson();
   const deps = packageJson.dependencies;
   const devDeps = packageJson.devDependencies;
   const optionalDeps = packageJson.optionalDependencies;
   const peerDeps = packageJson.peerDependencies;
   if (deps) showDeps(deps, 'dependencies');
   if (devDeps) showDeps(devDeps, 'devDependencies');
   if (optionalDeps) showDeps(optionalDeps, 'optionalDependencies');
   if (peerDeps) showDeps(peerDeps, 'peerDependencies');

   process.exit(0);
};
