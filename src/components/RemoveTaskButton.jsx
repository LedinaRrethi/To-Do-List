import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';  

const RemoveTaskButton = ({ onClick }) => {
  return (
    <button className="icon-button delete-button" onClick={onClick}>
       <FaTrashAlt />
    </button>
  );
};

export default RemoveTaskButton;
