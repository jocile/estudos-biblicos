import { getStudies } from '@/lib/markdown';
import StudyCard from './components/StudyCard';
import './page.css';

export default async function Home() {
  const studies = await getStudies();

  // Agrupar estudos por categoria
  const groupedStudies = studies.reduce((acc, study) => {
    const category = study.metadata.category || 'Geral';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(study);
    return acc;
  }, {} as Record<string, typeof studies>);

  return (
    <main className="container">
      <header className="page-header">
        <h1>Biblioteca de Estudos</h1>
        <p>Explore nossa coleção de estudos bíblicos em markdown</p>
      </header>

      {Object.keys(groupedStudies).length === 0 ? (
        <div className="no-content">
          <p>Nenhum estudo disponível no momento.</p>
        </div>
      ) : (
        Object.entries(groupedStudies).map(([category, categoryStudies]) => (
          <section key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="cards-grid">
              {categoryStudies.map(study => (
                <StudyCard
                  key={study.slug}
                  metadata={study.metadata}
                  href={`/estudo/${study.slug}`}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

