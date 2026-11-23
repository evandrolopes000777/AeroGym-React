export default function LinhaUsuario({ usuario }) {
  const classeDaSituacao = {
    Ativo: 'etiqueta-status status-ativo',
    Inativo: 'etiqueta-status status-inativo',
    Pendente: 'etiqueta-status status-pendente',
  }[usuario.situacao] ?? 'etiqueta-status'

  return (
    <tr>
      <td data-label="ID">{usuario.id}</td>
      <td data-label="Nome">{usuario.nome}</td>
      <td data-label="E-mail">{usuario.email}</td>
      <td data-label="Status"><span className={classeDaSituacao}>{usuario.situacao}</span></td>
      <td data-label="Ações" className="acoes-usuario"><button type="button" className="botao botao-editar">Editar</button><button type="button" className="botao botao-excluir">Excluir</button></td>
    </tr>
  )
}
