import Logo from "@components/general/Logo";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Home from "@components/menu/Home";
import { useViewportScroll } from "framer-motion";
import MobileNavbar from "@components/general/MobileNavbar";
import Account from "@components/menu/Account";
import { useAtom } from "jotai";
import { firebaseUserAtom } from "@jotai/store";

const Page = () => {
  const { query, isReady, push } = useRouter();
  const links = ["home", "library", "assignment", "account"];
  const pages = [<Home key="home" />, "ph", "ph", <Account key="account" />];

  useEffect(() => {
    if (!links.includes(query?.page)) push("/menu/home");
  }, [query, isReady]);

  const [user] = useAtom(firebaseUserAtom);

  const { scrollY } = useViewportScroll();

  return (
    <div
      id="window"
      className="overflow-hidden relative w-screen min-h-screen bg-secondary"
    >
      {/* Desktop Header */}
      {/* Mobile Header */}
      <motion.header
        animate={{
          y: scrollY > 0 ? "-150%" : "0%",
        }}
        className="absolute top-3 left-3"
      >
        <Logo />
      </motion.header>
      {/* Page */}
      <section className="pt-24">
        {(function () {
          if (!isReady) return;
          let index = null;
          links.forEach((link, i) => {
            if (query.page === link) index = i;
          });
          return pages[index];
        })()}
      </section>
      {/* Footer */}
      <MobileNavbar />
    </div>
  );
};

export default Page;
