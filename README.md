# Dynamic Form Generator

A React-based dynamic form generator that allows users to create and manage forms based on JSON schema input. The project supports real-time validation, dark mode, and schema editing through a built-in JSON editor.

---

## Features

- **Dynamic Form Rendering**: Generate forms dynamically based on a JSON schema.
- **Real-Time Validation**: Validate user input instantly as they type.
- **Dark Mode**: Toggle between light and dark modes for better user experience.
- **JSON Editor**: Edit the form schema directly in a built-in editor.
- **Import/Export Schema**: Easily upload or download the JSON schema.

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/saini6439/dynamic-form-generator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dynamic-form-generator
   ```

3. Install dependencies:
   ```bash
   npm install
   # OR
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # OR
   yarn start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Usage

1. **Dynamic Form Generation**:
   - The form is automatically generated based on the schema defined in `src/data/formSchema.json`.

2. **Real-Time Validation**:
   - The form validates inputs as the user types and displays errors dynamically.

3. **Dark Mode**:
   - Use the toggle button at the top of the page to switch between light and dark modes.

4. **JSON Editor**:
   - Edit the form schema directly in the editor provided below the form.
   - Changes are applied instantly to the form.

5. **Import/Export Schema**:
   - Import a JSON schema using the `Import Schema JSON` button.
   - Export the current schema using the `Export Schema JSON` button.

---

## Project Structure

```
.
├── public
├── src
│   ├── components
│   │   ├── FormField.tsx       # Component for rendering individual form fields
│   │   ├── FormGenerator.tsx   # Main component for generating the form
│   ├── data
│   │   ├── formSchema.json     # Default schema for the form
│   ├── styles.css              # CSS for styling the application
│   ├── App.tsx                 # Root component
│   └── index.tsx               # Entry point of the application
└── README.md                   # Project documentation
```

---

## Schema Example

Here is an example JSON schema used to generate the form:

```json
{
  "formTitle": "User Registration Form",
  "formDescription": "Please fill out the form to register.",
  "fields": [
    {
      "id": "username",
      "type": "text",
      "label": "Username",
      "required": true,
      "placeholder": "Enter your username",
      "validation": {
        "minLength": 3,
        "maxLength": 20
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "Enter your email",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    }
  ]
}
```

---

## Technologies Used

- **React**: For building the dynamic UI.
- **TypeScript**: For static typing and improved developer experience.
- **CSS**: For styling the application.

---

## Future Enhancements

- Add support for conditional rendering based on user input.
- Integrate backend services for saving and retrieving schemas.
- Provide more advanced validation rules.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
