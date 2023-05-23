import { createBrowserRouter } from "react-router-dom";
import TodoList from "./Pages/TodoList/TodoList";
import AddingTodo from "./Pages/AddingTodo/AddingTodo";
import EditTodo from "./Pages/EditTodo/EditTodo";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/todoList/create",
    element: <AddingTodo />,
  },
  {
    path: "/todoList/edit/:id",
    element: <EditTodo />,
  },
]);
export default Routes;
