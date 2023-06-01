import { ProductTag as ProductTagEntry } from "../../api/types";

type ProductTagProps = {
  label: string;
  value: string;
};

export default function ProductTag({ label, value }: ProductTagProps) {
  return (
    <li className="flex items-center gap-5">
      <div className="bg-secondary text-white leading-[1.5rem] py-1 px-[10px]">
        {label}
      </div>
      <div className="text-body leading-[1.5rem]">{value}</div>
    </li>
  );
}
