import Link from "next/link";
import {Card} from "../components/Card";
import api from "../api/index";
import React, {useEffect, useState} from "react";
import {ICard} from "./interfaces/ICard";
import {Button, PlusButton} from "@/components/Button";

export default function Home() {
  const [data, setData] = useState<ICard[]>([])

  const fetchData = async () => {
    try {
      const response = await api.get('card')
      setData(response.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Card data={data}/>
      <Link className="flex" href={'/card'}>
        <PlusButton  />
        <Button>
          Register
        </Button>
      </Link>
    </>
  )
}
