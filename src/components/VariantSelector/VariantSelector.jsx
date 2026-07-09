import "./VariantSelector.css";

function VariantSelector({ variants, activeVariantId, onSelect }) {
  return (
    <div className="variant-selector">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className={`variant-chip ${
            activeVariantId === variant.id ? "variant-chip--active" : ""
          }`}
          onClick={() => onSelect(variant.id)}
        >
          <img src={variant.image} alt="" className="variant-chip__swatch" />
          <span>{variant.name}</span>
        </button>
      ))}
    </div>
  );
}

export default VariantSelector;
