import Logo from "@/components/Logo";
import SignInGoogle from "@/components/SignInGoogle";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col mobile:flex-row w-full h-full mobile:h-[400px] mobile:w-[600px] rounded">
        <div className="flex w-full flex-1 bg-green-500 items-center justify-center rounded-l">
          <Image
            src="/images/key.svg"
            alt="key"
            height={200}
            width={200}
            className="h-28 w-28 mobile:h-52 mobile:w-52"
          />
        </div>
        <div className="flex flex-col w-full flex-[3] mobile:flex-1 items-center justify-center gap-4 bg-zinc-900 rounded-r">
          <Logo />
          <SignInGoogle />
        </div>
      </div>
    </main>
  );
}
