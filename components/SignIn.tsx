"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-gray-200 mt-24 p-4 m-auto rounded-full  text-center shadow-lg w-[120px]">
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
}
