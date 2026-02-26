import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // Quando você for para produção, mudaremos para 'github'
    kind: 'local',
  },
  collections: {
    works: collection({
      label: 'Trabalhos / Portfólio',
      slugField: 'title',
      path: 'src/content/works/*/',
      format: { data: 'json' }, // Salvamos os dados como JSON para facilitar
      schema: {
        title: fields.slug({ name: { label: 'Título do Trabalho' } }),
        shortDescription: fields.text({ label: 'Descrição Curta (Aparece no Card)', multiline: true }),
        
        // As tags do projeto (ex: Astro, React, Stripe)
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tecnologias / Tags', itemLabel: props => props.value }
        ),
        
        // A imagem principal do Card
        thumbnail: fields.image({
          label: 'Thumbnail do Projeto',
          directory: 'public/images/works',
          publicPath: '/images/works/',
        }),

        // Links de acesso
        demoLink: fields.url({ label: 'Link do Projeto (Opcional)' }),
        repoLink: fields.url({ label: 'Link do Repositório (Opcional)' }),

        // A MÁGICA DOS BLOCOS INTERCALADOS:
        // Aqui você pode adicionar quantos blocos quiser. O Astro vai ler isso e
        // colocar a imagem na direita, depois esquerda, depois direita...
        detailedSections: fields.array(
          fields.object({
            sectionTitle: fields.text({ label: 'Título da Seção (Ex: O Desafio, Tecnologias)' }),
            content: fields.text({ label: 'Conteúdo/Texto da Seção', multiline: true }),
            image: fields.image({
              label: 'Imagem ao lado do texto (Opcional)',
              directory: 'public/images/works/details',
              publicPath: '/images/works/details/',
            }),
          }),
          {
            label: 'Seções Detalhadas (Textos e Imagens intercaladas)',
            itemLabel: props => props.fields.sectionTitle.value || 'Nova Seção'
          }
        )
      },
    }),
  },
});