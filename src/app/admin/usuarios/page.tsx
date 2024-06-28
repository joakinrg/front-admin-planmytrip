import { getUsers } from "@/app/api/data/users";

export type User = {
  id: string;
  email: string;
  persona: {
    nombre: string;
    apellidoM: string;
    apellidoP: string;
  };
};

const Usuarios = async () => {
  const data = await getUsers();
  return (
    <div className="p-5 bg-zinc-800 rounded-lg">
      <section className="flex justify-between items-center  m-5">
        <h1 className="text-2xl font-serif text-white mb-10">
          Usuarios de la plataforma
        </h1>
      </section>

      <table className="w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido(s)</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody className="fles items-center align-middle text-center">
          {(data &&
            data.map((user: User) => (
              <tr key={user.id}>
                <td className="py-5">{user.persona.nombre}</td>
                <td className="py-5">
                  {user.persona.apellidoM} {user.persona.apellidoP}
                </td>
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

export default Usuarios;
