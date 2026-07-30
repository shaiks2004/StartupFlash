import { useEffect, useRef } from "react";

function AdBanner() {
  const adRef = useRef(null);
  const hasRequestedAd = useRef(false);

  useEffect(() => {
    if (hasRequestedAd.current || !adRef.current) {
      return;
    }

    hasRequestedAd.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5221720151682078"
      data-ad-slot="1748339709"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default AdBanner;
