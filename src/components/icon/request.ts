const cache = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

export const requestIcon = (url: string) => {
  let req = requests.get(url);

  if (!req) {
    req = fetch(url)
      .then(async res => {
        if (res.ok) {
          const svg = await res.text();
          cache.set(url, svg);
          return svg;
        } else {
          cache.set(url, '');
          return '';
        }
      })
      .catch(() => {
        cache.set(url, '');
      });

    requests.set(url, req);
  }

  return req;
};
