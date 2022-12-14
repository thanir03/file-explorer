function useFile() {
  // Updating files recursively
  const insertFile = (data, file, folderId) => {
    return data.map((item) => {
      if (item.id === folderId) {
        item.children = [file, ...item.children];
      } else if (item.isFolder) {
        item.children = insertFile(item.children, file, folderId);
      }
      return item;
    });
  };
  //   delete file through recursion
  const deleteFile = (fileExplorerData, id) => {
    return fileExplorerData.filter((item) => {
      if (item.id === id) {
        return false;
      } else if (item.isFolder) {
        item.children = deleteFile(item.children, id);
      }
      return true;
    });
  };
  const updateFile = (fileExplorerData, updatedFile, id) => {
    return fileExplorerData.map((item) => {
      if (item.id === id) {
        return updatedFile;
      } else if (item.isFolder) {
        item.children = updateFile(item.children, updatedFile, id);
      }
      return item;
    });
  };
  return { insertFile, deleteFile, updateFile };
}

export { useFile };
