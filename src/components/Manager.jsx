import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);
  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // If any such id exists in the db, delete it
      

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // Otherwise clear the form and show toast
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };
  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const editPassword = async (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id });
    await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id}),
      });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-lime-200">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-lime-100 opacity-50 blur-[80px]"></div>
      </div>

      <div className="container mx-auto max-w-4xl px-40 py-10">
        <h1 className="text-4xl">
          <div className="logo flex flex-col items-start font-bold text-white">
            <div>Safe</div>
            <div className="text-gray-700 rotate-180 font-thin">PASS</div>
          </div>
        </h1>
        <p className="text-gray-500">
          Welcome to SafePASS – your ultimate solution for secure and
          hassle-free password management.
        </p>
        <div className="text-gray-600 flex flex-col p-4 gap-8 my-10">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full bg-purple-100 border-2 border-gray-300 py-1 px-3"
            placeholder="Enter Website URL"
            type="text"
            name="site"
          />
          <div className="flex justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full bg-purple-100  border-2 border-gray-300 py-1 px-3"
              type="text"
              placeholder="Enter Username"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full bg-purple-100 border-2 border-gray-300 py-1 px-3"
                type="password"
                placeholder="Enter Password"
                name="password"
              />
              <span className="absolute right-2 top-2">
                <img
                  ref={ref}
                  className="cursor-pointer"
                  width={20}
                  src="icons/eye.png"
                  alt=""
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-400 py-2 rounded-full flex justify-center items-center gap-2 font"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff,secondary:#bff164"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="relative overflow-x-auto ">
          <h2 className="text-gray-500 py-2">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-hidden rounded-lg ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Site
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-3"
                      >
                        <a href="{item.site}">{item.site}</a>
                        <img
                          className="cursor-pointer"
                          width="20"
                          src="/icons/copy.svg"
                          alt=""
                          onClick={() => {
                            copyText(item.site);
                          }}
                        />
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {item.username}
                          <img
                            className="cursor-pointer"
                            width="20"
                            src="/icons/copy.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.username);
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {item.password}
                          <img
                            className="cursor-pointer"
                            width="20"
                            src="/icons/copy.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.password);
                            }}
                          />
                        </div>
                      </td>
                      <td className="cursor-pointer flex justify-center gap-4">
                        <img
                          src="icons/edit.svg"
                          alt=""
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        />
                        <img
                          src="icons/delete.svg"
                          alt=""
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
