"use client";
import { getTicket } from "@/app/api/data/ticket";
import { getSupportUsers } from "@/app/api/data/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export interface ticketProps {
  params: {
    idTicket: string;
  };
}

export type SupportUserType = {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  created_at: Date;
};

export type Ticket = {
  id: string;
  emisor: string;
  fechaCreacion: Date;
  prioridad: number;
  descripcionTicket: string;
  estado: Estado;
  tema: Tema;
  usuario?: SupportUserType;
};
export type Estado = {
  id: number;
  tipoEstado: string;
};

export type Tema = {
  id: number;
  tipoTicket: string;
};

const Asignar = ({ params }: ticketProps) => {
  const { idTicket } = params;

  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const [users, setUsers] = useState<SupportUserType[] | null | undefined>();

  useEffect(() => {
    const getUsers = async () => {
      const users = await getSupportUsers();
      setUsers(users);
    };

    getUsers();
  }, []);

  const onSubmt = handleSubmit(async (data) => {
    const { support } = data;
    const ticket = (await getTicket(idTicket)) as Ticket | null | undefined;

    if (ticket?.usuario) {
      return toast.error("Este ticket ya tiene un usuario asignado", {
        duration: 1500,
      });
    }

    if (support === "0") {
      return toast.error("Selecciona un usuario de soporte", {
        duration: 1500,
      });
    }

    const ticketAssigned = await fetch(
      `${process.env.NEXT_PUBLIC_SUPPORT_BACKEND_URL}/tickets/asignate/${idTicket}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: support,
        }),
      }
    );

    const ticketAssignedRes = await ticketAssigned.json();

    if (!ticketAssignedRes) {
      toast.error("No se pudo asignar el ticket");
      return;
    }

    const estadoUpdated = await fetch(
      `${process.env.NEXT_PUBLIC_SUPPORT_BACKEND_URL}/tickets/update/${idTicket}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: "pendiente",
        }),
      }
    );

    const estadoUpdatedRes = await estadoUpdated.json();

    if (!estadoUpdatedRes) {
      toast.error("No se pudo asignar correctamente el ticket");
      return;
    }

    toast.success("Ticket asignado correctamente", {
      duration: 1000,
      onAutoClose: () => router.push(`/admin/dashboard/ticket/${idTicket}`),
    });
  });

  return (
    <div className="p-5 bg-zinc-800 rounded-lg">
      <div className="font-body flex flex-col gap-5 p-5">
        <section className="flex flex-col gap-2">
          <h1 className={"font-bold text-xl "}>Asignacion de Ticket</h1>
          <p>
            Para asignar el ticket es necesario que selecciones a un usuario al
            que asignarlo.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h1 className={"font-bold text-xl "}>ID del Ticket a Asignar</h1>

          <h2>{idTicket}</h2>
        </section>

        <section>
          <form
            onSubmit={onSubmt}
            className="flex flex-col gap-10"
          >
            <section className="flex flex-col gap-2">
              <label htmlFor="support">Usuarios de Soporte</label>
              <select
                id="support"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white0 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("support", { required: true })}
              >
                <option value="0">Selecciona un usuario</option>
                {users?.map((user) => (
                  <option
                    key={user?.id}
                    value={user?.id}
                  >
                    {user?.email}
                  </option>
                ))}
              </select>
            </section>
            <section className="flex flex-row justify-start gap-5">
              <button
                type="submit"
                className="bg-emerald-500 flex items-center justify-center hover:bg-emerald-700 hover:text-white text-black py-2 px-4 rounded duration-3 duration-300"
              >
                Asignar Ticket
              </button>

              <Link
                href={`/admin/tickets/${idTicket}`}
                className="bg-slate-400  flex items-center justify-center hover:bg-slate-600 hover:text-white text-black py-2 px-6 rounded duration-3 duration-300"
              >
                Cancelar
              </Link>
            </section>
          </form>
        </section>
      </div>
      <Toaster
        richColors
        position="top-center"
      />
    </div>
  );
};

export default Asignar;
