import { PropsWithChildren } from "react";

interface PageHeaderProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children ? <div className="page-header__actions">{children}</div> : null}
    </header>
  );
}
