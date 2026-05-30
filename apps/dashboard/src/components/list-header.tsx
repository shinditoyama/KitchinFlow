interface ListHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function ListHeader({ title, description, children }: ListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
