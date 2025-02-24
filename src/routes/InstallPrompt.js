import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isIosDevice, setIsIosDevice] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // Detect iOS device
  const isIOS = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
  };

  useEffect(() => {
    const ios = isIOS();
    setIsIosDevice(ios);

    if (!ios) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
        setShowModal(true);
      });
    } else {
      setShowModal(true);
    }

    // Check for updates (use Service Worker or API call)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          setUpdateAvailable(true);
        });
      });
    }
  }, []);

  const handleInstall = async () => {
    if (isIosDevice) {
      alert('To install this app, tap the Share icon in Safari and select "Add to Home Screen".');
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowModal(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal && !updateAvailable) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        <img src="/assets/logo.png" alt="App Logo" style={styles.logo} />
        <p style={styles.text}>
          {isIosDevice
            ? 'To install this app on iOS, tap the Share icon in Safari and select "Add to Home Screen".'
            : 'Install this app on your device for a better experience.'}
        </p>
        <button style={styles.installButton} onClick={handleInstall}>
          {isIosDevice ? 'Learn How' : 'INSTALL'}
        </button>
        {isIosDevice && (
          <button style={styles.closeButton} onClick={handleClose}>
            Close
          </button>
        )}
        {updateAvailable && (
          <button style={styles.updateButton} onClick={handleUpdate}>
            Update Available - Refresh Now
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '80%',
    maxWidth: '400px',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '15px',
  },
  text: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  installButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  closeButton: {
    marginTop: '10px',
    backgroundColor: '#DC3545',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  updateButton: {
    marginTop: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default InstallPrompt;
