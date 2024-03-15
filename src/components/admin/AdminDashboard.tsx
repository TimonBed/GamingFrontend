import { UsersIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Profile from "../navbar/Profile";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";


const navigation = [
  { name: "Users", href: "/admin/users", icon: UsersIcon, current: true },
  { name: "References", href: "/admin/references", icon: BookOpenIcon, current: false },
];
const teams = [
  { id: 1, name: "Home", href: "/", initial: "H", current: false },
  { id: 2, name: "Tokens", href: "/tokens", initial: "T", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
  const [navItems, setNavItems] = useState(navigation);
  const handleCurrent = (name: string) => {
    console.log(name);
    const updatedNavItems = navItems.map(item =>
      item.name === name ? { ...item, current: true } : { ...item, current: false }
    );
    setNavItems(updatedNavItems);
    console.log(updatedNavItems);
  };

  return (
    <div className=" min-w-72 flex flex-col h-screen gap-y-5  overflow-y-auto bg-gray-900 px-6">
      <div className="flex h-16 shrink-0 items-center ">
        <Link to={"/"}>
          <img className="h-8 w-auto" src={logo} alt="Your Company" />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col ">
        <ul role="list" className="flex fl flex-1 flex-col gap-y-7">
          <li className="flex flex-grow">
            <ul role="list" className=" space-y-1 w-full">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => handleCurrent(item.name)}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                    {/* {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null} */}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <div className="flex-1"></div>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Personal
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <Link
                    to={team.href}
                    className={classNames(
                      team.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="my-8 flex justify-center">
            <Profile></Profile>
          </li>
        </ul>
      </nav>
    </div>
  );
}
