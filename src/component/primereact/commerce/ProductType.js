import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";

export const ProductType = ({ tooltip, onChange, commerces, commerce }) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(commerce?.sousGroupe || '');

  useEffect(() => {
    if (commerces && commerces.length > 0) {
      const uniqueItems = Array.from(new Set(commerces.map(commerce => commerce?.sousGroupe)));
      setItems(uniqueItems);
    }
  }, [commerces]);

  const search = (e) => {
    let filteredItems;
    if (!e.query.trim().length) {
      filteredItems = Array.from(new Set(commerces.map(commerce => commerce?.sousGroupe)));
    } else {
      filteredItems = commerces
        .map(commerce => commerce?.sousGroupe)
        .filter(item => item && item.toLowerCase().includes(e.query.toLowerCase()));
      filteredItems = Array.from(new Set(filteredItems));
    }
    setItems(filteredItems);
  };

  return (
    <AutoComplete
      className=""
      value={value || ''}
      name="sousGroupe"
      suggestions={items || []}
      completeMethod={search}
      onChange={(e) => {
        setValue(e.value);
        onChange(e);
      }}
      placeholder="type produit.."
      dropdown
      tooltip={tooltip || "Type Produit"}
    />
  );
};