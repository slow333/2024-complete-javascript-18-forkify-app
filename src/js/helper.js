import { TIMEOUT_SECONDS } from './config';

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(uploadData)
      })
      : fetch(url);
    const res = await Promise.race([
      fetchPro, timeout(TIMEOUT_SECONDS)
    ]);
    if (!res.ok) throw new Error(`갯,set 제이슨 에서 발생한 애러 ${res.status}`);
    return res.json();
  } catch (err) {
    throw err;
  }
};
/*

export const getJSON = async function(url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([
      fetchPro, timeout(TIMEOUT_SECONDS)
    ]);
    if (!res.ok) throw new Error(`갯제이슨 에서 발생한 애러 ${res.status}`);
    return res.json();
  } catch (err) {
    throw err;
  }
};

export const setJSON = async function(url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    });

    const res = await Promise.race([
      fetchPro, timeout(TIMEOUT_SECONDS)
    ]);
    if (!res.ok) throw new Error(`샛 제이슨 에서 발생한 애러 ${res.status}`);
    return res.json();
  } catch (err) {
    throw err;
  }
};
*/
