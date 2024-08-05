import LoginButton from "@/components/LoginButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/storage");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center h-screen justify-center">
      <LoginButton />
    </div>
  );
}
