// src/components/ui/checkbox.jsx
import React from 'react';

export const Checkbox = ({ checked, onChange, id }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    id={id}
    className="form-checkbox"
  />
);
