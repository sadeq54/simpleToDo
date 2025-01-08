import { useState } from "react";

export default function InputToDo() {
  const [description, setInputState] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(description);
      const body = { description };
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
      // window.location = "/" to reload the page
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="capitalize text-2xl text-center mt-5 ">To Do List</h1>
      <form
        className="flex flex-row w-2/3 gap-2 items-center justify-center mt-5"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          className="w-2/4  p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-900 focus:border-slate-800"
          value={description}
          onChange={(e) => setInputState(e.target.value)}
        />
        <button className="bg-black text-white ml-2 py-2  px-5 rounded-lg">
          add
        </button>
      </form>
    </>
  );
}
