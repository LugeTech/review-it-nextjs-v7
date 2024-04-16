import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-4">
      <SignUp
        appearance={{
          elements: {
            socialButtonsBlockButton: "dark:text-white",
            dividerText: "text-white",
            footerActionText: "text-white",
          },
        }}
      />
    </div>
  );
}
