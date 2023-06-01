import Link from "next/link";
import { Footer } from "../../api/types";

type FooterMenuProps = {
  menu: Footer["footerMenu"];
};

export default function FooterMenu({ menu }: FooterMenuProps) {
  return (
    <div className="gap-6 md:gap-[63px] grid grid-cols-12">
      {menu.map((item, index) => (
        <ul
          key={index}
          className="col-span-6 md:col-span-3 flex flex-col items-center md:items-start"
        >
          <h3 className="text-body font-bold">{item.label}</h3>
          {item.subMenu.map((item, index) => (
            <li key={index} className="text-subtitle">
              <Link href={item.link}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
