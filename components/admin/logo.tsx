import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-10 w-full max-w-[180px] flex items-center gap-3">
      {/* <div className="relative h-10 w-10 flex-shrink-0">
        <Image
          src="/images/logo-tembi.svg"
          width={60}
          height={60}
          className="object-contain w-full h-full"
          alt="Tembi logo"
          priority
        />
      </div> */}
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
        Tembi
      </h1>
    </div>
  );
}