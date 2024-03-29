import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/react";
import Main from "@/Layouts/Main";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <Main>
      <Guest>
        <Head title="Log in" />

        {status && (
          <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
        )}

        <ValidationErrors errors={errors} />

        <h2 className="py-3 text-center text-2xl">Login</h2>

        <form onSubmit={submit}>
          <div>
            <Label forInput="email" value="Email" />

            <Input
              type="text"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              handleChange={onHandleChange}
            />
          </div>

          <div className="mt-4">
            <Label forInput="password" value="Password" />

            <Input
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              handleChange={onHandleChange}
            />
          </div>

          {/* <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                value={data.remember}
                handleChange={onHandleChange}
              />

              <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
            </label>
          </div> */}

          <div className="flex items-center justify-between mt-4">
            <Link href={route('register')} className="underline text-sm text-gray-600 hover:text-gray-900">
              Buat Akun
            </Link>
            <div className="items-center justify-end">
              {/* {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="underline text-sm text-gray-600 hover:text-gray-900"
                >
                  Lupa password?
                </Link>
              )} */}

              <Button className="ml-4" processing={processing}>
                Log in
              </Button>
            </div>
          </div>

        </form>
      </Guest>
    </Main>
  );
}
