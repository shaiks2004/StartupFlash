function LoadingSkeleton({ lines = 3 }) {
  return (
    <div className="skeleton">
      <div className="skeleton-block" />
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-line" />
      ))}
    </div>
  )
}

export default LoadingSkeleton
