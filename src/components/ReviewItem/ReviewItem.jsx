import { Minus, Plus } from "lucide-react";
import { useBundleContext } from "../../context/useBundleContext";

import "./ReviewItem.css";

function ReviewItem({ product, variant, qty }) {
  const { increment, decrement } = useBundleContext();

  return (
    <div className="review-item">
      <img
        src={variant.image ?? product.image}
        alt={product.name}
        className="review-item__image"
      />
      <span className="review-item__name">
        {product.name}
        {variant.name && product.variants.length > 1 && (
          <span className="review-item__variant"> ({variant.name})</span>
        )}
      </span>

      <div className="review-item__stepper">
        <button
          className="stepper-btn"
          disabled={product.disabled}
          onClick={() => decrement(product.id, variant.id)}
        >
          <Minus size={14} />
        </button>
        <span>{qty}</span>
        <button
          className="stepper-btn"
          disabled={product.disabled}
          onClick={() => increment(product.id, variant.id)}
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="review-item__price">
        {product.oldPrice && (
          <span className="price-old">
            ${(product.oldPrice * qty).toFixed(2)}
          </span>
        )}
        <span className={product.disabled ? "price-free" : "price-new"}>
          {product.disabled
            ? "FREE"
            : `$${(product.price * qty).toFixed(2)}${product.priceSuffix ?? ""}`}
        </span>
      </div>
    </div>
  );
}
export default ReviewItem;
