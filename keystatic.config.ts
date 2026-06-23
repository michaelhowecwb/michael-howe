import { config, fields, collection, singleton } from '@keystatic/core';

// Determina o ambiente atual para o Storage Híbrido
const isDev = process.env.NODE_ENV === 'development';

export default config({
  // Storage Híbrido: Permite edição local em Dev e edição via Vercel/GitHub em Prod
  storage: isDev 
    ? { kind: 'local' } 
    : { kind: 'github', repo: 'michaelhowecwb/michael-howe' },

  collections: {
    // Works & Portfolio
    works: collection({
      label: 'Trabalhos / Portfólio',
      slugField: 'title_slug',
      path: 'src/content/works/*/',
      format: { data: 'json' },
      schema: {
        title_slug: fields.slug({ name: { label: 'ID do Projeto (Slug URL)' } }),
        
        // Controle de Estado e Ordem
        draft: fields.checkbox({ label: 'Rascunho (Ocultar em produção)', defaultValue: false }),
        date: fields.date({ label: 'Data de Publicação (Ordenação)', defaultValue: { kind: 'today' } }),
        
        // Single image Thumbnail (SEO & Performance)
        thumbnail: fields.image({
          label: 'Thumbnail Principal',
          directory: 'public/images/works',
          publicPath: '/images/works/',
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { 
          label: 'Tecnologias',
          itemLabel: (props) => props.value || 'Nova Tag'
        }),
        demoLink: fields.url({ label: 'Link do Projeto (Live)' }),
        repoLink: fields.url({ label: 'Link do GitHub' }),
        
        // Bilingual
        en: fields.object({
          title: fields.text({ label: 'Title (EN)' }),
          thumbnailAlt: fields.text({ label: 'Thumbnail Alt Text (A11y - EN)' }),
          shortDescription: fields.text({ label: 'Short Summary (EN)', multiline: true }),
          fullDescription: fields.text({ label: 'Full Description (EN)', multiline: true }),
        }, { label: 'English Content' }),
        
        pt: fields.object({
          title: fields.text({ label: 'Título (PT)' }),
          thumbnailAlt: fields.text({ label: 'Texto Alternativo da Thumbnail (A11y - PT)' }),
          shortDescription: fields.text({ label: 'Resumo (PT)', multiline: true }),
          fullDescription: fields.text({ label: 'Descrição Completa (PT)', multiline: true }),
        }, { label: 'Conteúdo em Português' }),
        
        // Sessions
        detailedSections: fields.array(
          fields.object({
            sectionImage: fields.image({
              label: 'Imagem da Seção',
              directory: 'public/images/works/details',
              publicPath: '/images/works/details/',
            }),
            en: fields.object({
              title: fields.text({ label: 'Section Title (EN)' }),
              imageAlt: fields.text({ label: 'Image Alt Text (EN)' }),
              content: fields.text({ label: 'Content (EN)', multiline: true }),
            }),
            pt: fields.object({
              title: fields.text({ label: 'Título da Seção (PT)' }),
              imageAlt: fields.text({ label: 'Texto Alternativo da Imagem (PT)' }),
              content: fields.text({ label: 'Conteúdo (PT)', multiline: true }),
            }),
          }),
          { 
            label: 'Seções de Detalhes do Projeto',
            itemLabel: (props) => props.fields.pt.fields.title.value || 'Nova Seção'
          }
        ),
      },
    }),

    // Specialties
    expertise: collection({
      label: 'Especialidades',
      slugField: 'admin_label',
      path: 'src/content/expertise/*/',
      format: { data: 'json' },
      schema: {
        admin_label: fields.text({ label: 'Rótulo Admin (ex: Frontend)' }),
        iconName: fields.text({ label: 'Nome do Ícone CSS (ex: lucide-code)' }),
        order: fields.number({ label: 'Ordem (1, 2, 3...)' }),
        pt: fields.object({
          title: fields.text({ label: 'Título (PT)' }),
          description: fields.text({ label: 'Descrição (PT)', multiline: true }),
        }),
        en: fields.object({
          title: fields.text({ label: 'Title (EN)' }),
          description: fields.text({ label: 'Description (EN)', multiline: true }),
        }),
      },
    }),
  },

  singletons: {
    // About
    about: singleton({
      label: 'Sobre Mim',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        bioImage: fields.image({
          label: 'Foto de Perfil Oficial',
          directory: 'public/images/about',
          publicPath: '/images/about/',
          validation: { isRequired: true },
        }),
        pt: fields.object({
          bioImageAlt: fields.text({ label: 'Texto Alternativo da Foto (A11y - PT)' }),
          cv: fields.file({
            label: 'Currículo em PDF (PT)',
            directory: 'public/files',
            publicPath: '/files/',
          }),
          heading: fields.text({ label: 'Título Principal (PT)' }),
          subheading: fields.text({ label: 'Subtítulo (PT)' }),
          bio: fields.text({ label: 'Bio Curta (Home) (PT)', multiline: true }),
          fullBio: fields.text({ label: 'Bio Completa (Sobre) (PT)', multiline: true }),
          experience: fields.array(
            fields.object({
              year: fields.text({ label: 'Período' }),
              company: fields.text({ label: 'Empresa' }),
              role: fields.text({ label: 'Cargo' }),
              description: fields.text({ label: 'Atividades', multiline: true }),
            }),
            { label: 'Experiência (PT)', itemLabel: p => `${p.fields.year.value} - ${p.fields.company.value}` }
          ),
        }, { label: 'Conteúdo em Português' }),
        
        en: fields.object({
          bioImageAlt: fields.text({ label: 'Profile Photo Alt Text (A11y - EN)' }),
          cv: fields.file({
            label: 'Resume PDF (EN)',
            directory: 'public/files',
            publicPath: '/files/',
          }),
          heading: fields.text({ label: 'Main Heading (EN)' }),
          subheading: fields.text({ label: 'Subheading (EN)' }),
          bio: fields.text({ label: 'Short Bio (Home) (EN)', multiline: true }),
          fullBio: fields.text({ label: 'Full Biography (About) (EN)', multiline: true }),
          experience: fields.array(
            fields.object({
              year: fields.text({ label: 'Period' }),
              company: fields.text({ label: 'Company' }),
              role: fields.text({ label: 'Role' }),
              description: fields.text({ label: 'Description', multiline: true }),
            }),
            { label: 'Experience (EN)', itemLabel: p => `${p.fields.year.value} - ${p.fields.company.value}` }
          ),
        }, { label: 'English Content' }),
      },
    }),

    // Configurações Globais (Redes Sociais e Meta)
    settings: singleton({
      label: 'Configurações Globais',
      path: 'src/content/settings/index',
      format: { data: 'json' },
      schema: {
        githubUrl: fields.url({ label: 'URL do GitHub', defaultValue: 'https://github.com/michaelhowecwb' }),
        linkedinUrl: fields.url({ label: 'URL do LinkedIn', defaultValue: 'https://www.linkedin.com/in/michael-howe-cwb/' }),
        email: fields.text({ label: 'E-mail de Contato' }),
      }
    }),
  },
});