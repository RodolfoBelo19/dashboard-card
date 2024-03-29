import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { AuthUser } from "./authUser";
import { IAuthUserFirebase } from "@/interfaces/IAuthUserFirebase";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<IAuthUserFirebase>({} as IAuthUserFirebase);

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const { t } = useTranslation("common");

  const navigation = [
    { name: t("register_card"), href: "/card", current: true },
    { name: t("register_user"), href: "/registerUser", current: true },
  ];

  return (
    <Disclosure
      as="nav"
      className="fixed w-full -mt-20 transition bg-zinc-800 border-b-zinc-900 border-b-2"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <BanknotesIcon height={40} className="text-gray-400" />
                </div>
                <div className="hidden transition duration-200 sm:ml-6 sm:block">
                  {user?.emailVerified && (
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-zinc-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-zinc-700 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                {user?.emailVerified && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {user && (
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={user.photoURL}
                            alt="avatar"
                            width={32}
                            height={32}
                          />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm gap-2 flex items-center text-gray-700"
                              )}
                            >
                              <UserCircleIcon height={20} width={20} />
                              {t("your_profile")}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "px-4 py-2 text-sm gap-2 flex items-center text-gray-700"
                              )}
                            >
                              <CogIcon height={20} width={20} />
                              {t("settings")}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "px-4 py-2 text-sm gap-2 flex items-center text-gray-700"
                              )}
                            >
                              <ArrowRightOnRectangleIcon
                                height={30}
                                width={30}
                              />
                              <AuthUser
                                classNameProps={"w-full"}
                                user={user}
                                setUser={setUser}
                                sign_in={t("sign_in")}
                                sign_out={t("sign_out")}
                              />
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                <div className="sm:flex hidden gap-3 items-center justify-center p-5">
                  <button onClick={() => onToggleLanguageClick("pt")}>
                    <Image src="/br.webp" alt="brazil" width={20} height={20} />
                  </button>
                  <button onClick={() => onToggleLanguageClick("en")}>
                    <Image src="/us.webp" alt="usa" width={20} height={20} />
                  </button>
                </div>

                {!user?.emailVerified && (
                  <AuthUser
                    user={user}
                    setUser={setUser}
                    sign_in={t("sign_in")}
                  />
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-zinc-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="gap-4 flex items-center justify-center p-5">
                <button onClick={() => onToggleLanguageClick("pt")}>
                  <Image src="/br.webp" alt="brazil" width={30} height={30} />
                </button>
                <button onClick={() => onToggleLanguageClick("en")}>
                  <Image src="/us.webp" alt="usa" width={30} height={30} />
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
