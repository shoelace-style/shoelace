interface IncludeFile {
  ok: boolean;
  status: number;
  html: string;
}

const includeFiles = new Map<string, IncludeFile | Promise<IncludeFile>>();

/** Fetches an include file from a remote source. Caching is enabled so the origin is only pinged once. */
export function requestInclude(src: string, mode: 'cors' | 'no-cors' | 'same-origin' = 'cors'): Promise<IncludeFile> {
  const prev = includeFiles.get(src);
  if (prev !== undefined) {
    // Promise.resolve() transparently unboxes prev if it was a promise.
    return Promise.resolve(prev);
  }
  const fileDataPromise = fetch(src, { mode: mode }).then(async response => {
    const res = {
      ok: response.ok,
      status: response.status,
      html: await response.text()
    };
    // Replace the cached promise with its result to avoid having buggy browser Promises retain memory as mentioned in #1284 and #1249
    includeFiles.set(src, res);
    return res;
  });
  // Cache the promise to only fetch() once per src
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}
