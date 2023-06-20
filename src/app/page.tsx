"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ConvertJson: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [convertedEnv, setConvertedEnv] = useState<string>("");

  const convertToEnv = (data: any) => {
    try {
      const jsonData = JSON.parse(data.jsonInput);
      const envData = Object.entries(jsonData)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");
      setConvertedEnv(envData);
    } catch (error) {
      console.error(error);
      alert("Invalid JSON");
    }
  };

  const handleReset = () => {
    reset();
    setConvertedEnv("");
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(convertToEnv)}>
        <div>
          <label
            htmlFor="jsonInput"
            className="block text-sm font-medium text-gray-700"
          >
            JSON Input
          </label>
          <textarea
            rows={14}
            id="jsonInput"
            {...register("jsonInput")}
            className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Convert
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reset
        </button>
      </form>
      <div className="mt-6">
        <label
          htmlFor="envOutput"
          className="block text-sm font-medium text-gray-700"
        >
          Environment Output
        </label>
        <textarea
          rows={14}
          id="envOutput"
          value={convertedEnv}
          readOnly
          className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-6">
        <a
          href="https://github.com/OoI3enZaoo/json-to-env"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Visit the GitHub Repository
        </a>
      </div>
    </div>
  );
};

export default ConvertJson;
