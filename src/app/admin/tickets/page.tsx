import { getTickets } from "@/app/api/data/ticket";
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

const Tickets = async () => {
  const data = ((await getTickets()) as Ticket[]) || null;

  return (
    <div className="p-5 bg-zinc-800 rounded-lg">
      <section className="flex justify-between items-center  m-5">
        <h1 className="text-2xl font-serif text-white mb-10">
          Tickets recibidos
        </h1>
      </section>

      <table className="w-full">
        <thead>
          <tr>
            <th>Emisor</th>
            <th>Fecha de enviado</th>
            <th>Prioridad</th>
            <th>Tipo de Ticket</th>
          </tr>
        </thead>
        <tbody className="fles items-center align-middle text-center">
          {(data &&
            data.map((ticket: Ticket) => (
              <tr key={ticket.id}>
                <td className="py-5">{ticket.emisor}</td>
                <td className="py-5">
                  {ticket.fechaCreacion && ticket.fechaCreacion.toString()}
                </td>
                <td className="py-5">{ticket.prioridad}</td>
                <td className="py-5">{ticket.tema.tipoTicket}</td>
                <td>
                  <Link
                    href={`/admin/tickets/${ticket.id}`}
                    className=" bg-morado-claro hover:bg-violet-700 duration-300 p-4 rounded-md"
                  >
                    Detalles
                  </Link>
                </td>
              </tr>
            ))) || (
            <tr>
              <td
                colSpan={3}
                className="p-10"
              >
                No hay Tickets
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
