"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = handleSubmit(async (data: any) => {
    const { correo, contraseña } = data;

    if (!mail.test(correo)) {
      toast.error("El correo ingresado no es válido");
      return;
    }

    const res: any = await signIn("credentials", {
      email: correo,
      password: contraseña,
      redirect: false,
    });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Inicio de sesion exitoso", {
        duration: 1500,
        onAutoClose(toast) {
          toast.title = "Redirigiendo";
          toast.duration = 1500;
          router.push("/admin");
        },
      });
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 content-center h-lvh">
      <div className="container bg-contain rounded-lg bg-[url('/LoginImage.png')] bg-no-repeat object-cover  w-full h-lvh">
        <section className="flex flex-col items-center justify-center content-center align-middle h-full w-full p-5 gap-16">
          <h1 className="flex text-2xl font-semibold">
            Bienvenido al Sistema de Administrador
          </h1>
          <form
            className="flex flex-col gap-4 w-1/2"
            onSubmit={onSubmit}
          >
            <label
              htmlFor="correo"
              className="text-2xl flex text-left w-full justify-start"
            >
              Correo
            </label>
            <input
              type="email"
              id="correo"
              className="w-full border border-black rounded-lg p-2 bg-white bg-opacity-40"
              {...register("correo", {
                required: {
                  value: true,
                  message: "El correo es un campo requerido",
                },
              })}
            />
            {errors.correo && (
              <span className="text-red-500 text-sm">
                {String(errors?.correo.message)}
              </span>
            )}
            <label
              htmlFor="contraseña"
              className="text-2xl flex text-left w-full justify-start"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              className="w-full border border-black rounded-lg p-2 bg-white bg-opacity-40"
              {...register("contraseña", {
                required: {
                  value: true,
                  message: "La contraseña es un campo requerido",
                },
              })}
            />
            {errors.contraseña && (
              <span className="text-red-500 text-sm">
                {String(errors.contraseña.message)}
              </span>
            )}
            <section className="flex justify-center">
              <button
                className="text-lg bg-morado-claro py-2 flex justify-center w-1/2 rounded-lg"
                type="submit"
              >
                Iniciar Sesion
              </button>
            </section>
          </form>
        </section>
      </div>
      <Toaster richColors />
    </main>
  );
}
