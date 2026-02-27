import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  
  collections: {
    // 1. TRABALHOS (Mantido como você já tem)
    works: collection({
      label: 'Trabalhos / Portfólio',
      slugField: 'title_slug',
      path: 'src/content/works/*/',
      format: { data: 'json' },
      schema: {
        title_slug: fields.slug({ name: { label: 'ID do Projeto' } }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'public/images/works',
          publicPath: '/images/works/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tecnologias' }),
        demoLink: fields.url({ label: 'Live Demo' }),
        repoLink: fields.url({ label: 'GitHub' }),
        en: fields.object({
          title: fields.text({ label: 'Title (EN)' }),
          shortDescription: fields.text({ label: 'Short Summary (EN)', multiline: true }),
          fullDescription: fields.text({ label: 'Full Description (EN)', multiline: true }),
          detailedSections: fields.array(fields.object({
            sectionTitle: fields.text({ label: 'Section Title' }),
            content: fields.text({ label: 'Content', multiline: true }),
            image: fields.image({
               label: 'Image',
               directory: 'public/images/works/details',
               publicPath: '/images/works/details/',
            }),
          })),
        }, { label: 'English Content' }),
        pt: fields.object({
          title: fields.text({ label: 'Título (PT)' }),
          shortDescription: fields.text({ label: 'Resumo (PT)', multiline: true }),
          fullDescription: fields.text({ label: 'Descrição Completa (PT)', multiline: true }),
          detailedSections: fields.array(fields.object({
            sectionTitle: fields.text({ label: 'Título da Seção' }),
            content: fields.text({ label: 'Conteúdo', multiline: true }),
            image: fields.image({
               label: 'Imagem',
               directory: 'public/images/works/details',
               publicPath: '/images/works/details/',
            }),
          })),
        }, { label: 'Conteúdo em Português' }),
      },
    }),

    // 2. ESPECIALIDADES (Agora padronizado com pt/en)
    expertise: collection({
      label: 'Minhas Especialidades (Cards)',
      slugField: 'admin_label',
      path: 'src/content/expertise/*/',
      format: { data: 'json' },
      schema: {
        admin_label: fields.text({ label: 'Rótulo Admin (ex: Frontend, Design)' }),
        order: fields.number({ label: 'Ordem de exibição' }),
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
    // 3. SOBRE MIM (Expandido para a página About completa)
    about: singleton({
      label: 'Sobre Mim (Tudo)',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        pt: fields.object({
          heading: fields.text({ label: 'Título Principal (PT)' }),
          subheading: fields.text({ label: 'Subtítulo/Frase (PT)', multiline: true }),
          bio: fields.text({ label: 'Bio Curta (Home) (PT)', multiline: true }),
          fullBio: fields.text({ label: 'Bio Completa (Página About) (PT)', multiline: true }),
          bioImage: fields.image({
            label: 'Foto da Biografia',
            directory: 'public/images/about',
            publicPath: '/images/about/',
          }),
          experience: fields.array(
            fields.object({
              year: fields.text({ label: 'Ano/Período' }),
              company: fields.text({ label: 'Empresa/Instituição' }),
              role: fields.text({ label: 'Cargo/Título' }),
              description: fields.text({ label: 'O que você fez lá', multiline: true }),
            }),
            { label: 'Timeline (PT)', itemLabel: p => `${p.fields.year.value} - ${p.fields.company.value}` }
          ),
        }, { label: 'Conteúdo em Português' }),
        en: fields.object({
          heading: fields.text({ label: 'Main Heading (EN)' }),
          subheading: fields.text({ label: 'Subheading/Quote (EN)', multiline: true }),
          bio: fields.text({ label: 'Short Bio (Home) (EN)', multiline: true }),
          fullBio: fields.text({ label: 'Full Biography (About Page) (EN)', multiline: true }),
          bioImage: fields.image({
            label: 'Biography Photo',
            directory: 'public/images/about',
            publicPath: '/images/about/',
          }),
          experience: fields.array(
            fields.object({
              year: fields.text({ label: 'Year/Period' }),
              company: fields.text({ label: 'Company/Institution' }),
              role: fields.text({ label: 'Role/Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
            }),
            { label: 'Timeline (EN)', itemLabel: p => `${p.fields.year.value} - ${p.fields.company.value}` }
          ),
        }, { label: 'English Content' }),
      },
    }),
  },
});