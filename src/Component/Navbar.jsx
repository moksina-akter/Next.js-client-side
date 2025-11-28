"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase.init";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const routes = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    // { name: "Add Product", href: "/add-product" },
    // { name: "Manage Product", href: "/manage-products" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-green-600 font-bold text-2xl">
              ProductHub
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  className="hover:text-[#EE6983] transition"
                >
                  {route.name}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    href="/add-product"
                    className="hover:text-[#EE6983] transition"
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/manage-products"
                    className="hover:text-[#EE6983] transition"
                  >
                    Manage Products
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="User avatar"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-3"
                >
                  <li className="font-semibold">
                    {user.displayName || "User"}
                  </li>
                  <li className="text-sm">{user.email}</li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:bg-red-50 rounded w-full text-left px-2 py-1"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-sm bg-green-500 text-white hover:bg-[#EE6983] transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-md">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.href}
              className="block px-4 py-2 hover:bg-gray-50"
            >
              {route.name}
            </Link>
          ))}

          {user && (
            <>
              <Link
                href="/add-product"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Add Product
              </Link>
              <Link
                href="/manage-products"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Manage Products
              </Link>
            </>
          )}

          {!user && (
            <>
              <Link href="/login" className="block px-4 py-2 hover:bg-gray-50">
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
