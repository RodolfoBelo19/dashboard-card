import { Field, Form, Formik } from "formik";
import { IUser } from "@/interfaces/IUser";
import { useState } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import api from "@/api";
import { IAuthUserFirebase } from "@/interfaces/IAuthUserFirebase";
import { AuthUser } from "@/components/authUser";
import { useTranslation, Trans } from "next-i18next";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const initialValuesSchema: IUser = {
  email: "",
  password: "",
};
export default function Login(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [initialValues, setInitialValues] = useState(initialValuesSchema);

  const { query, push } = useRouter();
  const { id } = query;

  const [user, setUser] = useState<IAuthUserFirebase>({} as IAuthUserFirebase);

  const { t } = useTranslation("common");

  const handleSubmit = async (values: IUser) => {
    try {
      await api.post("/user", values);
      await push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-col text-gray-300 justify-center items-center">
        <h1 className="mt-5">{!id ? "Register" : "Edit"} User</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form className="flex p-5 w-full flex-col">
              <label className="mt-5" htmlFor="email">
                Email
              </label>
              <Field
                className="p-1 rounded-md bg-zinc-500"
                name="email"
                type="text"
              />

              <label className="mt-5" htmlFor="password">
                Password
              </label>
              <Field
                className="p-1 rounded-md bg-zinc-500"
                name="password"
                type="text"
              />

              <Button className="mt-5" type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <AuthUser
        classNameProps={
          "w-full h-screen flex items-center text-white justify-center"
        }
        user={user}
        setUser={setUser}
        sign_in={t("sign_in")}
        sign_out={t("sign_out")}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
