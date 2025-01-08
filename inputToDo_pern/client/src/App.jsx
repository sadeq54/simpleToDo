import InputToDo from "./components/InputToDo";
import ListToDo from "./components/ListToDo";
function App() {
  return (
    <>
      <div className="container w-3/4 mx-auto flex flex-col  items-center">
        <InputToDo />
        <ListToDo />
      </div>
    </>
  );
}

export default App;
