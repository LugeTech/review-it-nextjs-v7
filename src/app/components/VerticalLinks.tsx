import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const VerticalLinks = () => {
  return (
    <div className="flex w-full text-xl md:text-2xl text-gray-500 ">
      <div className="shadow-sm p-1 hover:shadow-md ">
        <AiOutlineHome />
      </div>

      <div className="shadow-sm p-1 hover:shadow-md">
        <AiOutlineMail />
      </div>
      <div className="shadow-sm p-1 hover:shadow-md">
        <AiOutlinePhone />
      </div>
    </div>
  );
};

export default VerticalLinks;
