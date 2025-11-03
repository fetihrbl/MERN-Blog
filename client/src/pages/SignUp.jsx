import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        // Sunucudan özel bir hata mesajı geldiyse onu göster
        setErrorMessage(data.message || "Something went wrong");
      } else {
        console.log("✅ Signup successful:", data);
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Fatih's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 text-gray-500 dark:text-gray-300">
            This is a demo project. Yoou can sign up with your email and
            password or with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Your username" />
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <Button
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" light={false} />{" "}
                  {/* light={false} dark modda görünür */}
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have a accaount?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
