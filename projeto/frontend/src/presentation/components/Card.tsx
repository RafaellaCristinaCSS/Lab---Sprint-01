import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  title?: string;
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      {title ? <h3 className="card__title">{title}</h3> : null}
      {children}
    </section>
  );
}
