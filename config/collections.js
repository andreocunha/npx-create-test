const collections = [
  {
    label: 'Criação de posts no blog',
    name: 'blog',
    fields: [
      {
        name: "title",
        type: "text",
        placeholder: "Titulo do post",
      },
      {
        name: "body",
        type: "text",
        placeholder: "Conteúdo do post",
      },
      {
        name: "tags",
        type: "text",
        placeholder: "Tags",
      },
      {
        name: "image",
        type: "file",
        placeholder: "Imagem",
      }
    ]
  },
  {
    label: 'Galeria de imagens',
    name: 'galeria',
    fields: [
      {
        name: "title",
        type: "text",
        placeholder: "Nome da galeria",
      },
      {
        name: "image1",
        type: "file",
        placeholder: "Imagem 1",
      },
      {
        name: "image2",
        type: "file",
        placeholder: "Imagem 2",
      },
      {
        name: "image3",
        type: "file",
        placeholder: "Imagem 3",
      }
    ]
  }
]

export default collections;