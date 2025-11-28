"use client";
// import { FaLinkedin } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Add Product", href: "/add-product" },
    { name: "Manage Product", href: "/manage-product" },
  ];

  //   const social = [
  //     { name: "Facebook", href: "#", icon: <FaFacebook></FaFacebook> },
  //     { name: "Twitter", href: "#", icon: FaTwitter },
  //     { name: "LinkedIn", href: "#", icon: FaLinkedin },
  //   ];

  return (
    <footer className="bg-green-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo + description */}
        <div>
          <h1 className="text-2xl font-bold text-green-500 mb-2">ProductHub</h1>
          <p className="text-gray-700 text-sm">
            Your simple product management system. Add, manage and explore
            products with ease.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-green-500 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social */}
        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          {/* <div className="flex gap-4">
            {social.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 transition"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div> */}
          {/* <FaFacebook></FaFacebook> */}
          {/* <FaXTwitter></FaXTwitter> */}
          {/* <FaLinkedin></FaLinkedin> */}
        </div>
      </div>

      <div className="border-t border-gray-300 text-center py-4 text-gray-400 text-sm">
        © {year} ProductHub. All rights reserved.
      </div>
    </footer>
  );
}
