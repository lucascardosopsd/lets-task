import Logo from "@/components/Logo";
import SignInGoogle from "@/components/SignInGoogle";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex h-[400px] w-[600px] rounded">
        <div className="flex w-full flex-1 bg-green-500 items-center justify-center rounded-l">
          <Image src="/images/key.svg" alt="key" height={200} width={200} />
        </div>
        <div className="flex flex-col w-full flex-1 items-center justify-center gap-4 bg-zinc-900 rounded-r">
          <Logo />
          <SignInGoogle />
        </div>
      </div>
    </main>
  );
}
