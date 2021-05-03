import { log } from './clogs';

export default <T>(optionsObject: T, single = false): string[] => {
   const optionsArray = Object.keys(optionsObject)
      .filter((o) => !!optionsObject[o as keyof T])
      .map((o) => `-${o}`);

   if (!single) return optionsArray;

   if (optionsArray.length > 1) {
      log.erOut('Invalid Options!');
   }

   return optionsArray;
};
