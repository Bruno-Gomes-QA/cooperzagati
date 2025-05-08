import { Button } from "@/components/ui/button";
import Image from "next/image";

export function GoogleLoginButton() {
  return (
    <Button
      variant="outline"
      className="group flex items-center gap-2 rounded-full border border-white/20 bg-black px-5 py-2 hover:bg-white/10 transition-colors"
    >
      <Image
        src="/core/google-logo.png"
        alt="Google logo"
        width={18}
        height={18}
      />
      <span className="text-sm font-medium text-white">Entrar</span>
    </Button>
  );
}
