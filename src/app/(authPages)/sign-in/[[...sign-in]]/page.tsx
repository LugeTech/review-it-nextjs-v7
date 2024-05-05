import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-8 mb-16 h-full">
      <SignIn
        appearance={{
          elements: {
            socialButtonsBlockButtonText: "dark:text-white",
            dividerText: "dark:text-white",
            footer: "dark:bg-myTheme-niceGrey",
            socialButtonsBlockButton: "dark:bg-slate-700 ",
          },
        }}
      />
    </div>
  );
}
