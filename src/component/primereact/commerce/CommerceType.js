import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function InputCommerceType({ commerces, onChange }) {
  const [selectedCommerceType, setSelectedCommerceType] = useState(null);
  const [commerceTypes, setCommerceTypes] = useState([]);

  useEffect(() => {
    if (commerces && commerces.length > 0) {
      const uniqueTypes = Array.from(new Set(commerces.map(commerce => commerce.typeCommerce.nom)));
      setCommerceTypes(uniqueTypes);
    }
  }, [commerces]);

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        name="typeCommerce"
        value={selectedCommerceType}
        onChange={(e) => 
            {
                setSelectedCommerceType(e.value);
                onChange(e.value, e.target.name)
            }
        }
        options={commerceTypes}
        editable
        placeholder="Select a Commerce Type"
        className="w-full md:w-14rem"
      />
    </div>
  );
}
