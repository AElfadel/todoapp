"use client";

import Tasks from "@/components/TasksList";
import React, { useEffect, useState } from "react";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //Create Todo

  const createTask = async (event) => {
    event.preventDefault(event);
    if (input === "") {
      alert("Please enter a task!");
      return;
      //Have to add a return to exit the code and not add an empty todo to the database
    }
    await addDoc(collection(db, "tasks"), {
      text: input,
      compelted: false,
    });
    setInput("");
  };

  //Toggle task dont or not
  const toggleComplete = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed,
    });
  };

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const todosArray: string[] = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(todosArray);
    });
    return () => unsubscribe();
  }, []);

  //Read Todo from firebase

  //The dependency array is used to stop the function from firing over and over again and causing a memeory leak

  //Update Task in firebase

  //Delete Task
  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <main className=" h-screen dark:text-white">
      <div className=" text-center border-black">
        {/* App name */}
        <div className="p-2 text-center text-white font-bold">
          Ahmeds online Todo list
        </div>

        {/* Add Task Form */}

        <div className="bg-gray-200 p-12 w-[600px] m-auto rounded-3xl shadow-lg">
          <form className="w-[500px] m-auto" onSubmit={createTask}>
            <div className="relative">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                type="search"
                id="search"
                className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write task here.."
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Task
              </button>
            </div>
          </form>

          {/* Table */}
          <div className="pt-4">
            {/* Head */}
            <div className="bg-gray-300 w-[504px] m-auto p-2 rounded-t-lg flex justify-between font-bold">
              <p className="px-2">Task</p>
              <p className="px-2">Status</p>
            </div>

            {/* Tasks */}
            <ul className="">
              {tasks.map((task, index) => (
                <Tasks
                  key={index}
                  task={task}
                  toggleComplete={toggleComplete}
                  removeTask={removeTask}
                />
              ))}
              <p className="mt-4">
                {tasks.length === 1
                  ? `You have ${tasks.length} task to complete`
                  : tasks.length > 1
                  ? `You have ${tasks.length} tasks to complete`
                  : null}
              </p>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /*
     <div className="">
          <button className="bg-purple-800 font-bold rounded-md text-white w-[500px] p-2 mb-4 hover:bg-purple-950">
            ADD NEW TASK +
          </button>



*/
}
