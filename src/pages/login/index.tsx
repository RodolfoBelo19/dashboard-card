import {Field, Form, Formik} from "formik";
import {IUser} from "@/pages/interfaces/IUser";
import {useState} from "react";
import {Button} from "@/components/Button";
import {useRouter} from "next/router";
import api from "@/api";

const initialValuesSchema: IUser = {
  email: "",
  password: "",
}
export default function Login() {
  const [initialValues, setInitialValues] = useState(initialValuesSchema);

  const {query, push} = useRouter()
  const {id} = query

  const handleSubmit = async (values: IUser) => {
    try {
      await api.post('/user', values)
      await push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col text-gray-300 justify-center items-center">
      <h1 className="mt-5">{!id ? 'Register' : 'Edit'} User</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit} enableReinitialize={true}
      >
        {({values, handleChange, handleSubmit}) => (
          <Form className="flex p-5 w-full flex-col">
            <label className="mt-5" htmlFor="email">Email</label>
            <Field className="p-1 rounded-md bg-zinc-500" name="email" type="text"/>

            <label className="mt-5" htmlFor="password">Password</label>
            <Field className="p-1 rounded-md bg-zinc-500" name="password" type="text"/>

            <Button className="mt-5" type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}