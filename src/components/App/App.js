import { ContactForm } from "../ContactForm";
import { ContactFormik } from "../ContactFormik";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>React Hook Form</h1>
      <ContactForm />
      <h1>Formik</h1>
      <ContactFormik />
    </div>
  );
}

export { App };
