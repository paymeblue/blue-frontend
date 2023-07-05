import Image from "next/image";
import logo from "public/logo.svg";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Image src={logo} alt="loading" priority />
    </div>
  );
}
