"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between p-5 items-center bg-morado">
      <section className="flex justify-start gap-5">
        <Link
          href={"/admin/usuarios"}
          className="hover:text-morado-claro duration-300"
        >
          Usuarios
        </Link>
        <Link
          href={"/admin/soporte"}
          className="hover:text-morado-claro duration-300"
        >
          Usuario De Soporte
        </Link>

        <Link
          href={"/admin/tickets"}
          className="hover:text-morado-claro duration-300"
        >
          Tickets
        </Link>
      </section>

      <section>
        <button
          className="bg-rose-800 p-2 rounded-md hover:bg-red-600 duration-300"
          onClick={() => {
            signOut();
          }}
        >
          Cerrar Sesion
        </button>
      </section>
    </div>
  );
};

export default Navbar;
