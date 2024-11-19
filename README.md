
# Filmes API Project

Este é um projeto Angular que consome a API do OMDB para exibir filmes com base em um termo de pesquisa. O projeto foi criado com Angular CLI 17.3.11 e Node.js 18.17.0.

## Funcionalidades

- Busca de filmes usando a API do OMDB.
- Exibição de filmes com título, ano de lançamento e pôster.
- Tratamento básico de erros durante a busca.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 18.17.0 ou superior)
- [Angular CLI](https://angular.io/cli) (versão 17.3.11 ou superior)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/joaovflorisvaldo/filmesApp
   cd filmesApp
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

## Configuração

1. **Adicione sua chave de API do OMDB:**
   Abra `movies.component.ts` e substitua `YOUR_API_KEY` pela sua chave de API do OMDB:
   ```typescript
   private apiKey = 'YOUR_API_KEY';
   ```

## Estrutura do Projeto

```
src/
├── app/
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── main.ts
│   ├── movies/
│   │   ├── movies.component.css
│   │   ├── movies.component.html
│   │   ├── movies.component.ts
│   └── omdb.service.ts
```

## Como Rodar o Projeto

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   ng serve
   ```

2. **Acesse a aplicação em seu navegador:**
   ```
   http://localhost:4200/
   ```

## Uso

Ao carregar a aplicação, você verá uma lista de filmes exibida com base no termo de pesquisa definido em `movies.component.ts`. O termo de pesquisa inicial é `Avengers`, mas você pode modificá-lo conforme necessário.

## Personalização

- **Modifique o termo de pesquisa**: Edite a propriedade `searchQuery` no `MoviesComponent`.
- **Adapte o layout**: Personalize o arquivo `movies.component.css` para alterar o estilo dos elementos de exibição.

## Tecnologias Utilizadas

- **Angular CLI 17.3.11**
- **Node.js 18.17.0**
- **OMDB API** para busca de filmes
- **HttpClient** do Angular para fazer requisições HTTP

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

**Observação:** Esse projeto foi desenvolvido como exemplo para fins de aprendizado e prática de Angular e consumo de APIs externas.
