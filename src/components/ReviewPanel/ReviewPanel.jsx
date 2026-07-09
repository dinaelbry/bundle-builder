import products from "../../data/products.json";
import ReviewItem from "../ReviewItem/ReviewItem";
import { useBundleContext } from "../../context/useBundleContext";
import "./ReviewPanel.css";
import { Truck } from "lucide-react";

const categoryLabels = {
  camera: "Cameras",
  sensor: "Sensors",
  accessory: "Accessories",
  plan: "Plan",
};

function ReviewPanel() {
const { getQuantity,saveSystem } = useBundleContext();
  const selectedLines = [];
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      const qty = getQuantity(product.id, variant.id);
      if (qty > 0) {
        selectedLines.push({ product, variant, qty });
      }
    });
  });

  const groups = Object.keys(categoryLabels)
    .map((category) => ({
      category,
      label: categoryLabels[category],
      lines: selectedLines.filter((line) => line.product.category === category),
    }))
    .filter((group) => group.lines.length > 0);

  // حساب الـ totals من نفس الـ selectedLines
  const totals = selectedLines.reduce(
    (acc, { product, qty }) => {
      const isMonthly = Boolean(product.priceSuffix);
      const lineTotal = product.price * qty;
      const lineOldTotal = (product.oldPrice ?? product.price) * qty;

      if (isMonthly) {
        acc.monthly += lineTotal;
      } else {
        acc.subtotal += lineTotal;
        acc.compareAtSubtotal += lineOldTotal;
      }
      return acc;
    },
    { subtotal: 0, compareAtSubtotal: 0, monthly: 0 },
  );

  const savings = totals.compareAtSubtotal - totals.subtotal;
  const financingEstimate = totals.subtotal / 12 + totals.monthly;
  const isEmpty = selectedLines.length === 0;

  return (
    <aside className="review-panel">
      <h2>Your security system</h2>
      <p className="review-panel__subtitle">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      {groups.map((group) => (
        <div className="review-group" key={group.category}>
          <h3 className="review-group__label">{group.label}</h3>
          {group.lines.map(({ product, variant, qty }) => (
            <ReviewItem
              key={`${product.id}-${variant.id}`}
              product={product}
              variant={variant}
              qty={qty}
            />
          ))}
        </div>
      ))}

      <div className="review-panel__perks">
        <div className="review-perk">
          <span className="review-perk__label">
            <Truck size={18} />
            Fast Shipping
          </span>
          <span className="price-shipping">
            <span className="price-old">$5.99</span>
            <span className="price-free">FREE</span>
          </span>
        </div>
      </div>

      <div className="review-panel__guarantee">
        <img
          src="/images/Satisfaction Badge-05 1.png"
          alt="Satisfaction guarantee"
          className="guarantee-badge"
        />
        <div>
          <p className="guarantee-title">30-day hassle-free returns</p>
          <p className="guarantee-desc">
            If you're not totally in love with the product, we will refund you
            100%.
          </p>
        </div>
      </div>

      <div className="review-panel__totals">
        <div className="totals-row-wrapper">
          <span className="financing-pill">
            as low as ${financingEstimate.toFixed(2)}/mo
          </span>
          <div className="total-row">
            {savings > 0 && (
              <span className="price-old">
                ${totals.compareAtSubtotal.toFixed(2)}
              </span>
            )}
            <span className="price-new">${totals.subtotal.toFixed(2)}</span>
          </div>
        </div>
        {savings > 0 && (
          <p className="savings-text">
            Congrats! You're saving ${savings.toFixed(2)} on your security
            bundle!
          </p>
        )}
      </div>

      <button type="button" className="checkout-btn" disabled={isEmpty}>
        Checkout
      </button>
      <a href="#" className="save-link" onClick={(e) => {
        e.preventDefault();
        saveSystem();
      }}>
        Save my system for later
      </a>
    </aside>
  );
}

export default ReviewPanel;
