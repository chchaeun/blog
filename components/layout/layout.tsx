import React, { Fragment, ReactNode } from "react";
import Header from "./header";

interface IProps {
  children: ReactNode;
}

function Layout(props: IProps) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
