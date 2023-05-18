import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/Todo";
function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 ">
        <Todo />
      </div>
    </>
  );
}

export default App;
