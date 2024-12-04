"use client";

import React from "react";

export default function WorkFlowLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            {children}
        </div>
    );
}
