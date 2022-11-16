import { requestInclude } from '../include/request';

type IconFile =
  | {
      ok: true;
      status: number;
      svg: string;
    }
  | {
      ok: false;
      status: number;
      svg: null;
    };

interface IconFileUnknown {
  ok: boolean;
  status: number;
  svg: string | null;
}

const iconFiles = new Map<string, IconFile>();

export async function requestIcon(url: string): Promise<IconFile> {
  if (iconFiles.has(url)) {
    return iconFiles.get(url)!;
  }
  const fileData = await requestInclude(url);
  const iconFileData: IconFileUnknown = {
    ok: fileData.ok,
    status: fileData.status,
    svg: null
  };
  if (fileData.ok) {
    const div = document.createElement('div');
    div.innerHTML = fileData.html;
    const svg = div.firstElementChild;
    iconFileData.svg = svg?.tagName.toLowerCase() === 'svg' ? svg.outerHTML : '';
  }

  iconFiles.set(url, iconFileData as IconFile);
  return iconFileData as IconFile;
}
