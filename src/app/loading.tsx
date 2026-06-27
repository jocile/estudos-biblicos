export default function Loading() {
  return (
    <main className="container">
      <header className="page-header">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-subtitle" />
      </header>

      <div className="cards-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="study-card skeleton-card">
            <div className="card-content">
              <div className="skeleton skeleton-h3" />
              <div className="skeleton skeleton-p" />
              <div className="skeleton skeleton-p skeleton-p--short" />
              <div className="skeleton skeleton-badge" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
