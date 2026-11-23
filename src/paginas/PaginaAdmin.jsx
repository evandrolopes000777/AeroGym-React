import ContainerVidro from '../componentes/ContainerVidro.jsx'
import LinhaUsuario from '../componentes/LinhaUsuario.jsx'

const usuarios = [
  { id: 1, nome: 'Ana Souza', email: 'ana.souza@email.com', situacao: 'Ativo' },
  { id: 2, nome: 'Carlos Mendes', email: 'carlos.m@email.com', situacao: 'Inativo' },
  { id: 3, nome: 'Mariana Alves', email: 'mariana.alves@email.com', situacao: 'Ativo' },
  { id: 4, nome: 'João Pedro', email: 'joao.p@email.com', situacao: 'Pendente' },
  { id: 5, nome: 'Beatriz Lima', email: 'bia.lima@email.com', situacao: 'Ativo' },
]

export default function PaginaAdmin() {
  return <ContainerVidro tipo="pagina-admin">
    <main>
      <h1>Gerenciamento de Usuários</h1>
      <div className="rolagem-tabela">
        <table className="tabela-usuarios">
          <thead><tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Status</th><th>Ações</th></tr></thead>
          <tbody>{usuarios.map((usuario) => <LinhaUsuario key={usuario.id} usuario={usuario} />)}</tbody>
        </table>
      </div>
    </main>
  </ContainerVidro>
}
