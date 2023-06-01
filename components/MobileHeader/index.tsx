import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import XIcon from "@heroicons/react/solid/XIcon";
import Menu from "@heroicons/react/solid/MenuIcon";
import { HeaderResponse } from "../../api/types";
import HeaderLogo from "../../public/header_logo.svg";
import MobileHeaderMenu from "./MobileHeaderMenu";
import LangSwitcher from "../LangSwitcher";

type MobileHeaderMenuProps = {
  menu: HeaderResponse["menu"];
};

export default function MobileHeader({ menu }: MobileHeaderMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center bg-white h-14 px-8">
      <Link href="/">
        <a>
          <Image src={HeaderLogo} width={50} alt="header logo" />
        </a>
      </Link>
      <button onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed right-0 inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-[100vw]"
              enterTo="translate-x-[calc(100vw-320px)]"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-[calc(100vw-320px)]"
              leaveTo="translate-x-[100vw]"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-4 pb-4 flex justify-end items-center border-b border-gray-200">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-4 pt-4">
                  <MobileHeaderMenu
                    menu={menu}
                    onClose={() => setOpen(false)}
                  />
                </div>

                <div className="px-4 pt-4 border-t border-gray-200">
                  <LangSwitcher />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
