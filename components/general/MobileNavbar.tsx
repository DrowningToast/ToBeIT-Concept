import { FC, useState } from "react";
import Arrow from "@public/assets/icon/angles-up-solid.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const MobileNavbar: FC = () => {
  const { push } = useRouter();
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <footer className="lg:hidden absolute bottom-0 flex justify-end h-14 px-6 inset-x-0">
      <motion.div
        animate={{
          rotate: selected ? 180 : 0,
          y: selected ? "-150%" : "0%",
        }}
        onClick={() => {
          setSelected(!selected);
        }}
        className="invert cursor-pointer mb-4 w-8"
      >
        <Arrow />
      </motion.div>
      <motion.div
        animate={{
          y: selected ? "0%" : "100%",
          transition: {
            type: "tween",
          },
        }}
        className="inset-x-0 bg-primary inset-y-0 absolute rounded-t-2xl flex justify-around items-center gap-x-8 px-4 "
      >
        <div
          onClick={() => {
            push("/menu/home");
          }}
        >
          <Image
            layout="intrinsic"
            width="32px"
            height="32px"
            src="/assets/icon/house-solid.svg"
          />
        </div>
        <div
          onClick={() => {
            push("/menu/library");
          }}
        >
          <Image
            layout="intrinsic"
            width="32px"
            height="32px"
            src="/assets/icon/book-solid.svg"
          />
        </div>
        <div
          onClick={() => {
            push("/menu/assignment");
          }}
        >
          <Image
            layout="intrinsic"
            width="32px"
            height="32px"
            src="/assets/icon/file-circle-check-solid.svg"
          />
        </div>
        <div
          onClick={() => {
            push("/menu/account");
          }}
        >
          <Image
            layout="intrinsic"
            width="32px"
            height="32px"
            src="/assets/icon/user-solid.svg"
          />
        </div>
      </motion.div>
    </footer>
  );
};

export default MobileNavbar;
