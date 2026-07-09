import { useContext } from "react";
import { BundleContext } from "./BundleContext";

export function useBundleContext() {
  const context = useContext(BundleContext);
  if (!context) {
    throw new Error("useBundleContext used in BundleProvider");
  }
  return context;
}
