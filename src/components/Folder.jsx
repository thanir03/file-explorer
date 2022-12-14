import React, { useContext, useRef, useState } from "react";
import FileExplorer from "./FileExplorer";
import folderImage from "../assets/folder.png";
import fileImage from "../assets/file.png";
import { FileContext } from "../context/context";
import { v4 } from "uuid";

function Folder({ data }) {
  const { onDeleteFile, onInsertFile, onUpdateFile } = useContext(FileContext);
  const [isFolderShown, setIsFolderShown] = useState(false);
  const [isInputFieldShown, setIsInputFieldShown] = useState(false);
  const [isFolderType, setIsFolderType] = useState();
  const [isEditting, setIsEditting] = useState(true);
  const inputFieldRef = useRef();
  const isRootDirectory = data.name === "Root";

  const handleToggleFolder = (event) => {
    event.stopPropagation();
    setIsFolderShown((prev) => !prev);
  };

  const handleBlurForm = () => {
    setIsInputFieldShown(false);
  };

  const handleShowForm = (event, isFolderType) => {
    // to stop closing the folder
    event.stopPropagation();
    setIsEditting(false);
    setIsFolderType(isFolderType);
    setIsInputFieldShown(true);
  };

  const handleEditForm = (event) => {
    event.stopPropagation();
    setIsEditting(true);
    setIsInputFieldShown(true);
    setIsFolderType(data.isFolder);
  };

  const handleSubmitForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isEditting) {
      handleEditFile(event);
    } else {
      handleAddFile(event);
    }
  };
  const handleAddFile = (event) => {
    const formData = {
      name: inputFieldRef.current.value,
      isFolder: isFolderType,
      id: v4(),
    };
    if (formData.isFolder) {
      formData.children = [];
    }
    onInsertFile(formData, data.id);
    inputFieldRef.current.value = "";
    setIsInputFieldShown(false);
    setIsFolderShown(null);
  };

  const handleEditFile = (event) => {
    const newFile = {
      ...data,
      name: inputFieldRef.current.value,
    };
    onUpdateFile(newFile, data.id);
    setIsEditting(false);
    inputFieldRef.current.value = "";
    setIsInputFieldShown(false);
    setIsFolderShown(null);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDeleteFile(data.id);
  };

  return (
    <li className="folder">
      <div className="folder-container" onClick={handleToggleFolder}>
        <img className="logo" src={folderImage} alt="folder logo" />
        <p>{data.name}</p>
        <button onClick={(event) => handleShowForm(event, true)}>
          Folder +
        </button>
        <button onClick={(event) => handleShowForm(event, false)}>
          File +
        </button>
        <button onClick={handleEditForm}>Edit</button>
        {!isRootDirectory && <button onClick={handleDelete}>Delete</button>}
      </div>
      {isInputFieldShown && (
        <form onSubmit={handleSubmitForm}>
          <img
            className="logo"
            src={isFolderType ? folderImage : fileImage}
            alt="folder logo"
          />
          <input
            onBlur={handleBlurForm}
            ref={inputFieldRef}
            type="text"
            autoFocus
          />
        </form>
      )}
      {isFolderShown && <FileExplorer data={data.children} />}
    </li>
  );
}

export default Folder;

// Todo : hide the form when the user clicks away from the form
