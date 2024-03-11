import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const VerticalLinks = () => {
  return (
    <div className="flex flex-col justify-between p-2 text-2xl md:text-3xl text-gray-500 ">
      <div className="shadow-sm p-2 hover:shadow-md">
        <AiOutlineHome />
      </div>

      <div className="shadow-sm p-2 hover:shadow-md">
        <AiOutlineMail />
      </div>
      <div className="shadow-sm p-2 hover:shadow-md">
        <AiOutlinePhone />
      </div>

    </div>
  )
}

export default VerticalLinks
