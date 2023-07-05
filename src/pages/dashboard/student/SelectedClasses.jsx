import { useEffect, useState } from "react";
import useRole from "../../../customHooks/useRole";
import useAxios from "../../../customHooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export let totalPrice;

const SelectedClasses = ({ enrolledPage }) => {
  const [instance] = useAxios();
  const { user, refetch } = useRole();
  const selectedClasses = user?.selectedClasses;
  const enrolledClasses = user?.enrolledClasses;
  const [classes, setClasses] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (enrolledPage) {
      instance
        .get(`/enrolled-classes`, {
          params: { enrolledClasses: enrolledClasses },
        })
        .then((result) => {
          setClasses(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      instance
        .get(`/selected-classes`, {
          params: { selectedClasses: selectedClasses },
        })
        .then((result) => {
          setClasses(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [instance, selectedClasses, enrolledPage, enrolledClasses, reload]);
console.log(classes)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .patch(`/selected-classes/${user.email}`, { id: id, deleteId: id })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              setReload(!reload);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const sum = classes.reduce((sum, items) => {
    return sum + parseFloat(items.price);
  }, 0);
  totalPrice = sum;

  return (
    <div>
      {classes && (
        <>
          {!enrolledPage && (
            <div className="flex justify-evenly items-center mt-5 mb-3">
              <h1 className="text-xl font-bold">
                Total selected Items : {classes.length}{" "}
              </h1>
              <h1 className="text-xl font-bold">Total Amount : $ {sum}</h1>
            </div>
          )}
          <div className="grid grid-cols-3 gap-5">
            {classes.map((oneClass) => {
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
                  <div className="p-6 pt-0 text-white flex justify-center items-center">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="text-red-600 select-none rounded-lg text-center align-middle text-lg font-bold uppercase text-blue-gray-900 "
                      type="button"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {!enrolledPage && (
            <div className="flex justify-center items-center my-10">
              <Link
                to="/dashboard/payment"
                className="text-white block bg-[#132160] w-[200px] select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
              >
                Payment
              </Link>
            </div>
          )}
        </>
      )}
      {classes == "undefined" && <h1> Loading...</h1>}
    </div>
  );
};

export default SelectedClasses;
