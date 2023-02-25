import { Card } from "@/components/Card";
import React, { useEffect, useState } from "react";
import { ICard } from "@/interfaces/ICard";
import api from "@/api";

export const ListCards = () => {
  const [data, setData] = useState<ICard[]>([]);

  const fetchData = async () => {
    try {
      const response = await api.get("card");
      setData(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Card data={data} />;
};
