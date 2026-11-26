export default function LinhaUsuario({ usuario, podeDesativar, onEditar, onDesativar }) {
  const classeDaSituacao = {
    Ativo: 'etiqueta-status status-ativo',
    Inativo: 'etiqueta-status status-inativo',
    Pendente: 'etiqueta-status status-pendente',
  }[usuario.situacao] ?? 'etiqueta-status'

  return (
    <tr>
      <td data-label="ID">{usuario.id}</td>
      <td data-label="Nome">{usuario.nome}</td>
      <td data-label="Login">{usuario.login}</td>
      <td data-label="Perfil">{usuario.perfil}</td>
      <td data-label="Status"><span className={classeDaSituacao}>{usuario.situacao}</span></td>
      <td data-label="Ações" className="acoes-usuario">
        <button type="button" className="botao botao-editar" onClick={onEditar}>
          Editar
        </button>
        <button type="button" className="botao botao-excluir" disabled={!podeDesativar} onClick={onDesativar}>
          Desativar
        </button>
      </td>
    </tr>
  )
}
