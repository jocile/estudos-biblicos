import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <main className="not-found-container">
      <div className="not-found-content glass-card">
        <h1>404</h1>
        <h2>Página Não Encontrada</h2>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <Link href="/" className="back-button">
          &larr; Voltar para a Biblioteca
        </Link>
      </div>
    </main>
  );
}