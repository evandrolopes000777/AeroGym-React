# AeroGym — Frontend Web

Interface web em React para o AeroGym, sistema acadêmico de gestão de academia. O projeto concentra o acesso ao sistema e as ferramentas administrativas disponíveis pela API REST.

## Recursos da interface

- Página inicial de apresentação do AeroGym.
- Tela de login integrada à API, com indicação visual das credenciais de demonstração para avaliação acadêmica.
- Painel administrativo protegido por sessão, com listagem, cadastro, edição e desativação de usuários.
- Navegação entre páginas com React Router e componentes reutilizáveis.
- Layout responsivo para telas de celular e desktop.

O cadastro de um usuário associa a conta a uma pessoa já existente no banco de dados.

## Organização

As páginas ficam em `src/paginas`, os componentes reutilizáveis em `src/componentes` e as chamadas HTTP em `src/servicos`. O projeto usa React, React Router, Vite e CSS.

## Escopo atual

A interface integrada ao backend cobre autenticação e gerenciamento de usuários. As áreas de planos, pagamentos, treinos e controle de acesso ainda não estão disponíveis nesta versão web.

A API REST está no repositório [Back-AeroGym](https://github.com/evandrolopes000777/prg03projetoEvandro). A coleção Postman para validar seus endpoints está em `colecoes/Colecao_AeroGym.postman_collection.json`.
