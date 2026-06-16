import { useEffect } from "react"

function AdSense() {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  return (
    <div
      style={{
        margin: "30px 0",
        textAlign: "center"
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5221720151682078"
        data-ad-slot="1748339709"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdSense