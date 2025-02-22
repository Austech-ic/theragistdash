import React, { useEffect, useState } from 'react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isIOSPromptShown, setIsIOSPromptShown] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOS);

    // Check if it's already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isInstalled) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show iOS prompt once per session
    if (isIOS && !sessionStorage.getItem('iosPromptShown')) {
      setIsIOSPromptShown(true);
      sessionStorage.setItem('iosPromptShown', 'true');
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setPromptInstall(null);
  };

  if (!supportsPWA && !isIOS) {
    return null;
  }

  return (
    <div className="install-prompt">
      {isIOS && isIOSPromptShown ? (
        <div className="ios-prompt whitespace-nowrap">
          <p className="whitespace-nowrap" >To install this app on your iPhone:</p>
          <ol>
            <li>Tap the Share button <span>📤</span></li>
            <li>Tap "Add to Home Screen" <span>🏠</span></li>
          </ol>
          <button className='mt-2 mx-auto px-2 py-[2px] text-center bg-[#26ae5f] ' onClick={() => setIsIOSPromptShown(false)}>Got it!</button>
        </div>
      ) : supportsPWA ? (
        <button className="install-button" onClick={handleInstallClick}>
          Install App
        </button>
      ) : null}
    </div>
  );
};

export default InstallPWA;