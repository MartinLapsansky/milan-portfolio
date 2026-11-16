import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/molecules/NavBar";
import HeaderShell from "@/components/shared/HeaderShell";
import logo from "@/assets/logo_base.png";

export default function Header() {
  return (
    <HeaderShell>
      <Link
        href="#domov"
        aria-label="Milan Ivančák — prejsť na úvod"
        className="inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <Image
          src={logo}
          alt="Milan Ivančák"
          width={100}
          height={100}
          loading="eager"
          className="h-20 w-20 rounded-full object-contain sm:h-25 sm:w-25"
        />
      </Link>
      <NavBar />
    </HeaderShell>
  );
}
