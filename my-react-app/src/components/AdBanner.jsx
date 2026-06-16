import { useEffect } from "react";

function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <ins
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