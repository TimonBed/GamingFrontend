import React, { useEffect, useState } from "react";
import axios from "../../../AxiosInterceptors";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Games {
  id: number;
  name: string;
  game_category: string;
  release_date: string;
  image: string;
}

interface FilterInputProps {
  apiEndpoint: string;
  name: string;
}

export const FilterInput = ({ apiEndpoint, name }: FilterInputProps) => {
  const [items, setItems] = useState<Games[]>([]);
  const [filtered, setFiltered] = useState<Games[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState<Games[]>([]);
  const [current, setCurrent] = useState(0);
  const [hasFetchedItems, setHasFetchedItems] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    filteroutSelected(items);
  };

  const closeDropdown = () => {
    setIsFocused(false);
    setCurrent(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setItems(response.data);
        setFiltered(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isFocused && !hasFetchedItems) {
      fetchData();
      setHasFetchedItems(true);
    }
  }, [isFocused, hasFetchedItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert input value to lowercase for case-insensitive comparison
    const inputValue = e.target.value.toLowerCase();

    // Filter items based on input, ignoring case
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );
    filteroutSelected(filteredItems);
    setCurrent(0);
  };

  const handleItemClick = (item: Games) => {
    // Update the selected items
    setSelected((prev) => [...prev, item]);

    // Remove the selected item from the dropdown
    setFiltered((prev) => prev.filter((i) => i.id !== item.id));
  };

  const filteroutSelected = (filteredItems: Games[]) => {
    // Filter out selected items from the dropdown
    const filteredItemsWithoutSelected = filteredItems.filter(
      (item) => !selected.some((selectedItem) => selectedItem.id === item.id)
    );
    setFiltered(filteredItemsWithoutSelected);
  };

  const handleDropdownItemClick = (index: number) => {
    setSelected((prev) => [...prev, filtered[index]]);
  };

  const handleDropDownNavigation = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log(e.key);
    if (e.key === "ArrowDown") {
      setCurrent((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setCurrent((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (filtered[current]) {
        handleItemClick(filtered[current]);
      }
      // clear input
      e.currentTarget.value = "";
      setCurrent(0);
    } else if (e.key === "Escape") {
      closeDropdown();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col space-y-2 relative">
      {/* Filter input */}
      <div className="">
        <input
          type="text"
          placeholder={name}
          className="w-full px-4 py-2 bg-gray-800 rounded-md border border-brandprimary/10 focus:border-brandprimary  focus:ring-brandprimary"
          onClick={handleFocus}
          onBlur={closeDropdown}
          onChange={handleChange}
          onKeyDown={handleDropDownNavigation}
        />
      </div>
      {/* dropdown with top 5 items for autocomplete */}
      {isFocused && (
        <div className="w-full p-1 bg-gray-800 rounded-md absolute border border-brandprimary/10 translate-y-9 z-30">
          {filtered.slice(0, 5).map((item, index) => (
            <div
              key={item.id}
              className={`${
                current === index ? "bg-slate-300/20" : ""
              } cursor-pointer flex flex-row justify-left pl-5 w-full h-10 items-center rounded active:bg-slate-300/30 `}
              onMouseDown={() => handleDropdownItemClick(index)}
              onMouseOver={() => setCurrent(index)}
              onKeyDown={handleDropDownNavigation}
            >
              <p className="text-brandtext">{item.name}</p>
            </div>
          ))}
        </div>
      )}
      {/* selected items */}
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <div
            className=" cursor-pointer "
            key={item.id}
            onClick={() =>
              setSelected((prev) => prev.filter((i) => i.id !== item.id))
            }
          >
            <div className="flex flex-row bg-slate-600 rounded items-center py-1 px-2 space-x-1">
              <XMarkIcon className="h-4 w-4" />
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
