"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 text-black px-6 py-4 flex gap-4 border border-black rounded-4xl m-2">
      <Link href="/" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">Home</Link>
      <Link href="/advance-crud" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">Advanced Users</Link>
    </nav>
  );
};

export default Navbar;
