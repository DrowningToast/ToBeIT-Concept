import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Footer: FC<{
  className?: String;
}> = ({ className }) => {
  return (
    <footer className="bg-secondary flex p-4 gap-x-6 items-center">
      <Link href="https://discord.gg/PvbaeTN7zz">
        <a className="relative h-full w-10">
          <Image src="/assets/logo/discord.png" layout="fill"></Image>
        </a>
      </Link>
      <Link href="https://www.facebook.com/tobeitkmitl">
        <a className="w-8 h-full relative">
          <Image
            src="/assets/logo/facebook.png"
            layout="fill"
            className="scale-150"
          ></Image>
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
