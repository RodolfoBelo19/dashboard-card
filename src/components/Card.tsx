import { FormatValue } from "./FormatValue";
import { ICard } from "../interfaces/ICard";
import React from "react";
import { PlusButton } from "@/components/Button";
import Image from "next/image";

export const Card = ({ data }: any) => {

  const cardType = (type: string) => {
    if (type == 'mastercard') {
      return (
        <Image
          height={50}
          width={50}
          src={"/mastercard.png"}
          alt="mastercard"
          className="w-20"
        />
      )
    } else {
      return (
        <Image
          height={50}
          width={50}
          src={"/visa.png"}
          alt="visa"
          className="w-20"
        />
      )
    }
  }

  return (
    <div
      className="flex sm:flex-row flex-col items-center justify-center p-1 text-white">
      {
        data?.map((card: ICard) => {
          return (
            <div key={card.name}>
              <div className="bg-zinc-800 flex m-2 rounded-2xl"
                style={{ backgroundImage: `url(/images/${card.name}.png)` }}
              >
                <div className="m-4 w-full">
                  <p className="flex">
                    <strong className="mx-2">name:</strong>
                    {card?.name}
                  </p>
                  <p className={`flex ${card?.limit > 0 ? 'text-blue-400' : 'text-gray-400'} `}>
                    <strong className="mx-2">total limit:</strong>
                    <FormatValue value={card?.limit} />
                  </p>
                  <p className={`flex ${card?.limit !== card?.used ? 'text-green-400' : 'text-red-400'} `}>
                    <strong className="mx-2">available:</strong>
                    <FormatValue value={card?.limit - card?.used} />
                  </p>
                  <p className={`flex ${card?.limit !== card?.used ? 'text-yellow-400' : 'text-gray-400'} `}>
                    <strong className="mx-2">used:</strong>
                    <FormatValue value={card?.used} />
                  </p>
                </div>
                <div className="flex flex-col">
                  <PlusButton data={card} />
                  <div className="flex m-2 items-center">
                    {cardType(card?.type)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}