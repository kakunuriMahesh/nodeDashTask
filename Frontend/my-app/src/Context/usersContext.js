import React, { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export const usersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [manualFilter, setManualFilter] = useState([]);
  const [form, setForm] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetch("https://nodedashtask-backend.onrender.com")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        setManualFilter(data);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
  }, []);

  const formControl = () => {
    setForm(!form);
  };

  // add
  const addItems = (newItem) => {
    console.log(newItem);

    fetch("https://nodedashtask-backend.onrender.com/adduser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer b6c0e957c5b2abcbde45bc63d0437652420486b559c6a5abdec17006cd9e7f84",
      },

      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.ok) {
          console.log("response ok");
          toast.success("Your Loged In ✅");
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((data) => {
        console.log([data]);
        const updatedItems = [{ ...data }, ...items];
        console.log(updatedItems);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
        setManualFilter(updatedItems);
      })
      .catch((error) => {
        console.log(error);
      });

    // .then((response)=>response.json())
    // .then((data))
  };

  // delete
  const deleteItem = (id) => {
    fetch(`https://nodedashtask-backend.onrender.com/deleteuser/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        return response.json();
      })
      .then(() => {
        const updatedItems = items.filter((eachItem) => eachItem.id !== id);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
        setManualFilter(updatedItems);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // view

  // filter
  const filterItems = (searchInput) => {
    const lowerCaseInput = searchInput.toLowerCase();
    const filtered = items.filter((eachItem) =>
      eachItem.name.toLowerCase().includes(lowerCaseInput)
    );
    
    if (filtered.length > 0) {
      setFilteredItems(filtered);
      setInfo("");  
    } else {
      setFilteredItems([]);  
      setInfo("User Not Found");
    }
  };
  

  const appliedFilter = (filters) => {
    const filtered = items.filter((item) => {
      const genderFilter =
        filters.gender && filters.gender !== "All"
          ? item.gender === filters.gender
          : true;

      const statusFilter =
        filters.status && filters.status !== "All"
          ? item.status === filters.status
          : true;

      return genderFilter && statusFilter;
    });

    setManualFilter(filtered);
    setFilteredItems(filtered);
  };

  return (
    <usersContext.Provider
      value={{
        items,
        filteredItems,
        manualFilter,
        form,
        info,
        formControl,
        filterItems,
        appliedFilter,
        addItems,
        deleteItem,
      }}
    >
      {children}
    </usersContext.Provider>
  );
};
