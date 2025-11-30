"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/firebase.init";
import { onAuthStateChanged } from "firebase/auth";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsub();
  }, [router]);

  // Fetch product data
  useEffect(() => {
    if (user) {
      fetch(`https://next-js-server-side.vercel.app/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.log("Fetch error:", err));
    }
  }, [id, user]);

  if (!user) return null; // hide page until auth check completes
  if (!product)
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  return (
    <div className="w-10/12 mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Large Image / Banner */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-[360px] object-cover rounded shadow"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-700 mb-4">{product.shortDescription}</p>
          <p className="text-gray-700 mb-4">{product.fullDescription}</p>

          {/* Meta Info */}
          <div className="space-y-2 text-gray-800">
            <p>
              <span className="font-semibold">Price:</span>
              <span className="text-red-500">${product.price}</span>
            </p>
            <button
              className="btn bg-green-500 text-white mt-6"
              onClick={() => router.push("/")}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
