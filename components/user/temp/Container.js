import React, { forwardRef } from "react";

const Container = forwardRef(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={`px-5 md:px-8 lg:px-12 xl:px-20 m-auto max-w-[1800px] ${className}`}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";

export default Container;
