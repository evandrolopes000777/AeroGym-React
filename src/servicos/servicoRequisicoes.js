const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function requisitar(caminho, opcoes = {}) {
  const token = sessionStorage.getItem('aerogym.token')
  const headers = { 'Content-Type': 'application/json', ...opcoes.headers }
  if (token) headers.Authorization = 'Bearer ' + token

  let resposta
  try {
    resposta = await fetch(API_BASE + caminho, { ...opcoes, headers })
  } catch {
    throw new Error('Não foi possível conectar à API. Confira se o backend está ativo.')
  }

  const texto = await resposta.text()
  const dados = texto ? JSON.parse(texto) : null
  if (!resposta.ok) {
    throw new Error(dados?.mensagem || dados?.detail || 'Não foi possível processar a solicitação.')
  }
  return dados
}

export function autenticar(login, senha) {
  return requisitar('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ login, senha }),
  })
}

export function listarUsuarios() {
  return requisitar('/usuarios')
}

export function cadastrarUsuario(usuario) {
  return requisitar('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  })
}

export function atualizarUsuario(id, usuario) {
  return requisitar('/usuarios/' + id, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  })
}

export function desativarUsuario(id) {
  return requisitar('/usuarios/' + id, { method: 'DELETE' })
}

export function encerrarSessao() {
  return requisitar('/usuarios/sessao', { method: 'DELETE' })
}
