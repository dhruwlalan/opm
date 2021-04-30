export default <T>(obj: T): string[] => {
   const opt = Object.keys(obj)
      .filter((o) => !!obj[o as keyof T])
      .map((o) => `-${o}`);
   if (opt.length > 1) {
      console.error('invalid options');
      process.exit(1);
   }
   return opt;
};
