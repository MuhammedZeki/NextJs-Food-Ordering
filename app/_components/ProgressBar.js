"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    nProgress.start();
    nProgress.done();

    return () => {
      nProgress.done();
    };
  }, [pathname]);

  return null;
}
