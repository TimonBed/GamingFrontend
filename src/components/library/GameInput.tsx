import React, { useEffect, useState } from "react";
import axios from "../../AxiosInterceptors";

interface Game {
  id: number;
  game_category: string[];
  name: string;
  release_date: string;
}

interface FilterInputProps {
  oldSelected?: string;
  onChange: (selected: Game) => void;
}

export const GameInput = ({ oldSelected, onChange }: FilterInputProps) => {
  const [items, setItems] = useState<Game[]>([]);
  const [filtered, setFiltered] = useState<Game[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState<Game>({
    id: 0,
    game_category: [],
    name: oldSelected ?? "",
    release_date: "",
  });
  const [current, setCurrent] = useState(0);

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
        const response = await axios.get("references/games/");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

  const handleItemClick = (item: Game) => {
    // Update the selected items
    setSelected(item);
    onChange(item);
  };

  const filteroutSelected = (filteredItems: Game[]) => {
    // Filter out selected items from the dropdown
    const filteredItemsWithoutSelected = filteredItems.filter(
      (item) => item.id !== selected?.id
    );
    setFiltered(filteredItemsWithoutSelected);
  };

  const handleDropdownItemClick = (index: number) => {
    setSelected(filtered[index]);
    onChange(filtered[index]);
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
    <div className=" space-y-1">
      <p className="text-brandtext text-lg font-bold">Game</p>
      <div className="flex flex-col space-y-2 relative">
        {/* Filter input */}
        <div className="">
          <input
            type="text"
            placeholder="Game"
            value={selected?.name || ""}
            className="w-full px-4 py-2 bg-brandgray-800 rounded-md border border-brandgray-500/10 focus:border-brandgray-500  focus:ring-brandgray-500"
            onClick={handleFocus}
            onBlur={closeDropdown}
            onChange={handleChange}
            onKeyDown={handleDropDownNavigation}
          />
        </div>
        {/* dropdown with top 5 items for autocomplete */}
        {isFocused && (
          <div className="w-full p-1 bg-brandgray-800 rounded-md absolute border border-brandgray-500/10 translate-y-9 z-30">
            {filtered.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                className={`${
                  current === index ? "bg-brandgray-300/20" : ""
                } cursor-pointer flex flex-row justify-left pl-5 w-full h-10 items-center rounded active:bg-brandgray-300/30 `}
                onMouseDown={() => handleDropdownItemClick(index)}
                onMouseOver={() => setCurrent(index)}
                onKeyDown={handleDropDownNavigation}
              >
                <p className="text-brandtext">{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
