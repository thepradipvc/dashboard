"use client";

import { setRouterInstance } from "@/lib/router-utils";
// To use nextjs router instance outside react components

import { useRouter } from "next/navigation";

export function RouterProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    setRouterInstance(router);

    return children;
}
