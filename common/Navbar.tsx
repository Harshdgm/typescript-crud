"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/utils/i18n"; 
import { languages } from "@/constant/language";
import { useLabels } from "@/hooks/useLabels";

const Navbar = () => {
  useTranslation(); 
  const labels = useLabels();

  if (!Object.keys(labels).length) return null;

  return (
    <nav className="bg-gray-100 text-black px-6 py-4 flex gap-4 border border-black rounded-4xl m-2">
      <Link href="/" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">{labels.home}</Link>
      <Link href="/advance-crud" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">{labels.advanced_users}</Link>
      <Link href="/employee-crud" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">{labels.employee_users}</Link>
      <Link href="/time-zone" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">{labels.time_zone}</Link>
      <Link href="/map" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">{labels.map}</Link>
      <Link href="/map-data" className="hover:underline hover:decoration-black decoration-2 underline-offset-2 transition-all">{labels.map_data}</Link>

      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="ml-auto p-1 border rounded"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default Navbar;
