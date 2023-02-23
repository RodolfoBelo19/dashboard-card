import React from "react";
import Navbar from "@/components/Navbar";
import { CreditCardIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react'
import { ListCards } from "@/components/listCards";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation, Trans } from 'next-i18next'

export default function Home(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common')

  const redirect = [
    { id: 1, name: t('cards'), icon: <CreditCardIcon className="sm:h-24 h-14" /> },
    { id: 2, name: t('expenses'), icon: <ArrowTrendingDownIcon className="sm:h-24 h-14" /> },
    { id: 3, name: t('revenues'), icon: <ArrowTrendingUpIcon className="sm:h-24 h-14" /> }
  ]

  return (
    <div className="pt-20">
      <Navbar />
      <h1 className="text-4xl text-center text-zinc-300">{t('h1')}</h1>
      <Tab.Group>
        <div className="flex-wrap flex items-center justify-center">
          <Tab.List className="flex p-1 space-x-1 rounded-2xl">
            {redirect.map((item) => {
              return (<>
                <Tab
                  key={item.id}
                  className={({ selected }) => `${selected ? 'text-zinc-300'
                    : 'text-zinc-700'
                    } 
                  w-32 p-5 m-2 outline-none rounded-2xl 
                  hover:text-zinc-300 hover:bg-zinc-900 hover:rounded-b-2xl 
                  transition duration-500`
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
            <ListCards />
          </Tab.Panel>
          <Tab.Panel>
            <ListCards />
          </Tab.Panel>
          <Tab.Panel>
            revenues
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>)
}

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})