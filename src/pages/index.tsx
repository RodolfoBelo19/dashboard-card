import React from "react";
import Navbar from "@/components/Navbar";
import {CreditCardIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon} from '@heroicons/react/20/solid';
import {Tab} from '@headlessui/react'
import {ListCards} from "@/components/listCards";

const redirect = [
  {name: "Cards", icon: <CreditCardIcon className="sm:h-24 h-14"/>},
  {name: "Expenses", icon: <ArrowTrendingDownIcon className="sm:h-24 h-14"/>},
  {name: "Revenues", icon: <ArrowTrendingUpIcon className="sm:h-24 h-14"/>}
]

export default function Home() {

  return (<div className="pt-20">
    <Navbar/>
    <Tab.Group>
      <div className="flex-wrap flex items-center justify-center">
        <Tab.List className="flex p-1 space-x-1 rounded-2xl">
          {redirect.map((item, key) => {
            return (<>
              <Tab
                key={key}
                className={({selected}) => `${selected ? 'text-zinc-300'
                  : 'text-zinc-700'
                } 
                  w-32 p-5 m-2 outline-none rounded-2xl 
                  hover:text-zinc-300 hover:bg-zinc-900 hover:rounded-b-2xl 
                  hover:border-b transition duration-500`
                }
              >
                <div className="flex flex-col w-full items-center justify-center">
                  {item.icon}{item.name}
                </div>
              </Tab>
            </>)
          })}
        </Tab.List>
      </div>
      <Tab.Panels>
        <Tab.Panel>
          <ListCards/>
        </Tab.Panel>
        <Tab.Panel>
          expensives
        </Tab.Panel>
        <Tab.Panel>
          revenues
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </div>)
}
