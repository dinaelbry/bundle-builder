import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import VariantSelector from "../VariantSelector/VariantSelector";
import { useBundleContext } from "../../context/useBundleContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [activeVariantId, setActiveVariantId] = useState(
    product.variants[0]?.id ?? null,
  );
  const { getQuantity, increment, decrement } = useBundleContext();

  const isSelected = product.variants.some(
    (v) => getQuantity(product.id, v.id) > 0,
  );

  return (
    <div
      className={`product-card ${isSelected ? "product-card--selected" : ""}`}
    >
      {product.discount && <span className="badge">{product.discount}</span>}

      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a href="#">Learn More</a>

        <VariantSelector
          variants={product.variants}
          activeVariantId={activeVariantId}
          onSelect={setActiveVariantId}
        />

        <div className="bottom">
          <div className="stepper">
            <button
              className="stepper-btn"
              disabled={product.disabled}
              onClick={() => decrement(product.id, activeVariantId)}
            >
              <Minus size={16} />
            </button>
            <span>{getQuantity(product.id, activeVariantId)}</span>
            <button
              className="stepper-btn"
              disabled={product.disabled}
              onClick={() => increment(product.id, activeVariantId)}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="price">
            {product.oldPrice && (
              <span className="price-old">
                $
                {(
                  product.oldPrice *
                  Math.max(1, getQuantity(product.id, activeVariantId))
                ).toFixed(2)}
              </span>
            )}
            <span className="price-new">
              $
              {(
                product.price *
                Math.max(1, getQuantity(product.id, activeVariantId))
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
