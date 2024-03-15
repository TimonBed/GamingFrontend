import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const { user, logoutUser } = useUser();
  return (
    <div className="inset-y-0 right-0 flex items-center pr-2 static">
      {/* badges */}
      <Link to="/admin/users">
        {user?.role === "admin" ? (
          <p className="text-md font-semibold leading-6 text-brandtext px-4 p-1 bg-yellow-600 rounded-full">
            Admin
          </p>
        ) : null}
      </Link>
      {/* Profile dropdown */}
      <div>
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm hover:outline-none hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800">
              {user?.username ? (
                <div className="flex flex-row">
                  <Link
                    to="#"
                    className="text-md font-semibold leading-6 text-brandtext px-4 my-auto text-md"
                  >
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </Link>
                  <div>
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-md font-semibold leading-6 text-brandtext px-4 p-1"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 text-brandtext py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm "
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              {/* line between */}
              <div className="border-t border-gray-50" />
              {/* show admin menu */}
              {user?.role === "admin" ? (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin/users"
                      className={classNames(
                        active ? "bg-gray-700" : "",
                        "block px-4 py-2 text-sm "
                      )}
                    >
                      Admin
                    </Link>
                  )}
                </Menu.Item>
              ) : null}

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={logoutUser}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Profile;
