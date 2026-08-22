import { TrendingUp } from "lucide-react"
import "../styles/components/ticker.css"

function Ticker({ items = [] }) {
  const repeated = items.length ? [...items, ...items] : []

  return (
    <div className="ticker" aria-label="Trending stories">
      <div className="ticker-inner">
        <div className="ticker-heading">
          <TrendingUp size={13} aria-hidden="true" /> TRENDING
        </div>

        <div className="ticker-scroll">
          <div className="ticker-track">
            {repeated.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="ticker-item"
              >
                <span className="ticker-circle" />
                {item || "Untitled story"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticker
