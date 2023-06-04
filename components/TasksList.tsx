type toggleComplete = {
  toggleComplete: boolean;
};

import React from "react";
import { BsTrash3 } from "react-icons/bs";

const style = {
  completed: `bg-gray-400 text-black hover:bg-black hover:text-white`,
};

function TasksList({ task, toggleComplete, removeTask }) {
  const createdAt =
    task.createdAt &&
    task.createdAt.toDate().toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  return (
    <li className={task.completed ? style.completed : `bg-transparent `}>
      <li
        id="carrier"
        onClick={() => toggleComplete}
        className="flex mx-auto p-1 py-2 w-[500px] cursor-pointer "
      >
        <div className="flex-1">
          <div className="flex text-start ml-2 pl-2">
            <input
              onChange={() => toggleComplete(task)}
              type="checkbox"
              checked={task.completed ? "checked" : ""}
            />
            <p className="pl-2">{task.name || task.text}</p>
          </div>
        </div>

        <div className=" flex text-right pr-4">
          <p className="px-4">{createdAt}</p>
          <button className="hover:text-red-600">
            <BsTrash3 onClick={() => removeTask(task.id)} />
          </button>
        </div>
      </li>
    </li>
  );
}

export default TasksList;
