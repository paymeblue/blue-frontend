import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const Container = ({ children, className }: Props) => {
  return (
    <section
      className={`mx-auto my-6 max-w-[1440px] px-4 tablet:px-20 ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;
