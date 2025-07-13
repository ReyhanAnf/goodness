"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, HandHelping, Heart } from "lucide-react";

export default function MenuDoa() {
  const menuItems = [
    {
      title: "Doa Doa Harian",
      href: "/doa/doa-harian",
      icon: BookOpen,
      description: "Kumpulan doa sehari-hari"
    },
    {
      title: "Shalat",
      href: "/doa/shalat",
      icon: HandHelping,
      description: "Niat dan bacaan shalat"
    },
    {
      title: "Tahlil",
      href: "/doa/tahlil",
      icon: Heart,
      description: "Bacaan tahlil dan istighfar"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link key={item.href} href={item.href} className="group">
            <Card className="h-full bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="text-center space-y-4 p-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}