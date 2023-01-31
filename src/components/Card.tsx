import {FormatValue} from "./FormatValue";
import {ICard} from "../pages/interfaces/ICard";
import React from "react";
import {PlusButton} from "@/components/Button";

export const Card = ({data}: any) => {

  const cardType = (type: string) => {
    if (type == 'mastercard') {
      return (
        <img
          src={"mastercard.png"}
          alt="mastercard"
          className="w-20"
        />
      )
    } else {
      return (
        <img
          src={"visa.png"}
          alt="visa"
          className="w-20"
        />
      )
    }
  }

  /* test object literals ****************************************
    const cardType = (cardType: ICardType) => {
      const card = {
        mastercard: (
          <img
            src={"mastercard.png"}
            alt="mastercard"
            className="w-20"
          />
        ),
        visa: (
          <img
            src={"visa.png"}
            alt="visa"
            className="w-20"
          />
        )
      }
      return card[cardType]
    }
  *****/

  return (
    <div
      className="flex sm:flex-row flex-col w-full p-1 text-white">
      {
        data.map((card: ICard) => {
          return (
            <div key={card.name}>
              <div className="bg-zinc-800 relative flex m-2 items-center rounded-2xl p-5"
                   style={{backgroundImage: `url(/images/${card.name}.png)`}}
              >
                <div className="w-full">
                  <p className="flex">
                    <strong className="mx-2">name:</strong>
                    {card?.name}
                  </p>
                  <p className="flex">
                    <strong className="mx-2">total limit:</strong>
                    <FormatValue value={card?.limit}/>
                  </p>
                  <p className="flex">
                    <strong className="mx-2">available:</strong>
                    <FormatValue value={card?.limit - card?.used}/>
                  </p>
                  <p className="flex">
                    <strong className="mx-2">used:</strong>
                    <FormatValue value={card?.used}/>
                  </p>
                </div>
                <div>
                  {cardType(card?.type)}
                  {/*{cardTest(card?.type)}*/}
                </div>
                <PlusButton data={card}/>
                {/*<EllipsisVerticalIcon className="absolute right-2 top-3" height={20} />*/}
              </div>
            </div>
          );
        })
      }
    </div>
  )
}