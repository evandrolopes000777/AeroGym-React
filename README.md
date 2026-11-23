# Sistema de Gestão de Academia - Interface Web

Este projeto abriga a interface web para o Sistema de Gestão de Academia, agora desenvolvido com React, com o objetivo de substituir o controle manual por uma solução digital completa.

## 🎯 Funcionalidades

* **Acesso ao Sistema:** Tela de login com validação de e-mail e senha. A autenticação ainda é demonstrativa e não está conectada a um servidor.

* **Painel Administrativo:** Exibição de usuários e seus status. Os botões de edição e exclusão são apenas visuais nesta etapa.

* **Navegação entre Páginas:** A aplicação utiliza React Router DOM para navegar entre a página inicial, o login e o painel administrativo.

O layout e as permissões de acesso serão divididos entre dois atores principais: o Administrador, que possui acesso total aos cadastros, pagamentos e treinos, e o Aluno, que visualizará sua própria ficha de treino e a situação do seu plano.

## 🗂️ Estrutura inicial do Projeto

* 📄 **`index.html`**: Documento principal e ponto de entrada da aplicação React.

* 📁 **`src/`**: Pasta com o código-fonte da aplicação.
  * 📄 **`App.jsx`**: Define as rotas e organiza a aplicação.
  * 📄 **`main.jsx`**: Inicializa o React e o React Router DOM.
  * 📄 **`global.css`**: Folha de estilos global, incluindo o layout responsivo.
  * 📁 **`componentes/`**: Componentes reutilizáveis da interface.
    * 📄 **`Cabecalho.jsx`**: Cabeçalho com menu de navegação adaptado para celular.
    * 📄 **`ContainerVidro.jsx`**: Contêiner visual utilizado nas páginas.
    * 📄 **`LinhaUsuario.jsx`**: Linha de usuário e exibição do status na tabela.
    * 📄 **`Rodape.jsx`**: Rodapé das páginas inicial e de login.
  * 📁 **`paginas/`**: Páginas da aplicação.
    * 📄 **`PaginaInicial.jsx`**: Apresentação do Aero Gym.
    * 📄 **`PaginaLogin.jsx`**: Formulário de login e validação dos campos.
    * 📄 **`PaginaAdmin.jsx`**: Painel administrativo com a lista de usuários.

* 📁 **`public/assets/`**: Recursos estáticos utilizados pela aplicação.
  * 📁 **`icons/`**: Ícone (favicon) exibido na aba do navegador.
  * 📁 **`images/background/`**: Imagem de fundo das páginas.

* 📄 **`package.json`**: Dependências e comandos do projeto.
* 📄 **`vite.config.js`**: Configuração do Vite.
* 📄 **`vercel.json`**: Regra de navegação para as rotas da aplicação quando hospedada na Vercel.

## 🚀 Evolução Futura da Estrutura

A estrutura atual poderá ser expandida para suportar os requisitos funcionais do sistema, como cadastro e gestão de alunos, controle de planos e pagamentos e criação e visualização de fichas de treino.

## ▶️ Executando o Projeto

Na pasta do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Para gerar a versão de produção, execute:

```bash
npm run build
```
