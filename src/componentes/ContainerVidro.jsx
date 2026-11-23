export default function ContainerVidro({ children, tipo = '' }) {
  return <div className={'container-vidro ' + tipo}>{children}</div>
}
