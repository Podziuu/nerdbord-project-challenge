import React from "react";
import {filesize} from "filesize";

const FileGallery = ({ files }: any) => {

  return (
    <div>
      {files.map((file: any) => {
        return (
          <div className="flex justify-between">
            <span>{file.name}</span>
            <span>{filesize(file.metadata.size)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FileGallery;
