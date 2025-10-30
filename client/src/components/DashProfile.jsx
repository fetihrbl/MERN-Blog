import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  updateStart,
  updateSuccess,
  updateFailuer,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

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
        dispatch(updateFailuer(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailuer(err.message));
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
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800"
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>

      <div className="mt-4 flex flex-col gap-2">
        {error && <Alert color="failure">{error}</Alert>}
        {updateUserSuccess && <Alert color="success">{updateUserSuccess}</Alert>}
      </div>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
