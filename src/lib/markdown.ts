import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MarkdownMetadata, MarkdownContent } from './types';

// Normaliza os metadados vindos do gray-matter (garante tags como array, etc.)
function parseMetadata(data: matter.GrayMatterFile<string>['data']): MarkdownMetadata {
  if (data.tags && typeof data.tags === 'string') {
    data.tags = data.tags.split(',').map((tag: string) => tag.trim());
  }
  return data as MarkdownMetadata;
}

// Deriva o slug limpo a partir do nome do arquivo
function fileToSlug(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/\s+/g, '-').toLowerCase();
}

// Função principal para ler todos os markdowns
export async function getStudies(): Promise<MarkdownContent[]> {
  const contentDir = join(process.cwd(), 'content');
  let files: string[] = [];
  
  try {
    files = readdirSync(contentDir);
  } catch (error) {
    console.error('Pasta content não encontrada ou erro ao ler.', error);
    return [];
  }
  
  const studies: MarkdownContent[] = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = join(contentDir, file);
      const { data, content } = matter(readFileSync(filePath, 'utf-8'));
      return {
        slug: fileToSlug(file),
        metadata: parseMetadata(data),
        content,
      };
    });
  
  // Ordenar por data (mais recente primeiro); sem data vai para o final
  studies.sort((a, b) => {
    const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
    const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
    return dateB - dateA;
  });
  
  return studies;
}


// Função para obter um estudo específico por slug
export async function getStudyBySlug(slug: string): Promise<MarkdownContent | null> {
  const contentDir = join(process.cwd(), 'content');
  let files: string[] = [];

  try {
    files = readdirSync(contentDir);
  } catch {
    return null;
  }

  const file = files.find((f) => f.endsWith('.md') && fileToSlug(f) === slug);
  if (!file) return null;

  const { data, content } = matter(readFileSync(join(contentDir, file), 'utf-8'));
  return {
    slug,
    metadata: parseMetadata(data),
    content,
  };
}


// Função para obter todos os estudos por categoria
export async function getStudiesByCategory(category?: string): Promise<MarkdownContent[]> {
  const allStudies = await getStudies();
  
  if (!category) {
    return allStudies;
  }
  
  return allStudies.filter(study => 
    study.metadata.category?.toLowerCase() === category.toLowerCase()
  );
}

// Função para obter todas as categorias únicas
export async function getCategories(): Promise<string[]> {
  const allStudies = await getStudies();
  const categories = new Set<string>();
  
  allStudies.forEach(study => {
    if (study.metadata.category) {
      categories.add(study.metadata.category);
    }
  });
  
  return Array.from(categories).sort();
}

// Função para obter todas as tags únicas
export async function getTags(): Promise<string[]> {
  const allStudies = await getStudies();
  const tags = new Set<string>();
  
  allStudies.forEach(study => {
    if (study.metadata.tags) {
      study.metadata.tags.forEach(tag => {
        tags.add(tag);
      });
    }
  });
  
  return Array.from(tags).sort();
}

// Função para obter todos os slugs dos estudos (para generateStaticParams)
export async function getSlugPaths(): Promise<string[]> {
  const studies = await getStudies();
  return studies.map(s => s.slug);
}
