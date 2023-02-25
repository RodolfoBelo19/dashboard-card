import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import api from "@/api";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Button = ({ children, className }: any) => {
  return (
    <button
      className={`bg-zinc-800 hover:bg-zinc-600 transition duration-300 text-white m-4 p-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export const PlusButton = ({ children, className, data }: any) => {
  const { push } = useRouter();

  const removeCard = async (id: string) => {
    try {
      const result = await api.delete(`/card/${id}`);
      console.log(result);
      await push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-end p-2">
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button className="text-gray-300 text-sm flex font-medium">
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
          <Menu.Items className="absolute w-36 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/card/${data._id}`}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    <div className="flex justify-between gap-2">
                      <span>Edit Card</span>
                      <PencilIcon height={20} />
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => removeCard(data._id)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    <div className="flex justify-between gap-2">
                      <span>Delete Card</span>
                      <TrashIcon height={20} />
                    </div>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
