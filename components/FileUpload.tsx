"use client";
import { useRef, FormEvent } from "react";

import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const FileUpload = () => {
  const supabase = createClient();

  const fileRef = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];
      console.log(file);
      if (file.size > 1024 * 1024 * 10) {
        alert("File is too big");
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "text/plain") {
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
      router.refresh();
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
      <label className="space-x-8">
        <span>File</span>
        <input type="file" ref={fileRef} />
      </label>
      <button className="bg-green-700 px-4 py-2 rounded-lg">Upload</button>
    </form>
  );
};

export default FileUpload;
