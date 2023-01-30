import Link from "next/link";
import {Card} from "../components/Card";
import api from "../api/index";
import React, {useEffect, useState} from "react";
import {ICard} from "./interfaces/ICard";
import Navbar from "@/components/Navbar";

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
    <div className="pt-20">
      <Navbar/>
      <Card data={data}/>
      <Link className="flex" href={'/card'} />
    </div>
  )
}
