"use client";

import { FileInput, Label } from "flowbite-react";

export function FileUpload({ onFileChange }) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(event); // Pass the event to the parent component
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-white border-opacity-5 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-white dark:text-white">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-white dark:text-white">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <FileInput id="dropzone-file" className="hidden" onChange={handleChange} />
      </Label>
    </div>
  );
} 