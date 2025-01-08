import { useState, useEffect, useRef } from "react";
import EditToDo from "./EditToDo";
export default function ListToDo() {
  const [todo, setToDo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const currentToDo = useRef(null);
  async function deleteHandler(id) {
    console.log(id);
    try {
      console.log("asdsa");
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      setToDo((prevToDo) => {
        return todo.filter((todo) => todo.todo_id !== id);
      });

      console.log(response);
    } catch (error) {
      console.log("asjbhdsbfjhdb");
      console.log(error.message);
    }
  }
  const fitchtoDo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo"); // by default is get request
      const jsonData = await response.json();
      setToDo(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  function onOpenModalHandler(todo) {
    currentToDo.current = todo;
    setIsOpen(true);
  }
  function onCloseModalHandler() {
    console.log("close");
    setIsOpen(false);
  }

  useEffect(() => {
    fitchtoDo();
  }, []);

  return (
    <>
      {isOpen && (
        <EditToDo
          isOpen={isOpen}
          onClose={onCloseModalHandler}
          todo={currentToDo.current}
        />
      )}

      <h1 className="uppercase text-2xl text-center mt-5 ">List to do</h1>
      <div className="flex flex-row gap-2 items-center justify-center mt-5">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody key="body">
            {todo.map((todo) => {
              return (
                <tr key={todo.todo_id} className="border-t border-gray-400">
                  <td>{todo.descreption}</td>
                  <td
                    key={todo.todo_id}
                    className="flex flex-row border-l border-gray-400 "
                  >
                    <button
                      onClick={() => deleteHandler(todo.todo_id)}
                      className="bg-gray-600 hover:bg-gray-800 hover: text-white font-bold py-2 px-4 my-5  mx-5 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onOpenModalHandler(todo)}
                      className="bg-blue-500 text-white py-2 px-4 my-5  mx-5 rounded"
                    >
                      Open Modal
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
