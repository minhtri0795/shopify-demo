import { HomeResponse } from "../../api/types";
import SectionTitle from "../SectionTitle";
import { Tab } from "@headlessui/react";
import ListProductCard from "../ListProductCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const StyledTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    className={({ selected }: { selected: boolean }) =>
      classNames(
        "rounded-lg py-2.5 text-[1.125rem] leading-[2rem] focus:outline-none",
        selected
          ? "text-secondary"
          : "text-black hover:text-secondary transition-colors"
      )
    }
  >
    {children}
  </Tab>
);

type HomeProductsProps = HomeResponse["homeProduct"];
export default function HomeProducts(props: HomeProductsProps) {
  const { sectionTitle, productTab } = props;

  return (
    <div className="container m-auto">
      <SectionTitle {...sectionTitle} />
      <div>
        <Tab.Group>
          <Tab.List className="flex gap-[42px] justify-center mt-[50px] mb-[43px]">
            {productTab.map((tab) => (
              <StyledTab key={tab.id}>{tab.label}</StyledTab>
            ))}
          </Tab.List>
          <Tab.Panels className="w-full">
            {productTab.map((tab) => (
              <Tab.Panel
                key={tab.id}
                className="grid grid-cols-4 md:grid-cols-12 gap-[44px]"
              >
                {tab.products.map((product) => (
                  <div key={product.id} className="col-span-4">
                    {product.product.data && (
                      <ListProductCard {...product.product.data.attributes} />
                    )}
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
