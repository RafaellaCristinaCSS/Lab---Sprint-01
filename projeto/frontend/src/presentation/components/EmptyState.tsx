interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="state state--empty">
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}
