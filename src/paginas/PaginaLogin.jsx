import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContainerVidro from '../componentes/ContainerVidro.jsx'
import { autenticar } from '../servicos/servicoRequisicoes.js'

const credenciaisTeste = import.meta.env.VITE_TEST_CREDENTIALS

export default function PaginaLogin() {
  const navegar = useNavigate()
  const [login, atualizarLogin] = useState('')
  const [senha, atualizarSenha] = useState('')
  const [erro, atualizarErro] = useState('')
  const [carregando, atualizarCarregando] = useState(false)

  async function enviarFormulario(evento) {
    evento.preventDefault()
    atualizarErro('')
    atualizarCarregando(true)
    try {
      const resposta = await autenticar(login.trim(), senha)
      const usuario = resposta.usuario
      if (usuario.perfil !== 'ADMIN') {
        atualizarErro('O painel administrativo está disponível apenas para administradores.')
        return
      }
      sessionStorage.setItem('aerogym.usuario', JSON.stringify(usuario))
      sessionStorage.setItem('aerogym.token', resposta.token)
      navegar('/paineladm')
    } catch (erroRequisicao) {
      atualizarErro(erroRequisicao.message)
    } finally {
      atualizarCarregando(false)
    }
  }

  return <ContainerVidro tipo="pagina-login">
    <main className="cartao-login">
      <h1>Bem vindo ao Aero Gym!</h1>
      <h2>Faça o seu login!</h2>
      <form id="form-login" onSubmit={enviarFormulario}>
        <div className="campo-formulario">
          <label htmlFor="login">Login</label>
          <input type="text" id="login" name="login" autoComplete="username" required
            placeholder="Digite seu login" value={login} onChange={(evento) => atualizarLogin(evento.target.value)} />
        </div>
        <div className="campo-formulario">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="senha" autoComplete="current-password" required
            placeholder="Digite sua senha" value={senha} onChange={(evento) => atualizarSenha(evento.target.value)} />
        </div>
        {erro && <span className="mensagem-erro" role="alert">{erro}</span>}
        <button type="submit" className="botao botao-primario" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Login'}
        </button>
      </form>
    </main>
    <aside className="credenciais-demonstracao" aria-label="Credenciais para avaliação">
      <h2>Acesso para avaliação</h2>
      <p><strong>Login:</strong> <code>{credenciaisTeste.login}</code></p>
      <p><strong>Senha:</strong> <code>{credenciaisTeste.senha}</code></p>
    </aside>
  </ContainerVidro>
}
