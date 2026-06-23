export function Loading({ message = "Carregando dados..." }: { message?: string }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <div className="loader" />
      <span>{message}</span>
    </div>
  );
}
