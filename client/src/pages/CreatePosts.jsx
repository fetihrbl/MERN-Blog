import { TextInput, Select, FileInput, Button } from "flowbite-react";
import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function CreatePosts() {
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState("");

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            id="title"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select defaultValue="uncategorized" id="countries">
            <option value="" disabled hidden>
              Select a category
            </option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput id="file" accept="image/*" />
          <Button
            type="button"
            className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800"
            size="md"
          >
            Upload İmage
          </Button>
        </div>
        <div>
          <div ref={quillRef} style={{ height: "300px" }} />
        </div>
        <Button type="submit" className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800">
            Publish
        </Button>
      </form>
    </div>
  );
}
