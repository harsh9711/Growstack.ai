import { Fragment, ReactNode } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <ScrollToTopButton />
    </Fragment>
  );
}
