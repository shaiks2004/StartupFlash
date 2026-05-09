
function Ticker({ items = [] }) {
  const repeated = items.length ? [...items, ...items] : []

  return (

    <div className="ticker">

      <div className="ticker-inner">

        {/* LEFT LABEL */}

        <div className="ticker-heading">

          ↗ TRENDING

        </div>

        {/* SCROLL AREA */}

        <div className="ticker-scroll">

          <div className="ticker-track">

            {repeated.map((item, index) => (

              <span
                key={index}
                className="ticker-item"
              >

                <span className="ticker-circle"></span>

                {item}

              </span>

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}

export default Ticker