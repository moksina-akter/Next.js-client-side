"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <div
      className="relative bg-green-100 flex items-center justify-center min-h-[70vh] px-6 text-center"
      style={{
        backgroundImage: "url('/products.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/70 p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#EE6983]">
          Welcome to ProductHub
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Explore the best products, manage your items, and grow your business
          online.
        </p>
        <Link
          href="/products"
          className="btn btn-primary btn-lg bg-green-500 text-white hover:bg-[#EE6983] transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
