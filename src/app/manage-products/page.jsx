"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase.init";
import { onAuthStateChanged } from "firebase/auth";

export default function ManageProducts() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

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

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://next-js-server-side.vercel.app/products"
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(
        `https://next-js-server-side.vercel.app/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete");

      const data = await res.json();
      console.log(data.message);

      // Update local state
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.log("Delete error:", err);
      alert("Error deleting product");
    }
  };

  if (!user) return null;

  return (
    <div className="w-10/12 mx-auto py-12">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Manage Products
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm bg-blue-500 text-white"
                    onClick={() => router.push(`/products/${p.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 text-white"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
