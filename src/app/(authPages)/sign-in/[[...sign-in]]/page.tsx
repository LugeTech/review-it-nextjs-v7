import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-8 mb-16 h-full">
      <SignIn />;
    </div>
  );
}
