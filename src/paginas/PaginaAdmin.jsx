import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContainerVidro from '../componentes/ContainerVidro.jsx'
import LinhaUsuario from '../componentes/LinhaUsuario.jsx'
import {
  atualizarUsuario,
  cadastrarUsuario,
  desativarUsuario,
  encerrarSessao,
  listarUsuarios,
} from '../servicos/servicoRequisicoes.js'

const FORMULARIO_VAZIO = { login: '', senha: '', perfil: 'ALUNO', pessoaId: '' }

export default function PaginaAdmin() {
  const navegar = useNavigate()
  const [usuarios, atualizarUsuarios] = useState([])
  const [erro, atualizarErro] = useState('')
  const [carregando, atualizarCarregando] = useState(true)
  const [salvando, atualizarSalvando] = useState(false)
  const [usuarioEmEdicao, atualizarUsuarioEmEdicao] = useState(null)
  const [formulario, atualizarFormulario] = useState(FORMULARIO_VAZIO)
  const [usuarioLogado] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('aerogym.usuario') || 'null') }
    catch { return null }
  })

  useEffect(() => {
    let cancelado = false
    listarUsuarios()
      .then((dados) => { if (!cancelado) atualizarUsuarios(dados) })
      .catch((erroRequisicao) => { if (!cancelado) atualizarErro(erroRequisicao.message) })
      .finally(() => { if (!cancelado) atualizarCarregando(false) })
    return () => { cancelado = true }
  }, [])

  async function sair() {
    try { await encerrarSessao() } catch { /* Limpa a sessão local mesmo se a API já a encerrou. */ }
    sessionStorage.removeItem('aerogym.usuario')
    sessionStorage.removeItem('aerogym.token')
    navegar('/formulario')
  }

  async function removerUsuario(usuario) {
    if (!window.confirm('Desativar o usuário "' + usuario.login + '"?')) return
    try {
      await desativarUsuario(usuario.id)
      atualizarUsuarios((atuais) => atuais.filter((item) => item.id !== usuario.id))
    } catch (erroRequisicao) {
      atualizarErro(erroRequisicao.message)
    }
  }

  function iniciarCadastro() {
    atualizarErro('')
    atualizarUsuarioEmEdicao(null)
    atualizarFormulario(FORMULARIO_VAZIO)
  }

  function iniciarEdicao(usuario) {
    atualizarErro('')
    atualizarUsuarioEmEdicao(usuario)
    atualizarFormulario({
      login: usuario.login,
      senha: '',
      perfil: usuario.perfil,
      pessoaId: usuario.pessoa?.id ?? '',
    })
  }

  async function salvarUsuario(evento) {
    evento.preventDefault()
    atualizarErro('')
    atualizarSalvando(true)
    const dados = {
      login: formulario.login.trim(),
      senha: formulario.senha,
      perfil: formulario.perfil,
      pessoaId: Number(formulario.pessoaId),
    }

    try {
      if (usuarioEmEdicao) {
        const atualizado = await atualizarUsuario(usuarioEmEdicao.id, dados)
        atualizarUsuarios((atuais) => atuais.map((item) => item.id === atualizado.id ? atualizado : item))
      } else {
        const criado = await cadastrarUsuario(dados)
        atualizarUsuarios((atuais) => [...atuais, criado])
      }
      iniciarCadastro()
    } catch (erroRequisicao) {
      atualizarErro(erroRequisicao.message)
    } finally {
      atualizarSalvando(false)
    }
  }

  return <ContainerVidro tipo="pagina-admin">
    <main>
      <div className="cabecalho-painel">
        <h1>Gerenciamento de Usuários</h1>
        <button className="botao botao-primario" type="button" onClick={sair}>Sair</button>
      </div>
      {erro && <p className="mensagem-erro" role="alert">{erro}</p>}
      <section className="secao-usuario" aria-labelledby="titulo-formulario-usuario">
        <h2 id="titulo-formulario-usuario">{usuarioEmEdicao ? 'Editar usuário' : 'Cadastrar usuário'}</h2>
        <form className="formulario-usuario" onSubmit={salvarUsuario}>
          <label className="campo-formulario">
            Login
            <input required maxLength="50" autoComplete="username" value={formulario.login}
              onChange={(evento) => atualizarFormulario({ ...formulario, login: evento.target.value })} />
          </label>
          <label className="campo-formulario">
            Senha {usuarioEmEdicao && <span>(deixe em branco para manter)</span>}
            <input type="password" autoComplete="new-password"
              required={!usuarioEmEdicao} value={formulario.senha}
              onChange={(evento) => atualizarFormulario({ ...formulario, senha: evento.target.value })} />
          </label>
          <label className="campo-formulario">
            Perfil
            <select required value={formulario.perfil}
              onChange={(evento) => atualizarFormulario({ ...formulario, perfil: evento.target.value })}>
              <option value="ALUNO">Aluno</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </label>
          <label className="campo-formulario">
            ID da pessoa
            <input type="number" min="1" required value={formulario.pessoaId}
              onChange={(evento) => atualizarFormulario({ ...formulario, pessoaId: evento.target.value })} />
          </label>
          <div className="acoes-formulario">
            <button className="botao botao-primario" type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : usuarioEmEdicao ? 'Salvar alterações' : 'Cadastrar usuário'}
            </button>
            {usuarioEmEdicao && <button className="botao" type="button" onClick={iniciarCadastro}>Cancelar edição</button>}
          </div>
        </form>
      </section>
      {carregando ? <p>Carregando usuários...</p> : (
        <div className="rolagem-tabela">
          <table className="tabela-usuarios">
            <thead><tr><th>ID</th><th>Nome</th><th>Login</th><th>Perfil</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>{usuarios.map((usuario) => (
              <LinhaUsuario key={usuario.id} usuario={{
                ...usuario,
                nome: usuario.pessoa?.nome || 'Pessoa sem nome',
                situacao: usuario.ativo ? 'Ativo' : 'Inativo',
              }} podeDesativar={usuario.id !== usuarioLogado?.id} onEditar={() => iniciarEdicao(usuario)}
              onDesativar={() => removerUsuario(usuario)} />
            ))}</tbody>
          </table>
          {!usuarios.length && <p>Nenhum usuário ativo encontrado.</p>}
        </div>
      )}
    </main>
  </ContainerVidro>
}
