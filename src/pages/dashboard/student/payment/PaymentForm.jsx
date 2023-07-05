import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useRole from "../../../../customHooks/useRole";
import useAxios from "../../../../customHooks/useAxios";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ clientSecret }) => {
  const { user, refetch } = useRole();
  const navigate = useNavigate();
  const [instance] = useAxios();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    console.log("handlesubmit");
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Create the payment method
    const { error: paymentMethodErr, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: card,
        billing_details: {
          name: user?.name || "anonymous",
          email: user?.email || "anonymous",
        },
      });

    if (paymentMethodErr) {
      setError(paymentMethodErr.message);
      return;
    }

    // Confirm the payment with Stripe
    const { error: paymentErr, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (paymentErr) {
      setError(paymentErr.message);
      return;
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      user.enrolledClasses = [...user.enrolledClasses, ...user.selectedClasses];
      user.selectedClasses.length = 0;
      instance
        .patch(`/enrolled-classes`, {
          user,
        })
        .then((result) => {
          if (result.data.modifiedCount > 0) {
            navigate("/dashboard/Enrolled/classes", { replace: true });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment has been successful",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(user);
  return (
    <div className="mx-10">
      {error && <p className="py-5 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="text-white block bg-[#132160] w-[100px] select-none rounded-lg  py-3 px-6 mt-5 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
