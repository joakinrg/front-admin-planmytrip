import Navbar from "@/components/Navbar";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className=" bg-white z-10 w-full">
        <Navbar />
      </div>
      <div className="m-5 p-5 ">{children}</div>
    </div>
  );
}
