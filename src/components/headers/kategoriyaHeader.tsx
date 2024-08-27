import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { Typography } from "antd";

export const KategoriyaHeader = () => {
  return (
    <div className="flex">
      <div className="flex border-x-4 border-x-[#edeff3] w-[205px] h-[80px] p-3 justify-center gap-3">
        <div className="w-[35px] h-[35px] rounded-full bg-[#20D472] flex items-center justify-center">
          <FaPlus style={{ color: "white", fontSize: "17px" }} />
        </div>
        <Typography
          style={{
            width: "120px",
            color: "#2D3A45",
            lineHeight: "18px",
            fontWeight: "600px",
          }}
        >
          Yangi kategoriya qo'shish
        </Typography>
      </div>
      <div className="w-[460px] flex justify-center content-center items-center gap-5">
        <div className="flex justify-center content-center items-center">
          <div className="w-[300px] h-[48px] bg-[#edeff3] flex flex-row rounded-[35px] justify-between py-3 px-6 items-center">
            <input
              placeholder="Qidirish"
              style={{
                backgroundColor: "#edeff3",
                border: "none",
                background: "transparent",
                outline: "none",
              }}
            />
            <IoSearchOutline style={{ fontSize: "21px", color: "#8D9BA8" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
