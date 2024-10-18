import { useRouter } from "next/router";
import { FaChessKnight } from "react-icons/fa";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <FaChessKnight size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;