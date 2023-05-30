"use client";

import Tasks from "@/components/TasksList";
import React, { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([
    "Code for 3 hours",
    "Record Dafouri Podcast",
    "Play FIFA",
    "Sleep 8 hours",
    "And if I add another one?",
  ]);

  return (
    <main className=" h-screen dark:text-white">
      <div className=" text-center border-black">
        {/* App name */}
        <div className="p-2 text-center text-white font-bold">
          Ahmeds online Todo list
        </div>

        {/* Add Task Form */}

        <div className="bg-gray-200 p-12 w-[600px] m-auto rounded-3xl shadow-lg">
          <form className="w-[500px] m-auto">
            <div className="relative">
              <input
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
            <div className="bg-gray-300 w-[500px] m-auto p-2 rounded-t-lg flex justify-between font-bold">
              <p className="px-2">Task</p>
              <p className="px-2">Status</p>
            </div>

            {/* Tasks */}
            <ul className="">
              {tasks.map((task, index) => (
                <Tasks key={index} task={task} />
              ))}
              <p className="mt-4">You have 5 tasks to complete</p>
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
