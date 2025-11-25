import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { auth } from "@/firebase.config";
// import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  //   const pathname = usePathname();
  //   const [open, setOpen] = useState(false);
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const unsub = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //     });
  //     return () => unsub();
  //   }, []);

  //   const handleLogout = async () => {
  //     await signOut(auth);
  //   };

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar w-10/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Toggle */}
          <div className="dropdown">
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setOpen(!open)}
            >
              {/* Hamburger Icon */}
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
            {/* Mobile Menu */}
            {/* {open && ( */}
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 mt-3 p-2 shadow z-10">
              <li>
                <Link
                  href="/"
                  className={pathname === "/" ? "text-green-500" : ""}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={pathname === "/products" ? "text-green-500" : ""}
                  onClick={() => setOpen(false)}
                >
                  Products
                </Link>
              </li>
              {/* Show only when logged in */}
              {/* {user && ( */}
              <>
                <li>
                  <Link href="/add-product" onClick={() => setOpen(false)}>
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link href="/manage-products" onClick={() => setOpen(false)}>
                    Manage Products
                  </Link>
                </li>
              </>
              {/* )} */}
            </ul>
            {/* )} */}
          </div>

          {/* Logo */}
          <Link href="/" className="text-green-500 font-bold text-xl ml-2">
            ProductHub
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "text-green-500" : ""}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className={pathname === "/products" ? "text-green-500" : ""}
              >
                Products
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link href="/add-product">Add Product</Link>
                </li>
                <li>
                  <Link href="/manage-products">Manage Products</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Navbar End (Right Side Buttons + User Profile) */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <img src={user.photoURL} className="w-8 h-8 rounded-full" />
              </label>

              <ul className="dropdown-content menu p-3 bg-base-100 rounded-box w-52 shadow z-10">
                <li className="font-semibold">{user.displayName}</li>
                <li className="text-sm">{user.email}</li>
                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn bg-green-500 text-white">
                Login
              </Link>
              <Link href="/register" className="btn bg-blue-500 text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
