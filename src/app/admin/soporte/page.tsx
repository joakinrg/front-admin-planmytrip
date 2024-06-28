import { getSupportUsers } from "@/app/api/data/users";
import Link from "next/link";

export type SupportUser = {
  id: string;
  email: string;
  created_at: Date;
  nombre: string;
  apellido: string;
};

const Soporte = async () => {
  const data = await getSupportUsers();

  return (
    <div className="p-5 bg-zinc-800 rounded-lg">
      <section className="flex justify-between items-center  m-5">
        <h1 className="text-2xl font-serif text-white mb-10">
          Usuarios de Soporte de la plataforma
        </h1>

        <Link
          href={"/admin/soporte/add"}
          className=" bg-morado-claro hover:bg-violet-700 duration-300 p-4 rounded-md"
        >
          Agregar Usuario{" "}
        </Link>
      </section>

      <table className="w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody className="fles items-center align-middle text-center">
          {(data &&
            data.map((user: SupportUser) => (
              <tr key={user.id}>
                <td className="py-5">{user.nombre}</td>
                <td className="py-5">{user.apellido}</td>
                <td className="py-5">{user.email}</td>
              </tr>
            ))) || (
            <tr>
              <td
                colSpan={3}
                className="p-10"
              >
                No hay usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Soporte;
