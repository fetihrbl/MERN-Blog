import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdateUserSuccess(null); // her değişiklikte success mesajını temizle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noChange =
      formData.username === currentUser.username &&
      formData.email === currentUser.email &&
      !formData.password;

    if (noChange) return;

    dispatch(updateStart());

    const submitData = { ...formData };
    if (!submitData.password) delete submitData.password;

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message || "Something went wrong."));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
    }
  };

  const handleDeleteUser = async (e) => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800"
        >
          {loading ? "Updating..." : "Update"}
        </Button>

        {currentUser.isAdmin && (
          <Button
            disabled={loading}
            as={Link}
            to="/create-post"
            type="button"
            className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white hover:bg-gradient-to-br focus:ring-pink-300 dark:focus:ring-pink-800 w-full"
          >
            {loading ? "Updating..." : "Create a post"}
          </Button>
        )}
      </form>

      <div className="mt-4 flex flex-col gap-2">
        {error && <Alert color="failure">{error}</Alert>}
        {updateUserSuccess && (
          <Alert color="success">{updateUserSuccess}</Alert>
        )}
      </div>

      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="alternative" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
