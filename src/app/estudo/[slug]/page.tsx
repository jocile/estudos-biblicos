import { getStudyBySlug, getStudies } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/app/components/MarkdownRenderer';
import Link from 'next/link';
import './page.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const study = await getStudyBySlug(resolvedParams.slug);

  if (!study) {
    return {
      title: 'Estudo Não Encontrado',
    };
  }

  return {
    title: `${study.metadata.title} | Estudos Bíblicos`,
    description: study.metadata.description,
  };
}

export async function generateStaticParams() {
  const studies = await getStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function StudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const study = await getStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return (
    <article className="study-container">
      <div className="study-wrapper">
        <header className="study-header">
          <nav className="study-nav">
            <Link href="/" className="back-link">
              &larr; Voltar para a Biblioteca
            </Link>
          </nav>

          <div className="study-meta">
            {study.metadata.category && (
              <span className="study-category">{study.metadata.category}</span>
            )}
            {study.metadata.date && (
              <time className="study-date">
                {new Date(study.metadata.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>

          <h1 className="study-title">{study.metadata.title}</h1>
          <p className="study-description">{study.metadata.description}</p>

          {study.metadata.tags && study.metadata.tags.length > 0 && (
            <div className="study-tags">
              {study.metadata.tags.map((tag) => (
                <span key={tag} className="study-tag">#{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className="study-content glass-card">
          <MarkdownRenderer content={study.content} />
        </div>
      </div>
    </article>
  );
}
