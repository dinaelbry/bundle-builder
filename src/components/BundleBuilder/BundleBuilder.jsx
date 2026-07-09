import { useState } from "react";
import "./BundleBuilder.css";
import steps from "../../data/steps.json";
import products from "../../data/products.json";
import AccordionItem from "../Accordion/AccordionItem";
import ProductCard from "../ProductCard/ProductCard";
import { useBundleContext } from "../../context/useBundleContext";

function BundleBuilder() {
  const [openStepId, setOpenStepId] = useState(1);
  const { getQuantity } = useBundleContext();

  return (
    <div className="bundle-builder">
      <div className="builder">
        <div className="builder-title">
          <h1>Let's get started!</h1>
          <p>Build the security system that's right for you.</p>
        </div>
        {steps.map((step, index) => {
          const stepProducts = products.filter(
            (p) => p.category === step.category,
          );
 
          // number of product more than 0
          const selectedCount = stepProducts.filter((p) =>
            p.variants.some((v) => getQuantity(p.id, v.id) > 0),
          ).length;

          return (
            <AccordionItem
              key={step.id}
              step={step}
              selectedCount={selectedCount}
              isOpen={openStepId === step.id}
              onToggle={() => setOpenStepId(step.id)}
            >
              <div className="products-flex">
                {stepProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {index < steps.length - 1 && (
                <button
                  type="button"
                  className="next-step-btn"
                  onClick={() => setOpenStepId(steps[index + 1].id)}
                >
                  Next: {steps[index + 1].title}
                </button>
              )}
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
}

export default BundleBuilder;
