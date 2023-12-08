/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0knIycQozGW
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div key="1" className="flex flex-col w-full min-h-screen p-10">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Package2Icon className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link className="font-bold" href="#">
            Reviews
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button className="rounded-full" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">John Doe</CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
              Dec 7, 2023
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This is a fantastic product. I would definitely recommend it to
              others.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="text-fuchsia-100">Approve</Button>
            <Button className="ml-4" variant="outline">
              Reject
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">John Doe</CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
              Dec 7, 2023
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This is a fantastic product. I would definitely recommend it to
              others.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="text-fuchsia-100">Approve</Button>
            <Button className="ml-4" variant="outline">
              Reject
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">John Doe</CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
              Dec 7, 2023
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This is a fantastic product. I would definitely recommend it to
              others.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="text-fuchsia-100">Approve</Button>
            <Button className="ml-4" variant="outline">
              Reject
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
