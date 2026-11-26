import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Cabecalho from './componentes/Cabecalho.jsx'
import Rodape from './componentes/Rodape.jsx'
import PaginaInicial from './paginas/PaginaInicial.jsx'
import PaginaLogin from './paginas/PaginaLogin.jsx'
import PaginaAdmin from './paginas/PaginaAdmin.jsx'
import './global.css'

function lerUsuarioDaSessao() {
  try { return JSON.parse(sessionStorage.getItem('aerogym.usuario') || 'null') }
  catch { return null }
}

function PainelProtegido() {
  const usuario = lerUsuarioDaSessao()
  const token = sessionStorage.getItem('aerogym.token')
  return usuario?.perfil === 'ADMIN' && token
    ? <PaginaAdmin />
    : <Navigate to="/formulario" replace />
}

export default function Aplicacao() {
  const { pathname: caminhoAtual } = useLocation()
  const estaNaPaginaLogin = caminhoAtual === '/formulario'
  const estaNoPainelAdmin = caminhoAtual === '/paineladm'
  const linksCabecalho = estaNoPainelAdmin
    ? [{ texto: 'Início', caminho: '/' }]
    : [{ texto: 'Login', caminho: '/formulario' }]

  return <>
    {!estaNaPaginaLogin && <Cabecalho linksNavegacao={linksCabecalho} />}
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/formulario" element={<PaginaLogin />} />
      <Route path="/paineladm" element={<PainelProtegido />} />
      <Route path="*" element={<PaginaInicial />} />
    </Routes>
    {!estaNoPainelAdmin && <Rodape />}
  </>
}
