"use client";
import { useRef, FormEvent } from "react";

import { createClient } from "@/utils/supabase/client";

const FileUpload = () => {
  const supabase = createClient();

  const fileRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];
      if (file.size > 1024 * 1024 * 10) {
        alert("File is too big");
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("File type not supported");
        return;
      }
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        alert(userError);
        return;
      }
      const user = userData.user.id;
      const { data, error } = await supabase.storage
        .from(user)
        .upload(`public/${file.name}`, file);
      if (error) {
        alert(error);
        return;
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>File</span>
        <input type="file" ref={fileRef} />
      </label>
      <button>Upload</button>
    </form>
  );
};

export default FileUpload;
