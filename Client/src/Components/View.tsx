import { Navbar } from "./Navbar";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GetUrls } from "../services/url";
import { GetQR } from "../services/url";
import { saveAs } from "file-saver";
import { updateURL } from "../services/url";

import Modal from "react-modal";

interface LinkType {
  id: string;
  username: string;
  original_url: string;
  shorten_url: string;
  shorten_id: string;
  click_counts: number;
  qr_counts: number;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const View = () => {
  const [username, setUsername] = useState<string>("");
  const [Links, setLinks] = useState<LinkType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<LinkType | null>(null);
  const [QRCode, setQRCode] = useState<string | null>(null);

  const [updatedLink, setUpdatedLink] = useState<string>("");

  const FetchUrlMutation = useMutation({
    mutationFn: GetUrls,
    mutationKey: ["url"],
    onSuccess: (data) => {
      setLinks(data);
    },
  });

  const DownloadQR = () => {
    if (QRCode) {
      saveAs(QRCode, "qrCode.jpg");
    }
  };

  const FetchQRMutation = useMutation({
    mutationFn: GetQR,
    mutationKey: ["qr"],
    onSuccess: (data) => {
      setQRCode(data);
      setIsOpen(true);
    },
  });

  const UpdateUrlMutation = useMutation({
    mutationFn: updateURL,
    mutationKey: ["url"],
    onSuccess: () => {
      handleClick();
      setIsUpdateOpen(false);
    },
  });

  const handleClick = () => {
    FetchUrlMutation.mutate(username);
  };

  const handleUpdate = () => {
    if (activeLink) {
      const data = {
        link: updatedLink,
        shortId: activeLink?.shorten_id,
      };
      UpdateUrlMutation.mutate(data);
    }
  };

  return (
    <>
      <Navbar />
      <Modal isOpen={isOpen} style={customStyles}>
        <div className="relative xl:w-[500px] h-[450px] flex flex-col gap-10 justify-start items-center">
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="absolute top-[12px] right-[12px] cursor-pointer"
          >
            Close
          </div>
          <div className="text-4xl font-[600] pt-10">Scan QR</div>
          <div className="flex justify-center ">
            <div className="w-[200px] h-[200px]">
              {QRCode && (
                <img
                  src={QRCode}
                  alt="qr"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={DownloadQR}
              className="border border-white py-3 px-6  text-[20px] rounded-[16px] bg-black  text-white "
            >
              Download
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isUpdateOpen} style={customStyles}>
        <div className="relative xl:w-[500px] h-[350px] flex flex-col gap-10 justify-start items-center">
          <div
            onClick={() => {
              setIsUpdateOpen(false);
            }}
            className="absolute top-[12px] right-[12px] cursor-pointer"
          >
            Close
          </div>
          <div className="text-4xl font-[600] pt-10">Edit Orginal Link</div>
          <div className="flex justify-center ">
            {activeLink && (
              <>
                <input
                  onChange={(e) => {
                    setUpdatedLink(e.target.value);
                  }}
                  value={updatedLink}
                  className="outline-none border text-[28px] border-slate-200 p-3 rounded-[16px] w-[90%]"
                  type="text"
                />
              </>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleUpdate}
              className="border border-white py-3 px-6  text-[20px] rounded-[16px] bg-black  text-white "
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>

      <div className="w-full  flex flex-col gap-10 justify-center items-center">
        <div className="flex justify-center gap-16 w-full">
          <div className="py-10 text-[40px] w-full font-[600] text-center items-center">
            Enter Your Username :
          </div>
          <div className="items-center flex justify-center w-full">
            <div className="w-full">
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="outline-none border text-[28px] border-slate-200 p-6 rounded-[16px] w-[90%]"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="border border-white px-10 py-3  text-[24px] rounded-[16px] bg-black  text-white "
          >
            View
          </button>
        </div>

        <div className="w-full flex-col flex gap-4 px-12">
          <div className="flex w-full rounded-[16px] font-[600] border-slate-300 bg-slate-200 p-6">
            <div className="text-left w-[50%] ">Shorten Link</div>
            <div className="text-left w-[18%] ">Original Link</div>
            <div className="text-left w-[12%] ">Click Counts</div>
            <div className="text-left w-[12%] ">QR Counts</div>
            <div className="text-left w-[12%] ">Edit</div>
            <div className="text-left w-[12%]">View QR</div>
          </div>

          {Links.length > 0 &&
            Links.map((data: LinkType) => {
              return (
                <>
                  <div className="flex w-full rounded-[16px] border-slate-300 bg-slate-100 p-6">
                    <div className="text-left w-[50%] ">
                      <a
                        href={data.shorten_url}
                        className="text-blue-500"
                        target="_blank"
                      >
                        {data.shorten_url}
                      </a>
                    </div>
                    <div className="text-left w-[18%] ">
                      {data.original_url.slice(0, 20)}...
                    </div>
                    <div className="text-left w-[12%] ">
                      {data.click_counts}
                    </div>
                    <div className="text-left w-[12%] ">{data.qr_counts}</div>
                    <div className="text-left w-[12%] ">
                      <button
                        onClick={() => {
                          setActiveLink(data);
                          setUpdatedLink(data.original_url);
                          setIsUpdateOpen(true);
                        }}
                        className="border border-white p-3 py-2  text-[16px] rounded-[10px] bg-black  text-white"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-left w-[12%]">
                      <button
                        onClick={() => {
                          FetchQRMutation.mutate(data.shorten_id);
                        }}
                        className="border border-white p-3 py-2  text-[16px] rounded-[10px] bg-black  text-white"
                      >
                        View QR
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default View;
