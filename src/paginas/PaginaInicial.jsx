import { Link } from 'react-router-dom'
import ContainerVidro from '../componentes/ContainerVidro.jsx'

export default function PaginaInicial() {
  return <ContainerVidro tipo="pagina-inicial">
    <h1>Sistema Aero Gym</h1>
    <main className="grade-inicial">
      <section className="texto-inicial">
        <h2>Sobre o Aero Gym</h2>
        <p>O Aero Gym é um sistema desenvolvido para facilitar a gestão de academias, reunindo em um único ambiente ferramentas para o cadastro de alunos, controle financeiro, organização de treinos e gerenciamento de acesso.</p>
        <h2>Organização e praticidade</h2>
        <p>Com o Aero Gym, as principais informações da academia podem ser organizadas de forma simples e centralizada, facilitando o acompanhamento dos alunos e das atividades do dia a dia.</p>
      </section>
      <aside className="cartao-funcionalidades">
        <h2>Funcionalidades do sistema</h2>
        <p>O sistema contará com recursos voltados para diferentes áreas da academia, permitindo alunos, treinos, pagamentos e acessos de maneira integrada.</p>
        <Link to="/formulario" className="botao botao-primario">Acessar Painel</Link>
      </aside>
    </main>
  </ContainerVidro>
}
