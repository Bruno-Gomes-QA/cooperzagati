import Image from "next/image";
import { GoogleLoginButton } from "../ExtraUI/GoogleLoginButton";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <Image
        src="/core/cooperzagati_logo_header.png"
        alt="Logo"
        width={180}
        height={40}
        className="object-contain"
      />
      <GoogleLoginButton/>
    </header>
  );
}
