import LoginButton from "@/components/LoginButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import FileGallery from "@/components/FileGallery";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const {data, error} = await supabase.storage.from(user.id).list('public');

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <LoginButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-4 max-w-4xl px-3 w-full items-center">
        {/* <main className="flex-1 flex flex-col gap-6 w-full"> */}
          <h2 className="text-xl font-bold">Upload a photo</h2>
          <FileUpload />
          {!error && <FileGallery files={data} />}
          {error && <p>Error while loading files, please try again later.</p>}
        {/* </main> */}
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
