# ember-prefetch

#### This is currently WIP but a first release is coming soon!

This addon allows you to prefetch assets of another ember application. Prefetching can significantly improve user experience by downloading and caching assets of a second application in the background (without impacting loading performance of the prefetching application). 

This means that when the user actually navigates to the second application, the assets are already there (or nearly there depending on how fast the navigation between the 2 takes) and the second application boots quickly for the user.

Use when you are certain that the majority of your users will navigate to the other application, otherwise you are simply wasting data on your user's connection.

An example use case is say you have a login application, then prefetching assets for an application that users will see post logging in is a good idea!

This addon dynamically generates `<link rel="prefetch>` tags for the prefetched application's assets (application js/css and vendor js/css). It handles fingerprinted assets on the prefetched application by requesting for assetMap.json on the prefetched application and then generating the prefetch tags based on the map.

To enable generation of assetMap.json in your prefetched app, simply enable this in your prefetched application's `ember-cli-build.js`,

```
fingerprint: {
  enabled: true,
  generateAssetMap: true
}
```

You can configure the application to be prefetched in your application's `config/environment.js`,

```
  prefetch: {
    applicationRoot: '/prefetched-application-url/',
    applicationName: 'prefetched-application-name'
  }
```

The above configuration will insert the following tags dynamically,

```
<link rel="prefetch" href="/prefetched-application-url/assets/vendor-{fingerprint}.js" as="script">
<link rel="prefetch" href="/prefetched-application-url/assets/{prefetched-application-name}-{fingerprint}.js" as="script">
<link rel="prefetch" href="/prefetched-application-url/assets/{prefetched-application-name}-{fingerprint}.css" as="style">
<link rel="prefetch" href="/my-account/assets/vendor-{fingerprint}.css" as="style">
```

Read Addy Osmani's excellent blog post describing preload, prefetch and priorities at https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

## Installation

* `git clone <repository-url>` this repository
* `cd ember-prefetch`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
