import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-4">
      <SignUp
        appearance={{
          elements: {
            socialButtonsBlockButton: "dark:text-white dark:bg-slate-700",
            dividerText: "text-white",
            footerActionText: "text-white",
            footer: "dark:bg-myTheme-niceGrey",
          },
        }}
      />
    </div>
  );
}
