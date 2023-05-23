import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "./../../Axios";

const AddingTodo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    name: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
  });

  const changingValue = (e) => {
    if (e) {
      switch (e.target.name) {
        case "name":
          setTodo({ ...todo, name: e.target.value });
          setFormErrors({
            ...formErrors,
            name: todo.name.length < 2 ? "name not valid" : null,
          });
          break;
        case "description":
          setTodo({ ...todo, description: e.target.value });
          setFormErrors({
            ...formErrors,
            description:
              todo.description.length < 2 ? "description is not valid" : null,
          });
          break;
        default:
          return;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formErrors.name == null && formErrors.description == null) {
      axiosInstance
        .post("/todoList", todo)
        .then((res) => {
          navigate("/");
        })
        .catch((error) => console.log(error));
    } else {
      setFormErrors({
        name: "name not valid",
        description: "description not valid",
      });
    }
  };

  return (
    <>
      <div className="row p-5">
        <div className="col-6 text-start text-primary">
          <h1>New Todo</h1>
        </div>
        <div className="col-6 text-end">
          <Link to="/" className="btn btn-primary">
            Return Back To TodoList
          </Link>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <TextField
          style={{ width: 900, marginBottom: 20 }}
          value={todo.name}
          onChange={changingValue}
          name="name"
          label="Name"
          rows={5}
          variant="outlined"
        />
        {formErrors.name && (
          <div
            style={{ width: "1000px", marginBottom: 20 }}
            className="text-danger "
          >
            Name Needs To Be More Than 2 Characters
          </div>
        )}
        <TextField
          style={{ width: 900, marginBottom: 20 }}
          value={todo.description}
          onChange={changingValue}
          name="description"
          multiline
          rows={6}
          label="Description"
          variant="outlined"
        />
        {formErrors.description && (
          <div
            style={{ width: "1000px", marginBottom: 20 }}
            className="text-danger "
          >
            Dexcription Needs To Be More Than 2 Characters
          </div>
        )}
        <br />
        <Button
          style={{ width: 200 }}
          variant="primary"
          type="submit"
          onSubmit={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddingTodo;
