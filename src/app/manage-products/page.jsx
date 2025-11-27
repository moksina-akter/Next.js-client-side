// "use client";
// import axios from "axios";
// import Link from "next/link";
// import Navbar from "../components/Navbar";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ManageProducts() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [items, setItems] = useState([]);

//   if (!session) return router.push("/login");

//   useEffect(() => {
//     axios
//       .get(process.env.NEXT_PUBLIC_BACKEND + "/products")
//       .then((res) => setItems(res.data));
//   }, []);

//   const deleteItem = async (id) => {
//     await axios.delete(process.env.NEXT_PUBLIC_BACKEND + `/products/${id}`);
//     setItems(items.filter((i) => i.id !== id));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-10">
//         <h1 className="text-4xl font-bold mb-6">Manage Products</h1>

//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2">Title</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {items.map((item) => (
//               <tr key={item.id} className="border-t">
//                 <td className="p-2">{item.title}</td>
//                 <td className="p-2">${item.price}</td>
//                 <td className="p-2">
//                   <Link
//                     href={`/items/${item.id}`}
//                     className="bg-blue-600 px-3 py-1 text-white rounded mr-3"
//                   >
//                     View
//                   </Link>

//                   <button
//                     onClick={() => deleteItem(item.id)}
//                     className="bg-red-600 px-3 py-1 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
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
                    src={p.image}
                    alt={p.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td>{p.name}</td>
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
