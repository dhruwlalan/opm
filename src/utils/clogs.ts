export const log = {
   out(output: string): never {
      console.log(output);
      process.exit(0);
   },
   erOut(output: string): never {
      console.error(`error: ${output}`);
      process.exit(1);
   },
};
