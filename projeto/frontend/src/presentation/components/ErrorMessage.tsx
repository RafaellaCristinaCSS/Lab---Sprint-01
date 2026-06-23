interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = "Nao foi possivel carregar os dados." }: ErrorMessageProps) {
  return (
    <div className="state state--error" role="alert">
      <strong>Erro</strong>
      <span>{message}</span>
    </div>
  );
}
