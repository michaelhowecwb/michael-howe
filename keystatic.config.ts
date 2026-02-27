import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    works: collection({
      label: 'Trabalhos / Portfólio',
      slugField: 'title_slug',
      path: 'src/content/works/*/',
      format: { data: 'json' },
      schema: {
        title_slug: fields.slug({ name: { label: 'ID do Projeto (Slug para URL)' } }),

        // Campos Globais (Iguais para ambos os idiomas)
        thumbnail: fields.image({
          label: 'Thumbnail do Projeto',
          directory: 'public/images/works',
          publicPath: '/images/works/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tecnologias',
          itemLabel: props => props.value
        }),
        demoLink: fields.url({ label: 'Link do Projeto (Live Demo)' }),
        repoLink: fields.url({ label: 'Link do Repositório (GitHub)' }),

        // CONTEÚDO EM INGLÊS
        en: fields.object({
          title: fields.text({ label: 'Project Title (EN)' }),
          shortDescription: fields.text({ label: 'Short Summary (For Cards - EN)', multiline: true }),
          fullDescription: fields.text({ label: 'Full Detailed Description (For Page - EN)', multiline: true }), // NOVO
          detailedSections: fields.array(
            fields.object({
              sectionTitle: fields.text({ label: 'Section Title (EN)' }),
              content: fields.text({ label: 'Content (EN)', multiline: true }),
              image: fields.image({
                label: 'Section Image (Optional)',
                directory: 'public/images/works/details',
                publicPath: '/images/works/details/',
              }),
            }),
            { label: 'Detailed Sections (EN)', itemLabel: p => p.fields.sectionTitle.value || 'New Section' }
          ),
        }, { label: 'English Content' }),

        // CONTEÚDO EM PORTUGUÊS
        pt: fields.object({
          title: fields.text({ label: 'Título do Projeto (PT)' }),
          shortDescription: fields.text({ label: 'Resumo Curto (Para Cards - PT)', multiline: true }),
          fullDescription: fields.text({ label: 'Descrição Detalhada Completa (Para Página - PT)', multiline: true }), // NOVO
          detailedSections: fields.array(
            fields.object({
              sectionTitle: fields.text({ label: 'Título da Seção (PT)' }),
              content: fields.text({ label: 'Conteúdo (PT)', multiline: true }),
              image: fields.image({
                label: 'Imagem da Seção (Opcional)',
                directory: 'public/images/works/details',
                publicPath: '/images/works/details/',
              }),
            }),
            { label: 'Seções Detalhadas (PT)', itemLabel: p => p.fields.sectionTitle.value || 'Nova Seção' }
          ),
        }, { label: 'Conteúdo em Português' }),
      },
    }),
  },
});