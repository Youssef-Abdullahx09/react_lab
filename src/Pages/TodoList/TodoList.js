import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios";

const TodoList = () => {
  let [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodoList();
  }, []);

  let getTodoList = async () => {
    await axiosInstance
      .get("/todoList")
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async (todo) => {
    await axiosInstance
      .delete(`/todoList/${todo.id}`)
      .then((res) => {
        const updatedTodoList = todoList.filter((item) => item !== todo);
        setTodoList(updatedTodoList);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="row p-5">
        <div className="col-6 text-start text-primary">
          <h1>Todo List</h1>
        </div>
        <div className="col-6 text-end">
          <Link to="/todoList/create" className="btn btn-primary">
            Add New Todo
          </Link>
        </div>
      </div>

      <div>
        <table className="table tale-bordered table-striped container">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
                <td>
                  <div className="w-75 btn-group" role="group">
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/todoList/edit/${todo.id}`}
                    >
                      Edit
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="w-75 btn-group">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(todo)}
                    >
                      Delete
                    </button>
                    {/* <Link className="btn btn-danger mx-2">Delete</Link> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TodoList;
