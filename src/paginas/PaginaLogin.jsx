import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContainerVidro from '../componentes/ContainerVidro.jsx'

export default function PaginaLogin() {
  const navegar = useNavigate()
  const [email, atualizarEmail] = useState('')
  const [senha, atualizarSenha] = useState('')
  const [erroEmail, atualizarErroEmail] = useState('')
  const [erroSenha, atualizarErroSenha] = useState('')

  function enviarFormulario(evento) {
    evento.preventDefault()
    const emailAtual = email.trim()
    const senhaAtual = senha.trim()
    const expressaoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let formularioValido = true
    atualizarErroEmail('')
    atualizarErroSenha('')
    if (!emailAtual) { atualizarErroEmail('O campo de e-mail é obrigatório.'); formularioValido = false }
    else if (!expressaoEmail.test(emailAtual)) { atualizarErroEmail('Por favor, insira um e-mail válido (ex: nome@email.com).'); formularioValido = false }
    if (!senhaAtual) { atualizarErroSenha('O campo de senha é obrigatório.'); formularioValido = false }
    if (formularioValido) navegar('/paineladm')
  }

  return <ContainerVidro tipo="pagina-login">
    <main className="cartao-login">
      <h1>Bem vindo ao Aero Gym!</h1>
      <h2>Faça o seu login!</h2>
      <form id="form-login" onSubmit={enviarFormulario}>
        <div className="campo-formulario">
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="Usuario" placeholder="Digite seu e-mail" value={email} onChange={(evento) => atualizarEmail(evento.target.value)} />
          {erroEmail && <span className="mensagem-erro" id="erro-email">{erroEmail}</span>}
        </div>
        <div className="campo-formulario">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="Senha" placeholder="Digite sua Senha" value={senha} onChange={(evento) => atualizarSenha(evento.target.value)} />
          {erroSenha && <span className="mensagem-erro" id="erro-senha">{erroSenha}</span>}
        </div>
        <button type="submit" className="botao botao-primario">Login</button>
      </form>
    </main>
  </ContainerVidro>
}
