'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchButton.module.css';

interface StudyIndex {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StudyIndex[]>([]);
  const [index, setIndex] = useState<StudyIndex[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Carrega o índice ao abrir o modal pela primeira vez
  useEffect(() => {
    if (open && index.length === 0) {
      fetch('/api/search')
        .then((r) => r.json())
        .then((data: StudyIndex[]) => setIndex(data))
        .catch(console.error);
    }
  }, [open, index.length]);

  // Filtra resultados conforme query
  useEffect(() => {
    if (!query.trim()) {
      setResults(index.slice(0, 6));
      setActiveIndex(0);
      return;
    }
    const q = query.toLowerCase();
    const filtered = index.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 8));
    setActiveIndex(0);
  }, [query, index]);

  // Foca o input ao abrir
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  // Atalho Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const navigate = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/estudo/${slug}`);
    },
    [router]
  );

  // Navegação por teclado dentro do modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      navigate(results[activeIndex].slug);
    }
  };

  const isMac =
    typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  return (
    <>
      {/* Fake-input button na menubar */}
      <button
        id="search-trigger"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Abrir busca (Ctrl+K)"
      >
        <svg
          className={styles.triggerIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className={styles.triggerText}>Buscar estudos…</span>
        <kbd className={styles.kbd}>{isMac ? '⌘' : 'Ctrl'} K</kbd>
      </button>

      {/* Modal de busca */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Busca de estudos"
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Campo de busca real */}
            <div className={styles.searchRow}>
              <svg
                className={styles.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                id="search-input"
                className={styles.input}
                type="text"
                placeholder="Buscar por título, categoria ou tag…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setQuery('')}
                  aria-label="Limpar busca"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Resultados */}
            <ul className={styles.results} role="listbox">
              {results.length === 0 && query.trim() !== '' ? (
                <li className={styles.empty}>Nenhum estudo encontrado para "{query}"</li>
              ) : (
                results.map((study, i) => (
                  <li
                    key={study.slug}
                    role="option"
                    aria-selected={i === activeIndex}
                    className={`${styles.resultItem} ${
                      i === activeIndex ? styles.resultItemActive : ''
                    }`}
                    onClick={() => navigate(study.slug)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <span className={styles.resultIcon}>📖</span>
                    <span className={styles.resultBody}>
                      <span className={styles.resultTitle}>{study.title}</span>
                      {study.category && (
                        <span className={styles.resultCategory}>
                          {study.category}
                        </span>
                      )}
                    </span>
                    <span className={styles.resultArrow}>↵</span>
                  </li>
                ))
              )}
            </ul>

            {/* Rodapé com dicas de teclado */}
            <div className={styles.footer}>
              <span><kbd>↑↓</kbd> navegar</span>
              <span><kbd>↵</kbd> abrir</span>
              <span><kbd>Esc</kbd> fechar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
