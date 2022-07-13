import React, { Fragment, ReactNode } from "react";
import Header from "./header";

interface IProps {
  children: ReactNode;
}

function Layout(props: IProps) {
  return (
    <Fragment>
      <Header />
      <main className="dark:bg-[#0d1117]">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
