import { getTicket } from "@/app/api/data/ticket";
import Link from "next/link";

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

export type SupportUserType = {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  created_at: Date;
};

export interface ticketProps {
  params: {
    idTicket: string;
  };
}
const Ticket = async ({ params }: ticketProps) => {
  const { idTicket } = params;

  const ticket = (await getTicket(idTicket)) as Ticket | null | undefined;

  const dateCreation = new Date(ticket?.fechaCreacion as Date);
  const formattedDateCreation = dateCreation.toLocaleDateString();

  if (!ticket) {
    return (
      <div className="p-5 bg-zinc-800 rounded-lg">
        <h1>El ticket no existe</h1>
      </div>
    );
  }

  return (
    <div className="p-5 bg-zinc-800 rounded-lg ">
      <section className="flex justify-between items-center  m-5">
        <h1 className="text-2xl font-serif text-white mb-10">Ticket</h1>
      </section>

      <div className="flex flex-col gap-10 p-5">
        <section className="flex flex-col gap-2">
          <h1 className={"font-bold text-xl "}>Emisor</h1>
          <h2>{ticket?.emisor}</h2>
        </section>

        <section className="flex flex-row gap-10">
          <section className="flex flex-col gap-2">
            <h1 className={"font-bold text-xl "}>Tipo de Ticket</h1>
            <h2>{ticket?.tema.tipoTicket}</h2>
          </section>
          <section className="flex flex-col gap-2">
            <h1 className={"font-bold text-xl "}>Prioridad</h1>
            <h2>P{ticket?.prioridad}</h2>
          </section>
        </section>

        <section className="flex flex-col gap-2">
          <h1 className={"font-bold text-xl "}>Fecha de creación del Ticket</h1>
          <h3>{formattedDateCreation}</h3>
        </section>

        <section className="flex flex-col gap-2">
          <h1 className={"font-bold text-xl "}>Descripcion del Ticket</h1>
          <h3>{ticket?.descripcionTicket}</h3>
        </section>

        <section className="flex flex-col gap-2">
          <h1 className={"font-bold text-xl "}>Estado del Ticket</h1>
          <h3>{ticket?.estado.tipoEstado}</h3>
        </section>

        {ticket?.usuario ? (
          <section className="flex flex-row gap-4">
            <section className="flex flex-col gap-2">
              <h1 className={"font-bold text-xl "}>
                Correo del Usuario asignado
              </h1>
              <h3>{ticket.usuario.email}</h3>
            </section>

            <section className="flex flex-col gap-2">
              <h1 className={"font-bold text-xl "}>
                Nombre del Usuario Asignado
              </h1>
              <h3 className="capitalize">
                {ticket.usuario.nombre} {ticket.usuario.apellido}
              </h3>
            </section>
          </section>
        ) : (
          <section className="flex flex-col gap-2">
            <h1 className={"font-bold text-xl "}>No hay usuario asignado</h1>
            <Link
              href={`/admin/tickets/asignate/${idTicket}`}
              className=" bg-morado-claro hover:bg-violet-700 duration-300 p-4 rounded-md w-1/4"
            >
              Asignar Ticket
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default Ticket;
