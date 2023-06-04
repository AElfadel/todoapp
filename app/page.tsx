"use client";

import TasksList from "@/components/TasksList";
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
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
import AddForm from "@/components/AddForm";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
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
      createdAt: serverTimestamp(),
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
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const todosArray: string[] = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(todosArray);
    });
    return () => unsubscribe();
  }, [setInput]);

  //Read Todo from firebase

  //The dependency array is used to stop the function from firing over and over again and causing a memeory leak

  //Update Task in firebase

  //Delete Task
  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <main className=" h-screen dark:text-white overscroll-none">
      <div className=" text-center border-black">
        {/* App name */}
        <div className="p-2 pb-4 text-center text-white font-bold">
          Ahmeds online Todo list
        </div>

        {/* Add Task Form */}
        <div className="bg-gray-200 p-6 w-[600px] m-auto rounded-3xl shadow-lg">
          <AddForm createTask={createTask} input={input} setInput={setInput} />

          {/* Table */}
          <div className="pt-4">
            {/* Head */}
            <div className="bg-gray-300 w-[504px] m-auto p-2 rounded-t-lg flex justify-between font-bold">
              <p className="px-2">Task</p>
              <p className="px-2">Status</p>
            </div>

            {/* Tasks */}
            <ul className=" h-[500px] overflow-auto overscroll-contain overflow-y-scroll">
              {tasks.map((task, index) => (
                <TasksList
                  key={index}
                  task={task}
                  toggleComplete={toggleComplete}
                  removeTask={removeTask}
                />
              ))}
            </ul>
            <p className="mt-4">
              {tasks.length === 1
                ? `You have ${tasks.length} task to complete`
                : tasks.length > 1
                ? `You have ${tasks.length} tasks to complete`
                : null}
            </p>
          </div>
        </div>
        <button
          className="bg-red-500  p-2 mt-4 rounded-full text-right text-sm text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
