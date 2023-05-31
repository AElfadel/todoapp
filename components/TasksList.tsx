type toggleComplete = {
  toggleComplete: boolean;
};

import React from "react";
import { BsTrash3 } from "react-icons/bs";

const style = {
  completed: `bg-gray-400 text-black hover:bg-black hover:text-white`,
};

function TasksList({ task, toggleComplete, removeTask }) {
  return (
    <li className={task.completed ? style.completed : `bg-transparent `}>
      <li
        id="carrier"
        onClick={() => toggleComplete}
        className="flex flex-row mx-auto p-1 py-2 w-[500px] justify-between cursor-pointer "
      >
        <div className="flex text-start ml-2 pl-2">
          <input
            onChange={() => toggleComplete(task)}
            type="checkbox"
            checked={task.completed ? "checked" : ""}
          />
          <p className="pl-2">{task.name || task.text}</p>
        </div>

        <div className="text-right pr-4">
          <button className="hover:text-red-600">
            <BsTrash3 onClick={() => removeTask(task.id)} />
          </button>
        </div>
      </li>
    </li>
  );
}

export default TasksList;
