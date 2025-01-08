import { createPortal } from "react-dom";
import { useRef, useEffect, useState } from "react";

const EditToDo = function EditToDo({ isOpen, onClose, todo }) {
  const modalRef = useRef(null);
  const [description, setDescreption] = useState(todo.descreption);
  console.log(description);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [isOpen]);

  async function updateHandler(e) {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:3000/todo/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  }
  function onCancel() {
    setDescreption(todo.descreption);
    onClose();
  }
  return createPortal(
    <>
      <dialog
        ref={modalRef}
        className=" fixed inset-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="px-4 py-2 flex justify-between items-center border-b">
            <h3 className="text-lg font-medium">Modal Title</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <p></p>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={description}
              onChange={(e) => setDescreption(e.target.value)}
            />
          </div>
          <div className="px-4 py-2 flex justify-end border-t gap-6">
            <button
              onClick={(e) => updateHandler(e)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>,
    document.getElementById("modale")
  );
};

export default EditToDo;
