import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
          <p className="text-sm mt-5">
            This is a demo project. Yoou can sign up with your email and
            password or with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 ">
            <div>
              <Label htmlFor="username" value="Your username" />
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>

            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput id="email" type="email" placeholder="Email"/>
            </div>

            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800" type="submit">
               Sign in
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have a accaount?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
