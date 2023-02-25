import { Field, Form, Formik } from "formik";
import { ICard } from "@/interfaces/ICard";
import api from "@/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";

const initialValuesSchema: ICard = {
  name: "",
  limit: 0,
  used: 0,
  type: "mastercard",
};

export default function Card() {
  const [initialValues, setInitialValues] =
    useState<ICard>(initialValuesSchema);

  const { query, push } = useRouter();
  const { id } = query;

  const handleSubmit = async (values: ICard) => {
    const setValues = {
      name: values.name,
      limit: values.limit,
      used: values.used,
      type: values.type,
      idUser: "63db178d651d6d93c879694b",
    };
    if (values._id) {
      try {
        const result = await api.patch(`/card/${values._id}`, {
          setValues,
          headers: {
            "Content-Type": "application/json",
            "methods:": "PATCH",
          },
        });
        console.log(result);
        await push("/");
      } catch (e) {
        console.log(e);
      }
      return;
    } else {
      try {
        const result = await api.post("/card", setValues);
        console.log(result);
        await push("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchCard = async () => {
        try {
          const result = await api.get(`/card/${id}`);
          setInitialValues(result.data);
        } catch (e) {
          console.log(e);
        }
      };

      fetchCard();
    }
  }, [id]);

  return (
    <div className="flex flex-col text-gray-300 justify-center items-center">
      <h1 className="mt-5">{!id ? "Register" : "Edit"} Credit Limit</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form className="flex p-5 w-full flex-col">
            <label htmlFor="name">Name</label>
            <Field
              className="p-1 rounded-md bg-zinc-500"
              name="name"
              type="text"
            />

            <label className="mt-5" htmlFor="limit">
              Limit
            </label>
            <Field
              placeholder={"R$"}
              className="p-1 rounded-md bg-zinc-500"
              name="limit"
              type="text"
            />

            <label className="mt-5" htmlFor="used">
              Used
            </label>
            <Field
              placeholder={"R$"}
              className="p-1 rounded-md bg-zinc-500"
              name="used"
              type="text"
            />

            <label className="mt-5" htmlFor="type">
              Type
            </label>
            <Field
              placeholder={"R$"}
              className="p-1 rounded-md bg-zinc-500"
              name="type"
              type="text"
              as="select"
            >
              <option value="mastercard">MasterCard</option>
              <option value="visa">Visa</option>
            </Field>

            <Button className="mt-5" type="submit">
              {values._id ? "Edit" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
