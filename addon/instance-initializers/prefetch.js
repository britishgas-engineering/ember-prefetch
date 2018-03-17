export function initialize(appInstance) {
  const config = appInstance.resolveRegistration('config:environment');
  const {prefetch:{applicationRoot, applicationName}} = config;

  if (applicationRoot && applicationName) {
    fetch(`${applicationRoot}/assets/assetMap.json`)
      .then((response) => {
        return response.json();
      })
      .then((assetsMap) => {
        const vendorJs = assetsMap.assets['assets/vendor.js'];
        const applicationJs = assetsMap.assets[`assets/${applicationName}.js`];
        const vendorCss = assetsMap.assets[`assets/vendor.css`];
        const applicationCss = assetsMap.assets[`assets/${applicationName}.css`];

        const prefetchHTML = `
           <link rel="prefetch" href="${applicationRoot}${vendorJs}" as="script">
           <link rel="prefetch" href="${applicationRoot}${applicationJs}" as="script">
           <link rel="prefetch" href="${applicationRoot}${vendorCss}" as="style">
           <link rel="prefetch" href="${applicationRoot}${applicationCss}" as="style">`;

        const parser = new DOMParser();
        const doc = parser.parseFromString(prefetchHTML, 'text/html');
        const documentFragment = document.createDocumentFragment();

        doc.querySelectorAll('link').forEach((link) => {
          documentFragment.appendChild(link);
        });

        document.body.appendChild(documentFragment);
      });
  }
}

export default {
  initialize
};
