import Image from "next/image";
import { useRouter } from "next/router";
import Dropdown from "../FilterDropdown";
import LangIcon from "../../public/lang.svg";

const langs = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "繁體中文",
    value: "zh",
  },
];

export default function LangSwitcher() {
  const router = useRouter();

  const path = router.asPath;
  const locale = router.locale;

  return (
    <div>
      <div className="mr-20 hidden md:flex gap-3 items-center">
        <Dropdown
          menuClassName="right-0 left-[unset]"
          onChange={(value) => {
            if (value === "en") {
              window.location = `${path}` as any;
            } else {
              window.location = `/${value}/${path}` as any;
            }
          }}
          value={locale}
          list={langs}
        />
        <Image src={LangIcon} alt="global icon" />
      </div>
      <ul className="md:hidden flex flex-col gap-4">
        {langs.map((lang) => (
          <li key={lang.value}>
            {lang.value === "en" ? (
              <a className="cursor-pointer" href={`${path}`}>
                {lang.label}
              </a>
            ) : (
              <a className="cursor-pointer" href={`/${lang.value}/${path}`}>
                {lang.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
