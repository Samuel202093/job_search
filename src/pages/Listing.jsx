import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import Loader from "../components/Loader";
import MobileForm from "../components/MobileForm";
import { useFormContext } from "../context/form";


const Listing = () => {
  const {
    focused,
    resume,
    resumeName,
    resumeError,
    loading,
    formData,
    handleChange,
    handleFocus,
    handleUpload,
    showMobile,
    setShowMobile,
    handleMobile,
    btnDisabled,
    handleSubmit,
  } = useFormContext();


  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate(-1);
  };



 

  return (
    <div className="flex justify-between p-3 lg:p-5">
      {/* back to previous page */}
      <IoMdArrowRoundBack
        className="previous absolute transition-all delay-150 ease-in-out text-3xl top-[1%] font-bold cursor-pointer hover:text-[#727171]"
        onClick={handlePrevPage}
      />
      <span className="tooltip hidden absolute top-[1%] lg:top-[1%] left-[12%] md:left-[7%] lg:left-[4%] text-sm border-[1px] border-[black] px-2 py-1 transition-all delay-150 ease-in">
        back to previous page
      </span>

      {/* job description */}
      <div className="flex justify-centery min-h-[25vh] border-2y border-[red]y w-[100%] lg:w-[55%] p-2 lg:p-3 mt-4 lg:mt-0">
        <div className="flex flex-col w-[100%] border-2y border-[black]y px-1 md:px-5 py-3 gap-3">
          <h1 className="text-3xl font-semibold font-sans">{data.title}</h1>
          <h2 className="text-base font-medium">{data.tags}</h2>
          <span className="text-base font-medium">{data.job_types}</span>
          <h3 className="text-base font-semibold">{data.location}</h3>
          <span className="font-semibold">
            {data.remote === false ? "onsite" : "remote"}
          </span>

          <p
            dangerouslySetInnerHTML={{ __html: data.description }}
            className="description"
          />

          {/* for mobile view */}
          <span
            className="lg:hidden bg-[#00acee] text-[#E4F2E7] flex self-end px-3 py-1 font-semibold rounded cursor-pointer"
            onClick={handleMobile}
          >
            Apply
          </span>
        </div>
      </div>

      {showMobile && <MobileForm />}

      {/* form container */}
      <div className="hidden lg:block listForm h-[140vh] border-2 border-[green]y w-[35%] p-5 rounded mt-8">
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Enter Firstname"
              className="h-[7vh] px-3 font-sm font-sans font-semibold focus:outline-none rounded border-[1px] border-[#888888]"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required={true}
              onBlur={handleFocus}
              focused={focused.firstname}
              pattern={"^[A-Za-z0-9]{5,15}$"}
            />

             
              <span className="error text-sm text-[red] font-medium">
                Firstname should contain 5 - 15 characters and should not
                include special characters
              </span>
            
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Enter Lastname"
              className="h-[7vh] px-3 font-sm font-sans font-semibold focus:outline-none rounded border-[1px] border-[#888888]"
              value={formData.lastname}
              onChange={handleChange}
              name="lastname"
              required={true}
              onBlur={handleFocus}
              focused={focused.lastname}
              pattern={"^[A-Za-z0-9]{5,15}$"}
            />
              <span className="error text-sm text-[red] font-medium">
                Lastname should contain 5 - 15 characters and should not include
                special characters
              </span>
            
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-red-800y h-[7vh] px-3 font-sm font-sans font-semibold focus:outline-none rounded border-[1px] border-[#888888]"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleFocus}
              focused={focused.email}
              required={true}
            
            />

              <span className="error text-sm text-[red] font-medium">
                It should be a valid email address!
              </span>        
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="resume"
              className="flex self-start text-sm font-bold cursor-pointer rounded px-3 py-2 border-[1px] border-[#888888] text-[#6b6b6b]"
            >
              {resume === null ? "Upload resume" : resumeName}
              <input
                type="file"
                id="resume"
                className="hidden cursor-pointer"
                name="resume"
                required={true}
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
            </label>
            {resumeError === true ? (
              <span className="text-sm text-[red] font-medium">
                please upload your resume
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              name="coverLetter"
              id=""
              cols="30"
              rows="10"
              placeholder="cover letter should contain 1 - 1000 characters"
              className="bg-[green]y border-[1px] border-[#888888] px-3 py-2 font-sm font-sans font-semibold focus:outline-none rounded"
              value={formData.coverLetter}
              onChange={handleChange}
              required={true}
              onBlur={handleFocus}
              focused={focused.coverLetter}
              pattern={"^[A-Za-z0-9]{5,1000}$"}
            ></textarea>

            
              <span className="error text-sm text-[red] font-medium">
                cover letter should contain 1 - 1000 characters and no special
                characters
              </span>
          </div>

          <button
            className="flex self-center transition-all ease-in-out delay-150 px-4 py-2 font-semibold font-sans rounded border-[1px] border-transparent text-[white] bg-[#02735E] tracking-[0.05rem] hover:bg-transparent hover:text-[#02735E] hover:border-[1px] hover:border-[#02735E] hover:font-bold"
            onClick={handleSubmit}
          >
            {loading === true ? <Loader /> : "submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
