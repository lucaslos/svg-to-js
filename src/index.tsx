import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from 'Root';
import 'state';
import { version, name } from '../package.json';

if (__PROD__) {
  console.log(`${name} v${version}`);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  // eslint-disable-next-line prefer-rest-params
  function gtag() { window.dataLayer.push(arguments); }
  // @ts-ignore
  gtag('js', new Date());

  // @ts-ignore
  gtag('config', 'UA-112807554-3');
}

if (module.hot) {
  module.hot.accept('../package.json', () => {});
}

ReactDOM.render(<Root />, document.getElementById('app'));
