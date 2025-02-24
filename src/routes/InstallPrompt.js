// // src/InstallPrompt.js
// import React, { useState, useEffect } from "react";

// const InstallPrompt = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [isInstalled, setIsInstalled] = useState(false);

//   useEffect(() => {
//     // Vérifie si l'application est installée
//     const checkIfInstalled = () => {
//       if (window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches) {
//         setIsInstalled(true); // Marque l'application comme installée
//       }
//     };

//     checkIfInstalled();

//     const handler = (event) => {
//       event.preventDefault(); // Empêche la bannière native
//       setDeferredPrompt(event);
//     };

//     window.addEventListener("beforeinstallprompt", handler);

//     return () => window.removeEventListener("beforeinstallprompt", handler);
//   }, []);

//   const handleInstall = async () => {
//     if (!deferredPrompt) return;

//     // Affiche la bannière d'installation
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;

//     if (outcome === "accepted") {
//       console.log("PWA installed successfully");
//       setIsInstalled(true); // Marque l'application comme installée après succès
//     } else {
//       console.log("PWA installation dismissed");
//     }

//     setDeferredPrompt(null); // Réinitialise le prompt
//   };

//   // Bloque l'accès si l'application n'est pas installée
//   if (isInstalled) {
//     return null; // Accès autorisé si l'application est installée
//   }

//   // Affiche le pop-up si l'application n'est pas installée
//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modalContent}>
//         <img src="/assets/logo.png" alt="App Logo" style={styles.logo} />
//         <p style={styles.text}>Install this app on your mobile phone to continue</p>
//         <button style={styles.installButton} onClick={handleInstall}>
//           INSTALL
//         </button>
//       </div>
//     </div>
//   );
// };

// // Styles en ligne
// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0, 0, 0, 0.7)", // Fond semi-transparent
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//     padding: "24px", // Ajoute un espacement pour éviter que le pop-up touche les bords
//   },
//   modalContent: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//     maxWidth: "400px",
//     width: "100%",
//   },
//   logo: {
//     width: "80px",
//     height: "auto",
//     marginBottom: "15px",
//   },
//   text: {
//     fontSize: "16px",
//     marginBottom: "15px",
//     color: "#333",
//   },
//   installButton: {
//     padding: "10px 20px",
//     backgroundColor: "#007BFF",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
//   installButtonHover: {
//     backgroundColor: "#0056b3",
//   },
// };

// export default InstallPrompt;

// import React, { useState, useEffect } from 'react';

// // Helper function to detect if the device is iOS
// const isIOS = () => {
//   const ua = window.navigator.userAgent.toLowerCase();
//   return /iphone|ipad|ipod/.test(ua);
// };

// const InstallPrompt = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isIosDevice, setIsIosDevice] = useState(false);

//   useEffect(() => {
//     const ios = isIOS();
//     setIsIosDevice(ios);

//     if (!ios) {
//       // For non-iOS devices, listen for the beforeinstallprompt event
//       const handler = (event) => {
//         event.preventDefault(); // Prevent the default mini-infobar from showing
//         setDeferredPrompt(event); // Save the event for later use
//         setShowModal(true);         // Show our custom install prompt modal
//         console.log('beforeinstallprompt event captured');
//       };

//       window.addEventListener('beforeinstallprompt', handler);
//       return () => window.removeEventListener('beforeinstallprompt', handler);
//     } else {
//       // For iOS, show the modal immediately to guide manual installation
//       setShowModal(true);
//     }
//   }, []);

//   const handleInstall = async () => {
//     if (isIosDevice) {
      
//       // For iOS, instruct the user to add the app manually
//       alert('To install this app, tap the Share icon in Safari and select "Add to Home Screen".');
//       setShowModal(false);
//       return;
//     }

//     // For non-iOS devices, use the deferred prompt
//     if (!deferredPrompt) return;
//     setShowModal(false);
//     localStorage.setItem('hasSeenInstallPrompt', 'true');
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;
//     console.log(`User response: ${outcome}`);
//     setDeferredPrompt(null);
//   };

//   if (!showModal) return null;

