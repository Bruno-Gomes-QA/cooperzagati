import Image from "next/image";

export function Header() {
  return (
    <header className="relative z-50">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-black">
        <Image
          src="/core/cooperzagati_logo_header.png"
          alt="Logo"
          width={180}
          height={40}
          className="object-contain"
        />
        {/*<GoogleLoginButton/>*/}
      </div>
      <div className="h-[3px] w-full bg-gradient-to-r from-green-800 via-green-500 to-white shadow-[0_0_20px_2px_rgba(34,197,94,0.5)]" />
    </header>
  );
}
