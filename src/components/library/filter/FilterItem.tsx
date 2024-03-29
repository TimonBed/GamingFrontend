import { useState } from "react";

interface FilterItemProps {
  title: string;
}

const FilterItem = ({ title = "Error" }: FilterItemProps) => {
  const [active, setActive] = useState(false);
  return (
    // highlight when active
    <div
      className={` cursor-pointer flex flex-row justify-left pl-5 w-full h-10 items-center rounded active:bg-brandgray-300/30 hover:bg-brandgray-300/10 ${
        active ? " bg-brandgray-600" : ""
      }`}
      onClick={() => setActive(!active)}
    >
      <p className="text-slate-400">{title}</p>
    </div>
  );
};

export default FilterItem;
