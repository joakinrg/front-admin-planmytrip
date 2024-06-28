"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

const Añadir = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const letters = /^[A-Za-z]+$/;
  const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordEx =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/;

  const onSubmit = handleSubmit(async (data) => {
    if (!data.name.match(letters)) {
      toast.error("El nombre solo puede contener letras.", {
        duration: 1500,
      });
      return;
    }

    if (!data.lastname.match(letters)) {
      toast.error("El apellido solo puede contener letras.", {
        duration: 1500,
      });
      return;
    }

    if (!data.email.match(mail)) {
      toast.error("El correo no es válido.", {
        duration: 1500,
      });
      return;
    }

    if (!data.password.match(passwordEx)) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.",
        {
          duration: 1500,
        }
      );
      return;
    }

    const addUser = await fetch(
      `${process.env.NEXT_PUBLIC_SUPPORT_BACKEND_URL}/user/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.name,
          apellido: data.lastname,
          email: data.email,
          password: data.password,
        }),
      }
    );

    const addUserRes = await addUser.json();

    if (addUserRes.error) {
      toast.error(addUserRes.message, {
        duration: 1500,
      });
      return;
    }

    toast.success("Usuario agregado correctamente.", {
      duration: 1500,
      onAutoClose: () => {
        router.push("/admin/dashboard/soporte");
      },
    });
  });
  return (
    <div className="p-5 bg-zinc-800 rounded-lg">
      <div className="container mx-auto py-4">
        <h1 className="font-header text-lg mb-4">Agregar Usuario de Soporte</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="name"
            className={"font-md text-left"}
          >
            Nombre
          </label>

          <input
            type="text"
            className={
              "bg-neutral-400 appearance-none border-neutral-500 border rounded-lg outline-1 bg-opacity-20 mb-7 h-8 w-full text-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            }
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es un campo obligatorio.",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-700 text-sm">
              {String(errors.name.message)}
            </span>
          )}

          <label
            htmlFor="lastname"
            className={"font-md text-left"}
          >
            Apellido
          </label>

          <input
            type="text"
            className={
              "bg-neutral-400 appearance-none border-neutral-500 border rounded-lg outline-1 bg-opacity-20 mb-7 h-8 w-full text-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            }
            {...register("lastname", {
              required: {
                value: true,
                message: "El nombre es un campo obligatorio.",
              },
            })}
          />
          {errors.lastname && (
            <span className="text-red-700 text-sm">
              {String(errors.lastname.message)}
            </span>
          )}

          <label
            htmlFor="email"
            className={"font-md text-left"}
          >
            Correo
          </label>

          <input
            type="email"
            className={
              "bg-neutral-400 appearance-none border-neutral-500 border rounded-lg outline-1 bg-opacity-20 mb-7 h-8 w-full text-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            }
            {...register("email", {
              required: {
                value: true,
                message: "El nombre es un campo obligatorio.",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-700 text-sm">
              {String(errors.email.message)}
            </span>
          )}

          <label
            htmlFor="password"
            className={"font-md text-left"}
          >
            Contraseña
          </label>

          <input
            type="password"
            className={
              "bg-neutral-400 appearance-none border-neutral-500 border rounded-lg outline-1 bg-opacity-20 mb-7 h-8 w-full text-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            }
            {...register("password", {
              required: {
                value: true,
                message: "El nombre es un campo obligatorio.",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-700 text-sm">
              {String(errors.password.message)}
            </span>
          )}

          <section className="flex justify-start gap-5 px-5">
            <button
              type="submit"
              className="bg-emerald-500 flex items-center justify-center hover:bg-emerald-700 hover:text-white text-black py-2 px-4 rounded duration-3 duration-300"
            >
              Agregar Usuario
            </button>

            <Link
              href={`/admin/soporte`}
              className="bg-slate-400  flex items-center justify-center hover:bg-slate-600 hover:text-white text-black py-2 px-6 rounded duration-3 duration-300"
            >
              Cancelar
            </Link>
          </section>
        </form>
      </div>

      <Toaster
        position="top-center"
        richColors
      />
    </div>
  );
};

export default Añadir;
