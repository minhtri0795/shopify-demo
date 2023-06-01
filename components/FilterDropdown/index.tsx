import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Arrow from "../Icons/Arrow";

type DropdownOption = {
  label: string;
  value: string | boolean;
  onClick: (value: string) => void;
};

type FilterDropdown = {
  placeholder?: string;
  list: Omit<DropdownOption, "onClick">[];

  onChange?: (value: string) => void;
  value?: string | boolean;
  menuClassName?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MenuItem = ({ label, value, onClick }: DropdownOption) => {
  return (
    <Menu.Item>
      {({ active }: { active: boolean }) => (
        <a
          onClick={() => onClick(value as any)}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm cursor-pointer"
          )}
        >
          {label}
        </a>
      )}
    </Menu.Item>
  );
};

export default function FilterDropdown({
  placeholder,
  list,
  onChange,
  value,
  menuClassName,
}: FilterDropdown) {
  const optionOnClickHander = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const mapValueToLabel = (value?: string | boolean) => {
    if (!value) return false;

    const option = list.find((option) => option.value === value);
    if (!option) return value;

    return option.label;
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex text-body justify-center items-center text-black gap-2 hover:text-secondary transition-colors group">
            {mapValueToLabel(value) || placeholder}
            <Arrow className="group-hover:fill-secondary transition-colors" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`origin-top-right absolute z-10 left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${menuClassName}`}
          >
            <div className="py-1">
              {list.map((item, index) => (
                <MenuItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  onClick={(value) => optionOnClickHander(value)}
                />
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
