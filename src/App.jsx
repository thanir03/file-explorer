import "./App.css";
import React, { useContext } from "react";
import FileExplorer from "./components/FileExplorer";
import { FileContext } from "./context/context";

// Folder type (isFolder : boolean , name : string, children : array of folder or file)

function App() {
  const { data } = useContext(FileContext);
  return <FileExplorer data={data} />;
}

export default App;
