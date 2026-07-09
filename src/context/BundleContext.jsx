import { createContext } from "react";
import { useBundle } from "../hooks/useBundle";

export const BundleContext = createContext(null);

export function BundleProvider({ children }) {
  const bundle = useBundle();
  return (
    <BundleContext.Provider value={bundle}>{children}</BundleContext.Provider>
  );
}
