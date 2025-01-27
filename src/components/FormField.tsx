import React, { ChangeEvent } from "react";

// Define types for the props
interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface FormFieldProps {
  field: Field;
  value: any;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, error, onChange }) => {
  const { id, type, label, placeholder, options, required } = field;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : type === "select" ? (
        <select id={id} name={id} value={value} onChange={onChange}>
          <option value="">Select...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "radio" ? (
        <div className="radio-group">
          {options?.map((opt) => (
            <label key={opt.value}>
              <input
                type="radio"
                id={id}
                name={id}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : type === "checkbox" ? (
        <div className="checkbox-group">
          {options?.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                id={`${id}-${opt.value}`}
                name={id}
                value={opt.value}
                checked={Array.isArray(value) && value.includes(opt.value)}
                onChange={onChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : type === "file" ? (
        <div className="file-upload">
          <input type="file" id={id} name={id} onChange={onChange} />
        </div>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <div className="error-div"><span className="error-message">{error}</span></div>}
    </div>
  );
};

export default FormField;
