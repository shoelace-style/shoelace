interface IncludeFile {
  ok: boolean;
  status: number;
  html: string;
}

const includeFiles = new Map<string, Promise<IncludeFile>>();

export const requestInclude = async (src: string, mode: 'cors' | 'no-cors' | 'same-origin' = 'cors') => {
  if (includeFiles.has(src)) {
    return includeFiles.get(src);
  } else {
    const request = fetch(src, { mode: mode }).then(async response => {
      return {
        ok: response.ok,
        status: response.status,
        html: await response.text()
      };
    });
    includeFiles.set(src, request);
    return request;
  }
};
