import React from "react";
import Navbar from "@/components/Navbar";
import { CreditCardIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react'
import { ListCards } from "@/components/listCards";

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Link from 'next/link'
import { useRouter } from 'next/router'

const redirect = [
  { id: 1, name: "Cards", icon: <CreditCardIcon className="sm:h-24 h-14" /> },
  { id: 2, name: "Expenses", icon: <ArrowTrendingDownIcon className="sm:h-24 h-14" /> },
  { id: 3, name: "Revenues", icon: <ArrowTrendingUpIcon className="sm:h-24 h-14" /> }
]

export default function Home(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common')
  const router = useRouter()

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'pt' : 'en'

  return (
    <div className="pt-20">
      <Navbar />

      {/* todo translation */}
      <div className="text-white">
        <Link href="/" locale={changeTo}>
          <button>{t('change-locale', { changeTo })}</button>
        </Link>
        <p>
          <Trans i18nKey="h1">
            <h1 className="text-4xl text-center">{t('h1')}</h1>
          </Trans>
        </p>
      </div>
      {/* todo translation */}

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

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})
