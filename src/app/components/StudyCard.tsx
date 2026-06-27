import Link from 'next/link';
import { MarkdownMetadata } from '@/lib/types';

interface StudyCardProps {
  metadata: MarkdownMetadata;
  href: string;
}

export default function StudyCard({ metadata, href }: StudyCardProps) {
  return (
    <Link href={href} className="study-card">
      <div className="card-content">
        <h3 className="card-title">{metadata.title}</h3>
        <p className="card-description">{metadata.description}</p>

        {metadata.category && (
          <span className="category-badge">{metadata.category}</span>
        )}

        {metadata.tags && metadata.tags.length > 0 && (
          <div className="tags-container">
            {metadata.tags.map((tag, index) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        <time className="card-date">{metadata.date}</time>
      </div>
    </Link>
  );
}
