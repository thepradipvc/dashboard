"use client";

import { setRouterInstance } from "@/lib/router-utils";
// To use nextjs router instance outside react components

import { useRouter } from 'nextjs-toploader/app';

export function RouterProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    setRouterInstance(router);

    return children;
}
