import React, { useState } from "react";
import { useFile } from "../hooks/useFile";

const DUMMY_DATA = [
  {
    isFolder: true,
    name: "Root",
    id: "folder1",
    children: [
      {
        isFolder: true,
        name: "public",
        id: "folder2",
        children: [
          {
            isFolder: false,
            name: "index.html",
            id: "file1",
          },
        ],
      },
      {
        isFolder: true,
        name: "node_modules",
        children: [],
        id: "folder3",
      },
      {
        isFolder: true,
        name: "src",
        id: "folder4",
        children: [
          {
            isFolder: false,
            name: "index.jsx",
            id: "file2",
          },
        ],
      },
      {
        isFolder: false,
        name: "package.json",
        id: "file3",
      },
    ],
  },
];

const FileContext = React.createContext({
  data: [],
  onChange: (updatedData) => {},
  onInsertFile: (newData, folderId) => {},
  onDeleteFile: (id) => {},
  onUpdateFile: (newDataName, id) => {},
});

const FileContextProvider = ({ children }) => {
  const [data, setData] = useState(DUMMY_DATA);
  const { insertFile, deleteFile, updateFile } = useFile(data);
  const handleInsertFile = (newData, folderId) => {
    const updatedData = insertFile(data, newData, folderId);
    setData(updatedData);
  };
  const handleUpdateFile = (updatedFile, id) => {
    const updatedData = updateFile(data, updatedFile, id);
    setData(updatedData);
  };
  const handleDeleteFile = (id) => {
    const updatedData = deleteFile(data, id);
    setData(updatedData);
  };

  const contextValue = {
    data: data,
    onChange: (updatedData) => {
      setData(updatedData);
    },
    onInsertFile: handleInsertFile,
    onUpdateFile: handleUpdateFile,
    onDeleteFile: handleDeleteFile,
  };
  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};

export { FileContext, FileContextProvider };
