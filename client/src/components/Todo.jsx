import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  // const [updatetode,setUpdatetodo] = useState({
  //   title:""
  //   description:""
  // })
  const [deldata, setDeldata] = useState({
    id: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (id) => {
    console.log("delete", id);
    handleDeletefunc(id);
  };
  const handleUpdate = (id, title, description) => {
    // handleUpdatefunc(id);
    // console.log("settodo",setTodo);
    // setTodo.title = title
    // setTodo.description = description
    setTodo({
      // ...todo,
      title: title,
      description: description,
    });
    handleUpdatefunc(id);
  };
  const handleUpdatefunc = async (id, payload) => {
    console.log("todo", todo);

    // let {title,description} = payload;
    setId(id);
    // try {
    //
    //   const res = await response.json();
    //   console.log("response", response, res);
    // } catch (error) {
    //   console.log("Error ", error);
    // }
  };
  const handleDeletefunc = async (id) => {
    try {
      const payload = { id };
      console.log("payload", payload);
      const del = await axios.delete(
        `http://localhost:3000/todo/deleteTodo/${id}`
      );
      // console.log("del", del);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo/getalltodo");
      const json = await response.json();
      console.log("data", json.data.content);

      setData(json.data.content);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("todosubmit", todo);
    console.log("idtodosubmit", id);

    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:3000/todo/updatetodo/${id}`,
          todo
        );
        console.log("Put", response);
      } else {
        const response = await axios.post(
          "http://localhost:3000/todo/createtodo",
          todo
        );
        console.log("PostMethod", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setTodo((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="">
      <form onSubmit={handleFormSubmit}>
        <div className=" w-[380px] h-[450px] bg-slate-200 rounded-md mx-auto  shadow-lg">
          <br />
          <p className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 underline decoration-wavy text-center ">
            ToDo App
          </p>
          <br />
          <div className=" flex justify-between mx-4">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-[180px] h-[30px] px-2 outline-none"
              value={todo.title}
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div className="flex justify-between mx-4">
            <label> Description </label>

            <input
              name="description"
              placeholder="Description"
              className="w-[180px] h-[100px] box-border px-2 outline-none"
              value={todo.description}
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div className="flex justify-end mx-4">
            <button
              className="bg-cyan-500 hover:bg-cyan-600 px-4 py-1 text-white text-center rounded-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8 ">
        {data.length > 0 ? (
          <div className="flex-wrap flex justify-center gap-8">
            {data.map((e, i) => (
              <div className=" w-[250px]  box-border " key={i}>
                <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                  <h3 className="text-slate-900 dark:text-white text-base font-medium tracking-tight">
                    {e.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm w-full text-clip overflow-hidden ">
                    {e.description}
                  </p>
                  <div className="flex mt-4 gap-x-3.5">
                    <button
                      className="bg-red-500 rounded-full flex-initial w-32 text-white py-1"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="rounded-full bg-lime-500 flex-initial w-32 text-white py-1 "
                      onClick={() =>
                        handleUpdate(e._id, e.title, e.description)
                      }
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <li>No data to display</li>
        )}
      </div>
    </div>
  );
};

export default Todo;
