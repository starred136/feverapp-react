// This function registers the service worker if supported by the browser.
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker Registered:', registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New update available. Reloading...');
                window.location.reload();
              }
            }
          };
        }
      };
    }).catch((error) => {
      console.error('Service Worker Registration Failed:', error);
    });
  }
}

// Optional: This function can be used to unregister the service worker.
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
