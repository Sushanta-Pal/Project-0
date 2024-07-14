import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";

function Todocard({ title, description, id, deleteId: handleDelete, display: handleDisplay }) {
  return (
    <div>
      <div className="card text-center mb-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="btn btn-primary" onClick={() => handleDisplay(id)}>
            <MdOutlineUpdate />Update
          </div>
          <div className="btn btn-danger" onClick={() => handleDelete(id)}>
            <RiDeleteBin6Fill />Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todocard;
