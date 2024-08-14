import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";

export const CommerceTypes2 = ({ onChange, commerces, commerce}) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(commerce?.typeCommerce?.nom || '');

  useEffect(() => {
    if (commerces && commerces.length > 0) {
      const uniqueItems = Array.from(new Set(commerces.map(commerce => commerce?.typeCommerce?.nom)));
      setItems(uniqueItems);
    }
  }, [commerces]);

  const search = (e) => {
    let filteredItems;
    if (!e.query.trim().length) {
      filteredItems = Array.from(new Set(commerces.map(commerce => commerce?.typeCommerce?.nom)));
    } else {
      filteredItems = commerces
        .map(commerce => commerce?.typeCommerce?.nom)
        .filter(item => item && item.toLowerCase().includes(e.query.toLowerCase()));
      filteredItems = Array.from(new Set(filteredItems));
    }
    setItems(filteredItems);
  };

  return (
    <AutoComplete
      className="mb-0"
      value={value || ''}
      name="typeCommerce"
      suggestions={items || []}
      completeMethod={search}
      onChange={(e) => {
        setValue(e.value);
        onChange(e);
      }}
      dropdown
      placeholder="type commerce.."
    />
  );
};
