import Link from 'next/link';
import './not-found.css';

export default function NotFound() {
  return (
    <main className="not-found-container">
      <div className="not-found-content glass-card">
        <h1>404</h1>
        <h2>Estudo Não Encontrado</h2>
        <p>Desculpe, o estudo que você está procurando não existe ou foi movido.</p>
        <Link href="/" className="back-button">
          &larr; Voltar para a Biblioteca
        </Link>
      </div>
    </main>
  );
}
