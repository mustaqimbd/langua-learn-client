import { useContext, useEffect, useState } from "react";
import useAxios from "../customHooks/useAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useRole from "../customHooks/useRole";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Classes = ({ children }) => {
  const [instance] = useAxios();
  const [totalClass, setTotalClass] = useState([]);
  const { user } = useContext(AuthContext);
  const { role, isLoading } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`/all-classes`, { params: { status: "Approved" } })
      .then((result) => {
        setTotalClass(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const redirectToLogin = () => {
    Swal.fire({
      title: "Please Login to select this class.",
      text: "You have to login first to select a class.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login", { replace: true });
      }
    });
  };
  const select = async (id) => {
    instance
      .patch(`/selected-classes/${user.email}`, { id: id })
      .then((result) => {
        if (result.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully selected this class.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold mt-5 mb-4">
            {children ? children : "Our classes"}
          </h1>
          <div className="grid grid-cols-3 gap-5">
            {totalClass.map((oneClass) => {
              const {
                _id,
                className,
                image,
                instructorName,
                price,
                availableSeats,
              } = oneClass;
              return (
                <div
                  key={_id}
                  className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                >
                  <div className="relative mx-4 mt-4 h-[248px] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img src={image} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="block text-xl font-bold text-blue-gray-900 antialiased">
                        {className}
                      </p>
                      <p className="block text-2xl font-bold leading-relaxed text-blue-gray-900 antialiased">
                        $ {price}
                      </p>
                    </div>
                    <p className=" font-bold">Instructor : {instructorName}</p>
                    <p>
                      {" "}
                      Available seats :{" "}
                      <span className="font-bold">{availableSeats}</span>
                    </p>
                  </div>
                  <div className="p-6 pt-0 text-white">
                    {user && role != "Admin" && role != "Instructor" && (
                      <button
                        onClick={() => select(_id)}
                        className="block bg-[#132160] w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                        type="button"
                      >
                        Select
                      </button>
                    )}
                    {!user && (
                      <button
                        onClick={redirectToLogin}
                        className="block bg-[#132160] w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                        type="button"
                      >
                        Select
                      </button>
                    )}
                    {(user && role == "Admin") ||
                      (role == "Instructor" && (
                        <button
                          disabled
                          className="block bg-[#132160] w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                          type="button"
                        >
                          Select
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;
