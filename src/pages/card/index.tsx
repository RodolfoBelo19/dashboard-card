import {Field, Form, Formik} from "formik";
import {ICard} from "@/pages/card/interfaces/ICard";
import api from "@/api";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const initialValuesSchema = {
  name: "",
  limit: "",
  available: "",
  used: "",
  type: "mastercard",
}

export default function Card() {
  const [initialValues, setInitialValues] = useState<ICard>(initialValuesSchema)

  const {query, push} = useRouter()
  const {id} = query

  const handleSubmit = async (values: ICard) => {
    console.log(values)
    try {
      const result = await api.post('/card', values)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (id) {
      const fetchCard = async () => {
        try {
          const result = await api.get(`/card/${id}`)
          setInitialValues(result.data)
          console.log(result.data)
        } catch (e) {
          console.log(e)
        }
      }

      fetchCard()
    }
  }, [id])

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-5">Register Credit Limit</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit} enableReinitialize={true}
      >
        {({values, handleChange, handleSubmit}) => (
          <Form className="flex p-5 w-full flex-col">
            <label htmlFor="name">Name</label>
            <Field className="border-2 p-1 rounded-md" name="name" type="text"/>

            <label className="mt-5" htmlFor="limit">Limit</label>
            <Field placeholder={"R$"} className="border-2 p-1 rounded-md" name="limit" type="text"/>

            <label className="mt-5" htmlFor="available">Available</label>
            <Field placeholder={"R$"} className="border-2 p-1 rounded-md" name="available" type="text"/>

            <label className="mt-5" htmlFor="used">Used</label>
            <Field placeholder={"R$"} className="border-2 p-1 rounded-md" name="used" type="text"/>

            <label className="mt-5" htmlFor="type">Type</label>
            <Field placeholder={"R$"} className="border-2 p-1 rounded-md" name="type" type="text"
                   as="select">
              <option value="mastercard">MasterCard</option>
              <option value="visa">Visa</option>
            </Field>

            <button className="mt-5" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}