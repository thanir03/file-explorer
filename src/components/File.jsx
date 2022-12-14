import React, { useContext, useRef, useState } from "react";
import fileImage from "../assets/file.png";
import { FileContext } from "../context/context";

function File({ data }) {
  const [isInputFieldShown, setIsInputFieldShown] = useState(false);
  const { onDeleteFile, onUpdateFile } = useContext(FileContext);
  const inputFieldRef = useRef();
  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };
  const handleDelete = () => {
    onDeleteFile(data.id);
  };
  const handleEdit = () => {
    setIsInputFieldShown(true);
  };
  const handleBlurForm = () => {
    setIsInputFieldShown(false);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const newFile = {
      ...data,
      name: inputFieldRef.current.value,
    };
    onUpdateFile(newFile, data.id);
    setIsInputFieldShown(false);
    inputFieldRef.current.value = "";
  };
  return (
    <li className="file" onClick={handleStopPropagation}>
      <div className="file-container">
        <img className="logo" src={fileImage} alt="file logo" />
        <p>{data.name}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
      {isInputFieldShown && (
        <form onSubmit={handleSubmitForm}>
          <img className="logo" src={fileImage} alt="file logo" />
          <input
            onBlur={handleBlurForm}
            ref={inputFieldRef}
            type="text"
            autoFocus
          />
        </form>
      )}
    </li>
  );
}

export default File;
