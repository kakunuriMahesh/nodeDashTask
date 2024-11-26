import React, { useState, useEffect, useContext } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { usersContext } from "../../Context/usersContext";

const Filter = () => {

  const { appliedFilter , manualFilter} = useContext(usersContext);
  
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    status: "",
  });
  const [initialFilters, setInitialFilters] = useState(filters);
  const [newFilterInput, setNewFilterInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const applyFilter = () => {
    if (isOpen) {
      if (newFilterInput) {
        setIsOpen(!isOpen);
        setInitialFilters(filters);
        appliedFilter(filters);
      } else {
        toast.warning("Change the input to Apply Filter!");
      }
    } else {
      setIsOpen(true);
    }
  };

  // const clearFilter = () => {
  //   setFilters({ gender: "", status: "" });
  //   setInitialFilters({ gender: "", status: "" });
  //   appliedFilter({ gender: "", status: "" }); // Apply the cleared filter
  //   toast.info("Filters cleared");
  // };

  useEffect(() => {
    if (
      filters.gender !== initialFilters.gender ||
      filters.status !== initialFilters.status
    ) {
      setNewFilterInput(true);
    } else {
      setNewFilterInput(false);
    }
  }, [filters, initialFilters]);

  return (
    <div className="relative z-50">
      {console.log(manualFilter.length)}
      <button
        onClick={toggleDropdown}
        className={`cursor-pointer w-[80px] text-center flex justify-between items-center ml-auto border-slate-800 border px-2 rounded-md`}
      >
        <HiOutlineFilter className="mr-2" /> Filter
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="top-full mt-2 bg-white border border-gray-300 shadow-md rounded-md w-64 p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-gray-700"
              >
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-700"
              >
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end">
              {/* {newFilterInput ? ( */}
                <button
                  onClick={applyFilter}
                  className={`text-white py-2 px-4 rounded-md focus:outline-none ${
                    newFilterInput ? "bg-slate-900" : "bg-slate-300"
                  }`}
                >
                  Apply
                </button>
              {/* ) : (
                <button onClick={clearFilter}>clear filter</button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
