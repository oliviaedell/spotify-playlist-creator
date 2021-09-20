import "./ErrorComponent.css"

type errorProps = {
  message: string
}
const ErrorComponent = ({ message }: errorProps) => {
  return (
    <>
      <p>Something Went Wrong!</p>
      <p>{message}</p>
    </>
  )
}

export default ErrorComponent
