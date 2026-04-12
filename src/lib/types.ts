// Tipos para metadados de markdown
export interface MarkdownMetadata {
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
  image?: string;
  author?: string;
}

// Tipos para conteúdo de markdown
export interface MarkdownContent {
  slug: string;
  metadata: MarkdownMetadata;
  content: string;
}

// Tipos para componentes
export interface StudyCardProps {
  metadata: MarkdownMetadata;
  href: string;
}

export interface MarkdownRendererProps {
  content: string;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
  onChange: (category: string) => void;
}

export interface TagFilterProps {
  tags: string[];
  selectedTags?: string[];
  onChange: (tags: string[]) => void;
}
