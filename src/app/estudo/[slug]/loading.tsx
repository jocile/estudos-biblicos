export default function StudyLoading() {
  return (
    <article className="study-container">
      <div className="study-wrapper">
        <header className="study-header">
          <div className="skeleton skeleton-back-link" />
          <div className="study-meta">
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-date" />
          </div>
          <div className="skeleton skeleton-h1" />
          <div className="skeleton skeleton-p" />
          <div className="skeleton skeleton-p skeleton-p--short" />
        </header>

        <div className="study-content glass-card">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="skeleton skeleton-p"
              style={{ width: `${70 + Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