//   // Inline styles for the modal design
//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000,
//     },
//     modalContent: {
//       background: 'white',
//       padding: '30px',
//       borderRadius: '10px',
//       textAlign: 'center',
//       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
//       maxWidth: '400px',
//       width: '90%',
//     },
//     logo: {
//       width: '100px', // Logo size
//       height: 'auto',
//       marginBottom: '20px',
//     },
//     text: {
//       fontSize: '18px',
//       marginBottom: '20px',
//       color: '#333',
//     },
//     installButton: {
//       padding: '10px 20px',
//       backgroundColor: '#007BFF',
//       color: 'white',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       fontSize: '16px',
//     },
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modalContent}>
//         {/* Display the logo (assumes logo is located at public/assets/icons/logo.png) */}
//         <img src="/assets/logo.png" alt="App Logo" style={styles.logo} />
//         <p style={styles.text}>
//           {isIosDevice
//             ? 'Install this app on your mobile phone. To install, tap the Share icon and then "Add to Home Screen".'
//             : 'Install this app on your mobile phone for a better experience.'}
//         </p>
//         <div>
//           <button style={styles.installButton} onClick={handleInstall}>
//             {isIosDevice ? 'Learn How' : 'INSTALL'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstallPrompt;


// import { useState, useEffect } from 'react';

// const InstallPrompt = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isIosDevice, setIsIosDevice] = useState(false);
//   const [updateAvailable, setUpdateAvailable] = useState(false);

//   // Detect iOS device
//   const isIOS = () => {
//     const ua = window.navigator.userAgent.toLowerCase();
//     return /iphone|ipad|ipod/.test(ua);
//   };

//   useEffect(() => {
//     const ios = isIOS();
//     setIsIosDevice(ios);

//     if (!ios) {
//       window.addEventListener('beforeinstallprompt', (event) => {
//         event.preventDefault();
//         setDeferredPrompt(event);
//         setShowModal(true);
//       });
//     } else {
//       setShowModal(true);
//     }

//     // Check for updates (use Service Worker or API call)
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.ready.then((registration) => {
//         registration.addEventListener('updatefound', () => {
//           setUpdateAvailable(true);
//         });
//       });
//     }
//   }, []);

//   const handleInstall = async () => {
//     if (isIosDevice) {
//       alert('To install this app, tap the Share icon in Safari and select "Add to Home Screen".');
//       return;
//     }

//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       const { outcome } = await deferredPrompt.userChoice;
//       if (outcome === 'accepted') {
//         setShowModal(false);
//       }
//       setDeferredPrompt(null);
//     }
//   };

//   const handleUpdate = () => {
//     window.location.reload();
//   };

//   if (!showModal && !updateAvailable) return null;

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modalContent}>
//         <img src="/assets/logo.png" alt="App Logo" style={styles.logo} />
//         <p style={styles.text}>
//           {isIosDevice
//             ? 'To install this app on iOS, tap the Share icon in Safari and select "Add to Home Screen".'
//             : 'Install this app on your mobile phone for a better experience.'}
//         </p>
//         <button style={styles.installButton} onClick={handleInstall}>
//           {isIosDevice ? 'Learn How' : 'INSTALL'}
//         </button>
//         {updateAvailable && (
//           <button style={styles.updateButton} onClick={handleUpdate}>
//             Update Available - Refresh Now
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '10px',
//     textAlign: 'center',
//     width: '80%',
//     maxWidth: '400px',
//   },
//   logo: {
//     width: '80px',
//     height: '80px',
//     marginBottom: '15px',
//   },
//   text: {
//     fontSize: '16px',
//     marginBottom: '15px',
//   },
  
//   installButton: {
//       padding: '10px 20px',
//       backgroundColor: '#007BFF',
//       color: 'white',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       fontSize: '16px',
//     },
//   updateButton: {
//     marginTop: '10px',
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '10px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
  
// };

// export default InstallPrompt;

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

  if (!showModal && !updateAvailable) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        <img src="/assets/logo.png" alt="App Logo" style={styles.logo} />
        <p style={styles.text}>
          {isIosDevice
            ? 'To install this app on iOS, tap the Share icon in Safari and select "Add to Home Screen".'
            : 'Install this app on your mobile phone for a better experience.'}
        </p>
        <button style={styles.installButton} onClick={handleInstall}>
          {isIosDevice ? 'Learn How' : 'INSTALL'}
        </button>
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


