import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MarkdownMetadata, MarkdownContent } from './types';

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
  
  const studies: MarkdownContent[] = [];
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = join(contentDir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      
      // Extrair metadados com gray-matter
      const { data, content } = matter(fileContent);
      
      // Garantir que tags seja um array
      if (data.tags && typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map((tag: string) => tag.trim());
      }
      
      // Criar o slug a partir do nome do arquivo
      const baseSlug = file.replace(/\.md$/, '');
      const slug = baseSlug.replace(/\s+/g, '-').toLowerCase();
      
      studies.push({
        slug,
        metadata: data as MarkdownMetadata,
        content
      });
    }
  }
  
  // Ordenar por data (mais recente primeiro)
  // Ignora os que não tem data válida
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
  } catch (error) {
    return null;
  }
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = join(contentDir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      
      const { data, content } = matter(fileContent);
      
      // Garantir que tags seja um array
      if (data.tags && typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map((tag: string) => tag.trim());
      }
      
      const baseSlug = file.replace(/\.md$/, '');
      const slugFromFilename = baseSlug.replace(/\s+/g, '-').toLowerCase();
      
      if (slugFromFilename === slug) {
        return {
          slug: slugFromFilename,
          metadata: data as MarkdownMetadata,
          content
        };
      }
    }
  }
  
  return null;
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
