import "./AccordionItem.css";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { FiCamera, FiShield } from "react-icons/fi";
import { LuRadar } from "react-icons/lu";
import { PiDotsNineBold } from "react-icons/pi";

const icons = {
  camera: <FiCamera />,
  shield: <FiShield />,
  sensor: <LuRadar />,
  extra: <PiDotsNineBold />,
};

function AccordionItem({ step, selectedCount, isOpen, onToggle, children }) {
  return (
    <div className={`accordion-item ${isOpen ? "accordion-item--open" : ""}`}>
      <div className="step-number">{step.step}</div>

      <button className="accordion-header" onClick={onToggle}>
        <div className="accordion-heaader">
          <div className="accordion-left">
            <span className="accordion-icon">{icons[step.icon]}</span>
            <span>{step.title}</span>
          </div>

          <div className="accordion-right">
            <span>{selectedCount} selected</span>
            <span className="accordion-arrow">
              {isOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
            </span>
          </div>
        </div>
      </button>

      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

export default AccordionItem;
