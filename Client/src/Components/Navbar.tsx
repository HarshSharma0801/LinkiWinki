import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full px-10 py-6 flex justify-between bg-black">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex text-center text-white text-4xl cursor-pointer "
        >
          LinkiWinki
        </div>

        <div className="flex justify-center gap-4 px-10">
          <button
            onClick={() => {
              navigate("/view");
            }}
            className="border border-white px-5 py-3 rounded-[16px] bg-black hover:bg-white text-white hover:text-black"
          >
            View Links
          </button>
        </div>
      </div>
    </>
  );
};
