"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase.init";
import { onAuthStateChanged } from "firebase/auth";

export default function AddProduct() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    date: "",
    priority: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);

  // Check authentication
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(currentUser);
      }
    });
    return () => unsub();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await fetch("https://product-hub-two.vercel.app/products", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });

    //   if (!res.ok) throw new Error("Failed to add product");

    //   setSuccess(true);
    //   setForm({
    //     title: "",
    //     shortDescription: "",
    //     fullDescription: "",
    //     price: "",
    //     date: "",
    //     priority: "",
    //     image: "",
    //   });

    //   setTimeout(() => setSuccess(false), 3000);
    //   console.error(err);
    //   alert("Error adding product!");
    // } catch (err) {
    //   console.error(err);
    //   setError(err.message);
    // }
    try {
      const res = await fetch("https://product-hub-two.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add product");

      setSuccess(true);
      setForm({
        title: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        date: "",
        priority: "",
        image: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="w-10/12 mx-auto">
      <div className=" w-8/12 mx-auto py-12">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Add Product</h1>

        {success && (
          <p className="mb-4 text-green-600 font-semibold">
            Product added successfully!
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 border border-green-600 p-6 rounded gap-4 max-w-2xl"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="input input-bordered w-full"
          />

          <textarea
            name="fullDescription"
            value={form.fullDescription}
            onChange={handleChange}
            placeholder="Full Description"
            required
            className="textarea textarea-bordered w-full"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="input input-bordered w-full"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn bg-green-600 text-white mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
