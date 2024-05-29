"use client";
import React, { Fragment } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

type Props = {
  children: React.ReactNode;
};

export default function Progressbar({ children }: Props) {
  return (
    <Fragment>
      <ProgressBar height="2px" color="#034737" options={{ showSpinner: true }} shallowRouting />
      {children}
    </Fragment>
  );
}
