import "./globals.css";
import { Provider } from "@/components/Provider";
import SignIn from "@/components/SignIn";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Ahmed's Todo tracker",
  description: "Built in Nextjs with Google Firebase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className="bg-gradient-to-r 
    from-gray-800 
    to-neutral-700
    via-black
    animate-gradient-x"
    >
      <body>
        <Provider session={session}>
          {!session ? <SignIn /> : <div>{children}</div>}
        </Provider>
      </body>
    </html>
  );
}
