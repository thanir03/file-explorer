import File from "./File";
import Folder from "./Folder";

function FileExplorer({ data }) {
  return (
    <ul>
      {data.map((item) => {
        return item.isFolder ? (
          <Folder key={item.id} data={item} />
        ) : (
          <File key={item.id} data={item} />
        );
      })}
    </ul>
  );
}

export default FileExplorer;
