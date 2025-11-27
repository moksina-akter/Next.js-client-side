"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://product-hub-two.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)))
      .catch((err) => console.log("Fetch error:", err));
  }, []);
  return (
    <div>
      <section className="px-6 py-12 w-10/12 mx-auto">
        <h2 className="text-4xl text-center text-green-500 font-bold mb-6">
          Featured Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="border border-green-600 hover:scale-105 space-y-3 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-[250px] w-full object-cover rounded"
              />
              <h3 className="font-bold text-green-500 text-lg mt-2">
                {p.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {p.description}
              </p>
              <p className="font-semibold mt-1">
                Price: <span className="text-red-500">${p.price}</span>
              </p>
              <Link
                href={`/products/${p.id}`}
                className="btn text-white bg-green-500 mt-2 w-full"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
