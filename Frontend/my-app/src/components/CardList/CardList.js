import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  MdOutlinePerson,
  MdOutlinePerson2,
  MdOutlineMailOutline,
} from "react-icons/md";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

import Filter from "../Filter/Filter";

const CardList = ({ items, manualItems, onDelete, openForm }) => {
  const [view, setView] = useState(true);
  const [hoveredInfo, setHoveredInfo] = useState(null); // Track the hovered info (name or email)
  const itemsData = items.reverse();


  function capitalizeFirstLetter(string) {
    if (string && typeof string === "string") {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return string;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[100%] px-[45px]">
        <div className="flex items-center">
          <Filter />
          <h1 className="text-sm ml-3">{items.length} Log items</h1>
        </div>

        <p className="cursor-pointer w-[fit] text-center ml-auto border-slate-800 border rounded-md hidden md:flex">
          <span
            className={`p-1 ${view ? "bg-slate-300 rounded-l-md" : " "}`}
            onClick={() => setView(true)}
          >
            <CiGrid41 className="to-black text-2xl rounded-l-md" />
          </span>
          <span
            className={`p-1 ${view ? "" : "bg-slate-300 rounded-r-md"}`}
            onClick={() => setView(false)}
          >
            <CiGrid2H className="to-black text-2xl" />
          </span>
        </p>
      </div>

      <div className="flex justify-center items-center w-[100vw] h-[100]">
        <div
          className={`px-8 w-[100vw] ${
            view ? "flex flex-wrap" : "grid grid-cols"
          }`}
        >
          <IoIosAdd
            className={`${
              view
                ? ""
                : "fixed bottom-3 z-50 right-3 h-[45px] w-[50px] bg-slate-400 text-slate-800 text-3xl p-1 shadow-lg"
            } text-[300px] text-slate-400 border-slate-800 h-[180px] w-[300px] mx-3 mt-3 cursor-pointer bg-slate-200 p-4 rounded-lg hover:shadow-lg duration-200`}
            onClick={openForm}
          />

          {itemsData.map((eachItem) => (
            <div
              key={eachItem.id}
              className={`bg-[#e6e1d3] m-3 p-5 ${
                view ? "h-[fit] w-[300px]" : ""
              } overflow-auto rounded-md relative group transform transition-all duration-300 ${
                view ? "hover:scale-105 hover:z-10" : ""
              }`}
            >
              <div
                className={`relative group p-4 rounded-lg ${
                  view ? "" : "flex items-center"
                }`}
              >
                <div className={`${view ? "" : "flex items-center w-[100vw]"}`}>
                  <h1
                    className={`flex items-center ${view ? "" : "w-[20%] mr-5 "}`}
                  >
                    {eachItem.gender === "male" ? (
                      <MdOutlinePerson className="mr-1" />
                    ) : (
                      <MdOutlinePerson2 className="mr-1" />
                    )}

                    {/* Hover effect for name */}
                    <span className="flex items-center">
                      {view && eachItem.name.length >= 20 ? (
                        <>
                          {capitalizeFirstLetter(eachItem.name.slice(0, 20))}
                          {"..."}
                          <IoIosInformationCircleOutline
                            className={`ml-1 ${view ? "" : "hidden"}`}
                            onMouseEnter={() =>
                              setHoveredInfo({
                                type: "name",
                                value: eachItem.name,
                              })
                            }
                            onMouseLeave={() => setHoveredInfo(null)}
                          />
                        </>
                      ) : (
                        capitalizeFirstLetter(eachItem.name)
                      )}
                    </span>

                    {/* Tooltip for name */}
                    {hoveredInfo?.type === "name" &&
                      hoveredInfo?.value === eachItem.name && (
                        <div>
                          <div className="absolute h-fit w-fit p-3 -top-2 right-5 bottom-[30px] bg-black text-white px-2 py-1 rounded-md text-sm z-30 text-nowrap tooltip-name">
                            {capitalizeFirstLetter(eachItem.name)}
                          </div>
                          <div class=" rotate-180 absolute top-[15px] right-[100px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-transparent border-l-transparent border-r-transparent border-b-[10px] border-b-black"></div>
                        </div>
                      )}
                  </h1>

                  {/* Hover effect for email */}
                  <div
                    className={`flex items-center ${
                      view ? "" : "w-[30%] hidden md:flex"
                    }`}
                  >
                    <MdOutlineMailOutline className="mr-1" />
                    <div>
                      {(() => {
                        const email = eachItem.email.split("@");
                        const firstPart =
                          view && email[0].length >= 10
                            ? email[0].slice(0, 8) + "..."
                            : email[0];
                        const secPart =
                          view && email[1].length > 9
                            ? email[1].slice(0, 7) + "..."
                            : email[1];

                        return (
                          <div className="flex items-center mr-5">
                            <span>{capitalizeFirstLetter(firstPart) + "@" + secPart}</span>

                            {/* Conditionally render the icon only if email is long enough */}
                            {email[0].length >= 10 && email[1].length > 9 && (
                              <IoIosInformationCircleOutline
                                className={`ml-1 ${view ? "" : "hidden"}`}
                                onMouseEnter={() =>
                                  setHoveredInfo({
                                    type: "email",
                                    value: eachItem.email,
                                  })
                                }
                                onMouseLeave={() => setHoveredInfo(null)}
                              />
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Tooltip for email with triangle pointing to the icon */}
                    {hoveredInfo?.type === "email" &&
                      hoveredInfo?.value === eachItem.email && (
                        <div>
                          <div className="absolute h-fit w-fit p-3 top-[12px] right-1 bottom-[5px] bg-black text-white px-2 py-1 rounded-md text-sm z-30 text-nowrap tooltip-email">
                            {capitalizeFirstLetter(eachItem.email)}
                          </div>
                          <div class=" rotate-180 absolute top-[35px] right-[100px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-transparent border-l-transparent border-r-transparent border-b-[10px] border-b-black"></div>
                        </div>
                      )}
                  </div>

                  <p
                    className={`flex items-center ${view ? "" : "w-[20%] ml-auto mr-5"}`}
                  >
                    <span>
                      {eachItem.gender === "male" ? (
                        <CgGenderMale className="mr-1" />
                      ) : (
                        <CgGenderFemale className="mr-1" />
                      )}{" "}
                    </span>
                    {capitalizeFirstLetter(eachItem.gender)}
                  </p>
                  <p
                    className={`flex items-center ${view ? "" : "w-[20%] mr-5"}`}
                  >
                    {eachItem.name === "inactive" ? (
                      <HiOutlineExclamationCircle className="mr-1" />
                    ) : (
                      <HiOutlineCheckCircle className="mr-1" />
                    )}{" "}
                    {capitalizeFirstLetter(eachItem.status)}
                  </p>
                </div>

                <div className="flex justify-end">
                  <RiDeleteBinLine
                    className="cursor-pointer absolute right-2 bottom-2 w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => onDelete(eachItem.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
