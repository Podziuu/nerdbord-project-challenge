"use client";

import { createClient } from "@/utils/supabase/client";
import { filesize } from "filesize";

const FileGallery = ({ files }: any) => {
  if (!files || files.length === 0) {
    return <div>No files available</div>;
  }

  const supabase = createClient();

  const downloadHandler = async (e: any) => {
    e.preventDefault();
    const fileId = e.target.id;
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      alert(userError);
      return;
    }
    const user = userData.user.id;
    // Supabase check if you have permission to download the file
    const { data, error } = await supabase.storage
      .from(user)
      .download(`public/${fileId}`);

    if (error) {
      console.error("Error downloading file:", error.message);
      alert("Error downloading file");
      return;
    }

    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileId;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="w-full">
      {files.map((file: any) => {
        return (
          <div key={file.id} className="flex justify-between">
            <span>{file.name}</span>
            <span>{filesize(file.metadata.size)}</span>
            <div className="space-x-4">
              <button onClick={downloadHandler} id={file.name}>
                Download
              </button>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileGallery;
