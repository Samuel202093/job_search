import { createContext, useContext, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'
import Card from "../components/Card";
import imgError from '../assets/img/searchError.gif'
import { jobOptions } from "../data/data";


//using swr to fetch data
const fetcher = (url) => axios.get(url).then((res) => res.data);

export const formContext = createContext();

export const FormContextProvider = ({ children }) => {
  let { data, error, isLoading } = useSWR(
    "https://www.arbeitnow.com/api/job-board-api",
    fetcher
  ); //the swr handles the loading, error and data state
  const [resumeName, setResumeName] = useState("");
  const [select, setSelect] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [resumeError, setResumeError] = useState(true);
  const [showMobile, setShowMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({
            firstname: false,
            lastname: false,
            email: false,
            coverLetter: false
  });
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    coverLetter: "",
  });

  // loading state handled
  if (isLoading) return <div className="loader"></div>;

  // error state is been handled
  if (error)
    return (
      <div className="flex flex-col justify-center items-center gap-1 min-h-[20vh] mt-[1rem]">
        <img src={imgError} alt="" className="h-[40vh]" />
        <h2 className="text-xl font-bold font-sans">No Internet connection</h2>
        <span className="text-sm font-sans">
          check your connection, then refresh the page
        </span>
        <button
          className="bg-[#02735E]y border-2 border-[#02735E] text-sm font-semibold px-3 py-1 rounded"
          onClick={() => window.location.reload(true)}
        >
          Refresh
        </button>
      </div>
    );

  // handles the onchange attribute for the react-select component for search
  const handleSelectChange = (e) => {
    setSelect(e.value);
  };

  // pagination logic
  const recordsPerPage = 10; // number of data on each page
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(data?.data.length / recordsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1); // displays the numbers of the page in the pagination

  // previous page function for pagination
  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  // current page function for pagination
  const changeCurrrentPage = (id) => {
    setCurrentPage(id);
  };

  // next page function for pagination
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFocus = (e) => {
    setFocused({...focused, [e.target.name]: "true"})
  };

  // function for modal in mobile device
  const handleMobile = () => {
    setShowMobile(!showMobile);
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // }); // scrolls to the top of the page
    document.body.style.overflow = "hidden"; // to make the parent body not to scroll when the modal opens
  };

  // form handling in the listing page
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFocused(false);
  };

  // file upload handling in the listing page
  const handleUpload = (e) => {
    setResume(e.target.files[0]);
    setResumeName(e.target.files[0].name);
    setResumeError(!resumeError);
  };


  // form submission in the listing page
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      (formData.firstname === "" || formData.firstname.length < 4) ||
      (formData.coverLetter === "" || formData.coverLetter.length < 10) ||
      (formData.lastname === "" || formData.lastname.length < 4) ||
     (formData.email === "")||
      (resume === "")
    ) {
      toast.error("please enter the required fields", {
        transition: Slide,
        position: "top-right",
      });
      setLoading(false);
      setFocused(!focused);
    } else {
      setLoading(false);
      setFocused(false);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        coverLetter: "",
      });
      setResume(null);
      setShowMobile(!showMobile)
      toast.success(`${formData.firstname} ${formData.lastname} thanks for applying`, {
        transition: Slide,
        position: "top-right",
      });
      document.body.style.overflow = 'unset'
    }
  };

  //  filtration based on tag
  const filteredResult = data.data.filter((datum) =>
    datum.tags
      .toString()
      .replace(/\s/g, "")
      .toLocaleLowerCase()
      .split(",")
      .includes(select.replace(/\s/g, "").toLocaleLowerCase())
  );

  // function for display jobs in the card component
  const finalResult = (jobs, query) => {
    let filteredJob = jobs.slice(firstIndex, lastIndex);
    if (query) {
      filteredJob = filteredResult;
    return (filteredJob.length > 0 ? filteredJob.map((x, i) => <Card key={i} data={x}/>): <div className="flex flex-col justify-center items-center gap-2 border-2y border-red-700y min-h-[30vh] w-[100%] lg:w-[85%]"><img src={imgError} className="w-[100%] lg:w-[30%] h-[50vh]"/> <h1 className="text-xl font-semibold">Oops! Result not found</h1>
      <button className="bg-[#02735E] text-[#E4F2E7] font-semibold rounded px-3 py-[0.3rem] " onClick={()=> window.location.reload(true)}>Refresh</button>
    </div>)
    }
    return filteredJob.map((x, i) => <Card key={i} data={x} />);
  };

  // performs the function for search query
  const handleSearch = () => {
    finalResult(data.data, select);
  };

  return (
    <formContext.Provider
      value={{
        handleChange,
        handleFocus,
        handleSubmit,
        handleUpload,
        handleMobile,
        select,
        handleSelectChange,
        jobOptions,
        resume,
        resumeError,
        resumeName,
        loading,
        focused,
        formData,
        showMobile,
        setShowMobile,
        handleSearch,
        finalResult,
        nextPage,
        currentPage,
        data,
        changeCurrrentPage,
        prePage,
        numbers,
        // formError,
        btnDisabled
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(formContext);
}
