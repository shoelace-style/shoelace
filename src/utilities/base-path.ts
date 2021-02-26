let basePath = '';

//
// Sets the library's base path to the specified directory.
//
export function setBasePath(path: string) {
  basePath = path;
}

//
// Gets the library's base path.
//
export function getBasePath() {
  return basePath.replace(/\/$/, '');
}

//
// The base path is used to load assets such as icons and images, so it needs to be set for components to work properly.
// By default, this script will look for a script ending in shoelace.js and set the base path to the directory that
// contains that file. To override this behavior, you can add the data-shoelace attribute to any script on the page
// (it probably makes the most sense to attach it to the Shoelace script, but it could also be on a bundle). The value
// can be a local folder or it can point to a CORS-enabled endpoint such as a CDN.
//
//  <script src="bundle.js" data-shoelace="/custom/base/path"></script>
//
// Alternatively, you can set the base path manually using the exported setBasePath() function.
//
if (!basePath) {
  const allScripts = [...document.getElementsByTagName('script')] as HTMLScriptElement[];
  const el = allScripts.find(script => script.hasAttribute('data-shoelace'));

  if (el) {
    // Use the data-shoelace attribute
    setBasePath(el.getAttribute('data-shoelace')!);
  } else {
    // Fallback to auto-detection
    const script = document.querySelector('script[src$="shoelace.js"], script[src$="shoelace.min.js"]');
    let path = '';

    if (script) {
      path = script.getAttribute('src')!;
    }

    setBasePath(path.split('/').slice(0, -1).join('/'));
  }
}
