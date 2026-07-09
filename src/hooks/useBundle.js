import { useState, useCallback } from "react";
import products from "../data/products.json";

const STORAGE_KEY = "bundle-builder:quantities";

function makeKey(productId, variantId) {
  return `${productId}-${variantId}`;
}

// use only when there is no anything in localstorage
function buildDefaultQuantities() {
  const initial = {};
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      initial[makeKey(product.id, variant.id)] = variant.quantity ?? 0;
    });
  });
  return initial;
}

// try to read from localstorage
function loadInitialQuantities() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // if canoot read from json ignore and return  default
  }
  return buildDefaultQuantities();
}
export function useBundle() {
  const [quantities, setQuantities] = useState(loadInitialQuantities);

  const getQuantity = useCallback(
    (productId, variantId) => {
      return quantities[makeKey(productId, variantId)] ?? 0;
    },
    [quantities],
  );

  const setQuantity = useCallback((productId, variantId, newQty) => {
    const clamped = Math.max(0, newQty);
    setQuantities((prev) => ({
      ...prev,
      [makeKey(productId, variantId)]: clamped,
    }));
  }, []);

  const increment = useCallback(
    (productId, variantId) => {
      setQuantity(productId, variantId, getQuantity(productId, variantId) + 1);
    },
    [getQuantity, setQuantity],
  );

  const decrement = useCallback(
    (productId, variantId) => {
      setQuantity(productId, variantId, getQuantity(productId, variantId) - 1);
    },
    [getQuantity, setQuantity],
  );

  const saveSystem = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
  }, [quantities]);

  return {
    getQuantity,
    setQuantity,
    increment,
    decrement,
    saveSystem,
  };
}
