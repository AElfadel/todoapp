"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-gray-200 m-auto rounded-full  text-center shadow-lg max-w-[120px] p-8 mt-80">
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
}
