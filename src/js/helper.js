import { TIMEOUT_SECONDS } from './config';

export const getJSON = async function(url) {
   try {
      const res = await Promise.race([
        fetch(url),
        timeout(TIMEOUT_SECONDS),
      ])

      if (!res.ok) return;

      return res.json();
   } catch (err){
      throw err;
   }
}

const timeout = function(s) {
   return new Promise(function(_, reject) {
      setTimeout(function() {
         reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
   });
};