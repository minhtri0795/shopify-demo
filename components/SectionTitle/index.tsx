type SectionTitle = {
  subtitle: string;
  title: string;
};

export default function SectionTitle({ subtitle, title }: SectionTitle) {
  return (
    <div className="text-center">
      <span className="text-secondary-1 text-subtitle">{subtitle}</span>
      <h2 className="text-h4 font-serif">{title}</h2>
    </div>
  );
}
