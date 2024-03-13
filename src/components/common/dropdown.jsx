import React, { useState, useEffect, useRef } from "react";
import "../../css/country.css";
import "./dropdown.css";

function renderListItem(
  item,
  iconClassProperty,
  titleProperty,
  subTittleProperty,
  onSelect
) {
  if (!item) return null;

  return (
    <li key={item.code} onClick={() => onSelect(item)} className="list-item  ">
      <div className={`icon ${item[iconClassProperty]}`}></div>
      <span className="name">{item[titleProperty]}</span>
      {subTittleProperty && (
        <span className="subtitle">{item[subTittleProperty]}</span>
      )}
    </li>
  );
}

const Dropdown = ({
  items,
  selectedItem,
  defaultItem,
  iconsClass,
  onChange,
  onSelect,
  arrowPosition,
  label,
  isRequired,
  iconClassProperty,
  inputValue,
  titleProperty,
  iconTittleProperty,
  subTittleProperty,
  name,
  error,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <span>{isRequired && "*"}</span>
      </label>
      <div className="dropdown-container">
        <div
          className={`${arrowPosition} ${iconsClass}`}
          id={arrowPosition}
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          <div className={`selected-icon ${iconsClass}`}>
            <div
              className={`icon ${
                selectedItem && selectedItem[iconClassProperty]
              }`}
            ></div>
            {iconTittleProperty && (
              <div className="phone-code">
                {selectedItem && selectedItem[iconTittleProperty]}
              </div>
            )}
          </div>
          <div className={`arrow  arrow${arrowPosition}`}></div>
          <ul
            ref={optionsRef}
            className={showOptions ? `list ${arrowPosition}-list` : "hide"}
          >
            {renderListItem(
              defaultItem,
              iconClassProperty,
              titleProperty,
              subTittleProperty,
              onSelect
            )}
            {items.map((item) =>
              renderListItem(
                item,
                iconClassProperty,
                titleProperty,
                subTittleProperty,
                onSelect
              )
            )}
          </ul>
          {error && arrowPosition === "left" && (
            <div
              className={`field-status bg-color ${arrowPosition}-attention-button`}
            >
              <i className="fas fa-times close"></i>
            </div>
          )}

          {inputValue && error && arrowPosition === "left" && (
            <div
              className={`field-status bg-color ${arrowPosition}-attention-button`}
            >
              <i className="fas fa-times close"></i>
            </div>
          )}

          {inputValue && !error && arrowPosition === "left" && (
            <div
              className={`field-status bg-color ${arrowPosition}-attention-button`}
            >
              <i className="fas fa-check check"></i>
            </div>
          )}
        </div>

        <input
          id={name}
          className="form-control-input"
          value={inputValue}
          onChange={(e) => onChange(e.target.value, e)}
          name={name}
        />
      </div>
    </div>
  );
};

export default Dropdown;
