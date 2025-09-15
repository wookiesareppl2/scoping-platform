import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const COOKIE_KEY = 'cookieConsentAccepted';

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const dismissBanner = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-800 text-white px-4 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg animate-fade-in">
      <div className="mb-2 md:mb-0 text-sm">
        This platform uses only essential cookies required for core functionality, such as project proposals and user accounts. By continuing to use this site, you consent to the use of these cookies. No analytics or marketing cookies are used. For details, see our{' '}
        <a href="/privacy" className="underline text-blue-300 hover:text-blue-200">Privacy Policy</a>.
        <br />
        <span className="block mt-2 text-xs text-gray-300">If you do not consent to the use of essential cookies, please discontinue use of the platform.</span>
      </div>
      <Button onClick={dismissBanner} className="bg-blue-600 hover:bg-blue-700 text-white ml-0 md:ml-4 mt-2 md:mt-0 px-6 py-2 rounded">
        Dismiss
      </Button>
    </div>
  );
};

export default CookieConsentBanner;
