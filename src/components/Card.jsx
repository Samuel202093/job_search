import React, { useState } from "react";
import { HiOutlineOfficeBuilding, HiLocationMarker } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { data } = props;

  return (
    <div className="card-wrapper flex justify-between w-[100%] lg:w-[85%] min-h-[22vh] border-[1px] border-[red]y bg-[#014040] cursor-pointer text-[#E4F2E7] rounded">
      <div className="flex flex-col gap-3 md:gap-3 lg:gap-1 md:min-w-[30%] min-w-[100%] h-full px-3 py-2 lg:py-2 md:py-7 border-2y border-[rgb(255,0,0)]y">
        <h1 className="flex text-xl font-bold ">
          <BsStars className="text-xl text-[#e4f2e7] mr-2 mt-[0.2rem]" />
          {data.title.slice(0, 50)}
        </h1>
        <span className="flex text-[1rem] font-semibold bg-[#a66b49] w-fit px-3 py-1 rounded">
          <HiOutlineOfficeBuilding className="text-[#e4f2e7] text-xl mr-2 mt-[0.15rem]" />
          {data.company_name}
        </span>
        <div className="flex gap-[4rem]">
          <span className="flex text-[0.85rem] font-semibold italic font-serif">
            <HiLocationMarker className="text-[#e4f2e7] text-xl mr-2 mt-[-0.1rem]" />
            {data.location}
          </span>
          <span className="md:hidden block font-semibold">3d</span>
        </div>

        <div className="flex gap-5">
          <span className="font-bold bg-[#E4F2E7] text-[#000] px-4 py-[0.3rem] text-[1.1rem] rounded">
            {data.remote === false ? "onsite" : "remote"}
          </span>
          <p className="bg-[#E4F2E7] rounded text-[#000] px-3 py-[0.4rem] font-bold">
            <span>$90k - </span>
            <span>$110k</span>
          </p>
          <Link
            to={"/listing"}
            state={{ data: data }}
            className="md:hidden apply-btn bg-[#a66b49] shadow-lg px-4 py-[0.32rem] tracking-[0.15rem] font-semibold"
          >
            View
          </Link>
        </div>
        <span className="flex md:hidden self-start bg-[#E4F2E7] text-[#000] font-medium px-3 py-[0.35rem] rounded">
          {data.tags}
        </span>
      </div>

      <div className="hidden md:flex justify-center self-center items-centery gap-4 w-[20%] border-2y border-[red]y h-full">
        <span className="bg-[#E4F2E7] text-[#000] font-medium px-3 py-[0.35rem] rounded">
          {data.tags}
        </span>
      </div>

      <div className="hidden md:flex self-center justify-center items-centery gap-[4rem] md:gap-3 lg:gap-[4rem] w-[20%] border-2y border-[gold]y h-full">
        <span className="hidden md:block font-semibold">3d</span>
        <Link
          to={"/listing"}
          state={{ data: data }}
          className="apply-btn bg-[#a66b49] shadow-lg px-4 py-[0.32rem] tracking-[0.15rem] font-semibold"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Card;
