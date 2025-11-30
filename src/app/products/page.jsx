"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://next-js-server-side.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // Safe filtering
  const filteredProducts = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-12 w-10/12 mx-auto">
      {/* Page Title + Description */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-green-500 mb-2">All Products</h2>
        <p className="text-gray-600">
          Browse our latest collection of products. Use the search bar to find
          exactly what you need.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="border border-green-600 hover:scale-105 transition transform rounded-lg p-4 shadow hover:shadow-lg space-y-3"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="h-[250px] w-full object-cover rounded"
            />
            <h3 className="font-bold text-green-500 text-lg mt-2">{p.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {p.shortDescription}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2">
              {p.fullDescription}
            </p>
            <p className="font-semibold mt-1">
              Price: <span className="text-red-500">${p.price}</span>
            </p>
            <Link
              href={`/products/${p.id}`}
              className="btn bg-green-500 text-white w-full mt-2"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
