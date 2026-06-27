'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <main className="container">
      <div className="error-page">
        <span className="error-icon">⚠️</span>
        <h1 className="error-title">Algo deu errado</h1>
        <p className="error-message">
          Ocorreu um erro inesperado ao carregar os estudos.
        </p>
        {error.digest && (
          <code className="error-digest">{error.digest}</code>
        )}
        <button className="error-retry-btn" onClick={reset}>
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
