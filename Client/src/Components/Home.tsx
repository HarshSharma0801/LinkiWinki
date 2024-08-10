import { Navbar } from "./Navbar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createURL } from "../services/url";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const [original_url, setOriginalUrl] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: createURL,
    mutationKey: ["url"],
    onSuccess: () => {
      navigate("/view");
    },
  });

  const handleclick = () => {
    if (username === null || original_url === null) {
      toast.error("Please fill the details !");
    } else {
      const data = {
        username: username,
        original_url: original_url,
      };
      createMutation.mutate(data);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="w-full flex flex-col flex-start justify-center items-center">
        <div className="py-10 text-[48px] font-[600] text-center">
          Shorten Your Link Now
        </div>

        <div className="flex justify-center gap-10 w-full px-16">
          <div className="py-10 text-[30px] pl-16 w-full font-[600] text-left items-center">
            Enter Your Username :
          </div>
          <div className="items-center flex justify-center w-full">
            <div className="w-full">
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="outline-none border text-[20px] border-slate-500 p-4 rounded-[16px] w-[90%]"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-10 w-full px-16">
          <div className="py-10 text-[30px] w-full pl-16 font-[600] text-left items-center">
            Enter Your URL :
          </div>
          <div className="items-center flex justify-center w-full">
            <div className="w-full">
              <input
                onChange={(e) => {
                  setOriginalUrl(e.target.value);
                }}
                className="outline-none border  text-[20px] border-slate-500 p-4 rounded-[16px] w-[90%]"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <button
            onClick={handleclick}
            className="border border-white px-10 py-3  text-[24px] rounded-[16px] bg-black  text-white "
          >
            Make URL
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
