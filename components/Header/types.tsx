export type HeaderMenuItem = {
  label: string;
  link?: string;
  subMenu?: {
    title: string;
    list: {
      label: string;
      link: string;
    }[];
  }[];
};

export type HeaderMenuConfig = HeaderMenuItem[];
