import {Api} from "@/utils/axios";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  title: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  title?: string;
  message?: string;
  general?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
    setErrors({...errors, [name]: undefined}); // Clear specific error when typing
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    return newErrors;
  };

  const {mutate, isPending} = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await Api.post("/contact/add", data);
      return response.data;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        // Handle different types of errors
        if (error?.response?.data?.message) {
          setErrors({general: error.response.data.message});
        } else if (error?.response?.data?.errors) {
          // Handle validation errors from backend
          setErrors(error.response.data.errors);
        } else if (error?.message) {
          setErrors({general: error.message});
        } else {
          setErrors({
            general: "An unexpected error occurred. Please try again.",
          });
        }
      }
    },

    onSuccess: (data) => {
      toast.success(data.message || "Contact form submitted successfully!");
      setFormData({name: "", email: "", title: "", message: ""});
      setErrors({});
      // You might want to show a success message here
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any existing general errors
    setErrors((prev) => ({...prev, general: undefined}));

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      mutate(formData);
      // Don't clear form data here - let onSuccess handle it
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white py-6">
      {/* General error message */}
      {errors.general && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <div className="mb-4">
        <label className="mb-2 block font-medium text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium text-gray-700" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium text-gray-700" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter message title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block font-medium text-gray-700"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your message"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary py-5 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "SENDING..." : "SEND"}
      </button>
    </form>
  );
};

export default ContactForm;
