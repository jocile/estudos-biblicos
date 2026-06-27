'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StudyError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Study Error Boundary]', error);
  }, [error]);

  return (
    <article className="study-container">
      <div className="study-wrapper">
        <div className="error-page">
          <span className="error-icon">📄</span>
          <h1 className="error-title">Erro ao carregar o estudo</h1>
          <p className="error-message">
            Não foi possível carregar o conteúdo deste estudo.
          </p>
          {error.digest && (
            <code className="error-digest">{error.digest}</code>
          )}
          <div className="error-actions">
            <button className="error-retry-btn" onClick={reset}>
              Tentar novamente
            </button>
            <Link href="/" className="back-link">
              ← Voltar para a Biblioteca
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
