const cache = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

export const requestIcon = (url: string) => {
  let req = requests.get(url);

  if (!req) {
    req = fetch(url).then(async res => {
      if (res.ok) {
        const div = document.createElement('div');
        div.innerHTML = await res.text();

        const svg = div.firstElementChild;
        if (svg && svg.tagName.toLowerCase() === 'svg') {
          cache.set(url, div.innerHTML);
          return svg.outerHTML;
        } else {
          return '';
        }
      } else {
        return '';
      }
    });

    requests.set(url, req);
  }

  return req;
};
