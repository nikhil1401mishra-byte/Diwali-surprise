import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Diwali Wishes Dashboard | Nikhil Admin",
  description: "Private administrative dashboard for Nikhil to manage Diwali wishes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}

