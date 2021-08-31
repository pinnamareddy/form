import React, { useState } from "react";
import Pop from "./components/pop"
import "./App.css";
function App() {
  const [buttonpopup, setbuttonpopup] = useState(false)
  const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.Username === "" || item.Password === ""
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].Password === "") {
          allPrev[index].errors.Password = "Password is required";
        }

        if (form[index].Username === "") {
          allPrev[index].errors.Username = "Username is required";
        }
        return setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
      Password: "",
      Username: "",
      errors: {
        Password: null,
        Username: null,
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
    }
  };

  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " Is required",
          },
        };
      });
    });
  };
  
  const next = (e) =>{
    e.preventDefault();
    setbuttonpopup(()=>true)
  }
  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };
  return (
    <div className="app">
      <h1>Form to add datails</h1>

      {JSON.stringify(form)}
      
      <form>
        {form.map((item, index) => (
          <div className="row" key={`item-${index}`}>
           

            <div>
              <input
                type="text"
                className={
                  item.errors.Username
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Username"
                placeholder="Username"
                value={item.Username}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Username && (
                <div>{item.errors.Username}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                className={
                  item.errors.Password
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Password"
                placeholder="Password"
                value={item.Password}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Password && (
                <div className="invalid-feedback">{item.errors.Password}</div>
              )}
            </div>
            <button
              onClick={(e) => handleRemoveField(e, index)}
            >
              close
            </button>
          </div>
        ))}

        <button onClick={handleAddLink} >
          Add a link
        </button>
        <button onClick={next}>next</button>
        <Pop trigger={buttonpopup} setTrigger={setbuttonpopup}>
        </Pop>
      </form>
     
    </div>
  );
}
export default App;
