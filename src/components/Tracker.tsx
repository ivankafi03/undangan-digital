"use client";

import { useEffect, useRef } from "react";
import { trackVisit } from "@/app/actions/admin";

export default function Tracker() {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (!hasTracked.current) {
            hasTracked.current = true;
            // Panggil server action tanpa menunggu
            trackVisit().catch(console.error);
        }
    }, []);

    return null;
}
