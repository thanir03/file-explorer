const data = [
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

// Insert File

//? Root
//   public
//     index.html
// !    product.html
//   node_modules
//    src
//      index.jsx
//      package.json

// Delete file , add file , update file
