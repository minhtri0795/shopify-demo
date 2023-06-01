import { Fragment, useState, useRef } from "react";
import Link from "next/link";
import ArrowDown from "@heroicons/react/outline/ChevronDownIcon";
import { HeaderResponse } from "../../api/types";
import LangSwitcher from "../LangSwitcher";

type MobileHeaderMenuProps = {
  menu: HeaderResponse["menu"];
  onClose: () => void;
};

type MenuItemProps<T> = {
  menuItem: T extends (infer U)[] ? U : never;
  onClose: () => void;
};

const MenuItem = ({
  menuItem,
  onClose,
}: MenuItemProps<HeaderResponse["menu"]>) => {
  const [open, setOpen] = useState(false);
  const subMenuRef = useRef<HTMLUListElement>(null);
  const hasSubMenu = !!(menuItem.subMenu && menuItem.subMenu.length !== 0);

  const subMenuHeight = subMenuRef.current?.getBoundingClientRect().height;

  return (
    <li>
      <button
        onClick={() => setOpen((open) => !open)}
        className="flex gap-1 justify-between items-center w-full mb-4"
      >
        {!hasSubMenu ? (
          <Link href={menuItem.link || ""}>
            <a className="text-h5" onClick={onClose}>
              {menuItem.label}
            </a>
          </Link>
        ) : (
          <span className="text-h5">{menuItem.label}</span>
        )}

        {hasSubMenu && (
          <span>
            <ArrowDown className="w-4 h-4" />
          </span>
        )}
      </button>
      {hasSubMenu && (
        <div
          className="h-0 overflow-hidden"
          style={{
            height: open ? subMenuHeight : 0,
            transition: "height 0.2s",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <ul className="ml-4 flex flex-col gap-3 pb-4" ref={subMenuRef}>
            {menuItem.subMenu?.map((item) => (
              <li key={item.id}>
                <span className="block font-bold mb-2">{item.title}</span>
                <ul className="ml-4 flex flex-col gap-2">
                  {item.list.map((item) => (
                    <li key={item.id}>
                      <Link href={item.link || ""}>
                        <a onClick={() => onClose()}>{item.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default function MobileHeaderMenu({
  menu,
  onClose,
}: MobileHeaderMenuProps) {
  return (
    <ul className="flex flex-col">
      {menu.map((item) => (
        <MenuItem menuItem={item} key={item.id} onClose={onClose} />
      ))}
    </ul>
  );
}
