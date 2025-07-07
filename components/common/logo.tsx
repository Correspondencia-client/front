import { PLATFORM_NAME } from "@/constants/platform";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  column?: boolean;
  showName?: boolean;
  logoClassname?: string;
  labelClassname?: string;
}

export function Logo({
  column,
  showName,
  logoClassname,
  labelClassname,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", column && "flex-col")}>
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className={cn("h-10 w-auto object-contain", logoClassname)}
      />
      {showName && (
        <span className={cn("text-2xl font-bold", labelClassname)}>
          {PLATFORM_NAME}{" "}
        </span>
      )}
    </div>
  );
}
