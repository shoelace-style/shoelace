interface IncludeFile {
  ok: boolean;
  status: number;
  html: string;
}

const includeFiles = new Map<string, Promise<IncludeFile>>();

/** Fetches an include file from a remote source. Caching is enabled so the origin is only pinged once. */
export function requestInclude(src: string, mode: 'cors' | 'no-cors' | 'same-origin' = 'cors'): Promise<IncludeFile> {
  if (includeFiles.has(src)) {
    return includeFiles.get(src)!;
  }
  const fileDataPromise = fetch(src, { mode: mode }).then(async response => {
    return {
      ok: response.ok,
      status: response.status,
      html: await response.text()
    };
  });
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}
