interface IconFile {
  ok: boolean;
  status: number;
  svg: string;
}

const iconFiles = new Map<string, Promise<IconFile>>();

export const requestIcon = (url: string) => {
  if (iconFiles.has(url)) {
    return iconFiles.get(url);
  } else {
    const request = fetch(url).then(async response => {
      if (response.ok) {
        const div = document.createElement('div');
        div.innerHTML = await response.text();
        const svg = div.firstElementChild;

        return {
          ok: response.ok,
          status: response.status,
          svg: svg && svg.tagName.toLowerCase() === 'svg' ? svg.outerHTML : ''
        };
      } else {
        return {
          ok: response.ok,
          status: response.status,
          svg: null
        };
      }
    }) as Promise<IconFile>;

    iconFiles.set(url, request);
    return request;
  }
};
