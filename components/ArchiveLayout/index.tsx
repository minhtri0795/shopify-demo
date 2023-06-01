import { Media } from "../../api/types";
import ArchiveBanner from "../ArchiveBanner";

type ArchiveLayoutProps = {
  title: string;
  description?: string;
  banner?: {
    data: Media;
  };
  subtitle?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export default function ArchiveLayout({
  title,
  description,
  banner,
  subtitle,
  children,
}: ArchiveLayoutProps) {
  return (
    <div>
      <ArchiveBanner
        title={title}
        description={description}
        banner={banner}
        subtitle={subtitle}
      />
      <div className="mt-[40px] md:mt-[160px]">{children}</div>
    </div>
  );
}
