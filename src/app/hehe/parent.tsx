"use client";

import React from "react";

const ParentElement = ({
  children,
  button,
}: Readonly<{
  children: React.ReactNode;
  button: React.ReactNode;
}>) => {
  return (
    <div className="flex-1 inline-block">
      {children} {button}
    </div>
  );
};

export { ParentElement };
