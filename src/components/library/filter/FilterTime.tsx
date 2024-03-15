// FilterTime.tsx
import { FC, ChangeEvent, useEffect, useState } from "react";

interface FilterTimeProps {
  startYear: number;
  //   onRangeChange: (start: number, end: number) => void;
}
export const FilterTime: FC<FilterTimeProps> = ({ startYear }) => {
  const currentYear = new Date().getFullYear();
  const [selectedStartYear, setSelectedStartYear] = useState(startYear);
  const [selectedEndYear, setSelectedEndYear] = useState(currentYear);
  const [years, setYears] = useState<number[]>([]);

  const handleStartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const startYear = parseInt(e.target.value, 10);
    setSelectedStartYear(startYear);
    // onRangeChange(startYear, endYear);
  };

  const handleEndChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const endYear = parseInt(e.target.value, 10);
    setSelectedEndYear(endYear);
    // onRangeChange(startYear, endYear);
  };

  useEffect(() => {
    console.log(selectedStartYear, selectedEndYear);
    if (selectedStartYear > selectedEndYear) {
      setSelectedEndYear(selectedStartYear);
    }
    setYears(
      Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
      )
    );
  }, [selectedStartYear, selectedEndYear]);

  return (
    <div className="flex flex-row  items-center w-full ">
      <select
        value={selectedStartYear}
        onChange={handleStartChange}
        className=" border-brandprimary/10 p-2 rounded-md w-full bg-slate-800 focus:border-brandprimary  focus:ring-brandprimary"
      >
        {years
          .filter((year) => year <= selectedEndYear)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>
      <span className="m-2">-</span>
      <select
        value={selectedEndYear}
        onChange={handleEndChange}
        className=" border-brandprimary/10 p-2 rounded-md w-full bg-slate-800 focus:border-brandprimary  focus:ring-brandprimary"
      >
        {years
          .filter((year) => year >= selectedStartYear)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>
    </div>
  );
};
