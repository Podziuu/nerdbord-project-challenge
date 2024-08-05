import React from "react";
import { filesize } from "filesize";

const FileGallery = ({ files }: any) => {
  if (!files || files.length === 0) {
    return <div>No files available</div>;
  }

  return (
    <div>
      {files.map((file: any) => {
        return (
          <div key={file.id} className="flex justify-between">
            <span>{file.name}</span>
            <span>{filesize(file.metadata.size)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FileGallery;
