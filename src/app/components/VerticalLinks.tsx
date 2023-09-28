import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const VerticalLinks = () => {
  return (
    <div className="flex flex-col justify-between p-2 text-gray-500">
      <AiOutlineHome className="text-3xl" />
      <AiOutlineMail className="text-3xl" />
      <AiOutlinePhone className="text-3xl" />

    </div>
  )
}

export default VerticalLinks
