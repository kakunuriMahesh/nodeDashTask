import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import CardList from "../CardList/CardList";
import { usersContext } from "../../Context/usersContext";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

const BackDashBoard = () => {
  const {
    filteredItems,
    filterItems,
    manualFilter,
    form,
    info,
    formControl,
    addItems,
    deleteItem,
  } = useContext(usersContext);

  const [details, setDetails] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();
    addItems(details);
    setDetails({ name: "", email: "", gender: "", status: "" });
    formControl(false);
    // }
  };

  const filterData = (e) => {
    const filterInput = e.target.value.toLowerCase();
    filterItems(filterInput);
  };

  const handleDeleteItem = (id) => {
    console.log(id);
    deleteItem(id);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="text-center  w-full p-8">
        <h1 className="text-5xl">Log Details here :)</h1>
        <div className="flex items-center justify-center mt-9">
          <div className="relative flex items-center">
            <input
              type="text"
              onChange={filterData}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none"
            />
            <FaSearch className="absolute left-3 text-gray-500" />
          </div>
        </div>
      </div>

      {form && (
        <div
          className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={() => formControl(form)}
        >
          <div
            className="bg-amber-100 p-8 rounded-md w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="ml-3 text-md mb-4 flex justify-between">
              Fill the Requested Details to Log:
              <span>
                <RxCross2
                  className=" text-black p-1 text-2xl cursor-pointer"
                  onClick={() => formControl(false)}
                />
              </span>
            </h1>
            <form onSubmit={submitData} className="flex flex-col z-50">
              <input
                className="m-3 p-3 rounded-md"
                type="text"
                name="name"
                onChange={handleChange}
                value={details.name}
                placeholder="Name"
                required
              />
              <input
                className="m-3 p-3 rounded-md"
                type="email"
                name="email"
                onChange={handleChange}
                value={details.email}
                placeholder="Email"
                required
              />
              <select
                className="m-3 p-3 rounded-md"
                onChange={handleChange}
                name="gender"
                required
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="male" selected={details.gender === "male"}>
                  male
                </option>
                <option value="female" selected={details.gender === "female"}>
                  female
                </option>
              </select>

              <select
                className="m-3 p-3 rounded-md"
                onChange={handleChange}
                name="status"
                required
              >
                <option value="" disabled selected>
                  Status
                </option>
                <option value="active" selected={details.status === "active"}>
                  active
                </option>
                <option
                  value="inactive"
                  selected={details.status === "inactive"}
                >
                  inactive
                </option>
              </select>
              <button
                className="bg-yellow-500 mx-3 rounded-md py-2 text-lg text-white hover:bg-orange-400 duration-300 mt-4"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
      {filteredItems.length !== 0 ? (
        <CardList
          manualItems={manualFilter}
          items={filteredItems}
          onDelete={handleDeleteItem}
          openForm={formControl}
        />
      ) : (
        <div className="h-[80vh] flex items-center justify-center">
          <p>{info!==""?info:"Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default BackDashBoard;
