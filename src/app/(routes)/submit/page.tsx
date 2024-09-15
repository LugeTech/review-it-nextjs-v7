import ProductForm from "@/app/components/NewProductForm";

const page = () => {
  return (
    <div className="flex flex-col w-full h-full p-2 sm:pt-8 bg-myTheme-lightbg  justify-start items-center">
      <ProductForm />
    </div>
  );
};

export default page;
