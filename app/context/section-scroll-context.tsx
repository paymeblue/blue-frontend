import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type SectionRef = {
  value: string;
  setValue: Dispatch<SetStateAction<"personal" | "business">>;
  sectionRef: React.RefObject<HTMLElement>;
};

const SectionContext = createContext<SectionRef | null>(null);

export const useSectionRef = (): SectionRef => {
  const sectionRefCtx = useContext(SectionContext);
  if (!sectionRefCtx) {
    throw new Error("useSectionRef must be used within a SectionProvider");
  }
  return sectionRefCtx;
};

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState<"personal" | "business">("personal");
  return (
    <SectionContext.Provider value={{ sectionRef, setValue, value }}>
      {children}
    </SectionContext.Provider>
  );
};
