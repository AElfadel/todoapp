import React from "react";
import { BsTrash3 } from "react-icons/bs";

function TasksList({ task }: string) {
  return (
    <div className="flex flex-row mx-auto p-1 py-2 bg-white w-[500px] justify-between cursor-pointer hover:bg-gray-100">
      <div className="flex text-start ml-2 ">
        <input type="checkbox" className="mx-2" />
        <p className="pl-2">{task}</p>
      </div>

      <div className="text-right pr-4">
        <button className="hover:text-red-600">
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
}

export default TasksList;
