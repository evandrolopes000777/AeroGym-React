import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cabecalho({ linksNavegacao }) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="cabecalho">
      <div className="barra-cabecalho">
        <Link className="marca" to="/">Aero Gym</Link>
        <button
          className="botao-menu"
          type="button"
          aria-expanded={menuAberto}
          aria-controls="links-navegacao"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span /><span /><span />
        </button>
        <nav id="links-navegacao" className={menuAberto ? 'links-navegacao aberto' : 'links-navegacao'} aria-label="Navegação principal">
          {linksNavegacao.map((link) => (
            <Link key={link.caminho} to={link.caminho} onClick={() => setMenuAberto(false)}>{link.texto}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
