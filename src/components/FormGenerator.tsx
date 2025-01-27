import React, { useState, ChangeEvent, FormEvent } from "react";
import FormField from "./FormField.tsx";
import defaultSchema from "../data/formSchema.json";
import "./styles.css";

// Define types for the field schema and form data
interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  validation?: {
    pattern?: string;
    message?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface Schema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const FormGenerator: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [schema, setSchema] = useState<Schema>(defaultSchema); // Ensure schema is typed properly
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [jsonEditorValue, setJsonEditorValue] = useState(JSON.stringify(defaultSchema, null, 2)); // JSON editor state

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value, checked, files } = e.target as HTMLInputElement;

    // Update form data
    setFormData((prev) => {
      if (type === "checkbox") {
        const prevValues = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...prevValues, value]
            : prevValues.filter((v: string) => v !== value),
        };
      }

      const fieldValue = type === "file" ? files?.[0] : value;
      return { ...prev, [name]: fieldValue };
    });

    // Real-time validation with proper type checks
    if (Array.isArray(schema.fields)) {
      const field = schema.fields.find((f: Field) => f.id === name);
      if (field) {
        const error = validateField(field, type === "checkbox" ? formData[name] || [] : value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      }
    } else {
      console.error("schema.fields is not an array.");
    }
  };

  const validateField = (field: Field, value: any): string | null => {
    const { required, validation } = field;
    if (required && (!value || (Array.isArray(value) && value.length === 0))) return "This field is required.";
    if (validation?.pattern && !new RegExp(validation.pattern).test(value)) return validation.message || "Invalid value.";
    if (validation?.minLength && value.length < validation.minLength)
      return `Minimum length is ${validation.minLength}.`;
    if (validation?.maxLength && value.length > validation.maxLength)
      return `Maximum length is ${validation.maxLength}.`;
    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (Array.isArray(schema.fields)) {
      schema.fields.forEach((field: Field) => {
        const error = validateField(field, formData[field.id]);
        if (error) newErrors[field.id] = error;
      });
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitted Data:", formData);
      alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schema, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "formSchema.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedSchema = JSON.parse(event.target?.result as string);
          setSchema(importedSchema);
          setJsonEditorValue(JSON.stringify(importedSchema, null, 2));
          alert("Schema imported successfully!");
        } catch (err) {
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonEditorValue(e.target.value);
    try {
      const updatedSchema = JSON.parse(e.target.value);
      setSchema(updatedSchema);
      setErrors({});
    } catch (err) {
      console.error("Invalid JSON syntax.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Top Controls */}
      <div className="top-controls">
        <div className="toggle-container">
          <label className="toggle">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>

        <label htmlFor="importSchema" style={{ fontWeight: "bold" }}>
          Import Schema JSON:
        </label>
        <input
          type="file"
          id="importSchema"
          accept="application/JSON"
          onChange={handleImport}
          style={{ marginBottom: "20px" }}
        />
      </div>

      <h2>{schema.formTitle}</h2>
      <p>{schema.formDescription}</p>

      <form onSubmit={handleSubmit}>
        {Array.isArray(schema.fields) &&
          schema.fields.map((field: Field) => (
            <FormField
              key={field.id}
              field={field}
              value={formData[field.id] || ""}
              error={errors[field.id]}
              onChange={handleChange}
            />
          ))}
        <button type="submit">Submit</button>
      </form>

      {/* JSON Editor */}
      <div className="json-editor">
        <h3>Edit Schema JSON:</h3>
        <textarea
          value={jsonEditorValue}
          onChange={handleJsonEditorChange}
          rows={10}
          style={{ width: "100%" }}
        />
      </div>

      {/* Bottom Controls */}
      <div className="schema-controls-bottom" style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleExport} type="button">
          Export Schema JSON
        </button>
      </div>
    </div>
  );
};

export default FormGenerator;
