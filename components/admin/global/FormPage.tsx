"use client";

import { ReactNode } from "react";

interface FormPageProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function FormPage({ title, description, children }: FormPageProps) {
    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h1>
                {description && (
                    <p className="text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            {/* CARD */}
            <div className="rounded-lg border bg-white p-6
                dark:bg-gray-800 dark:border-gray-700">
                {children}
            </div>

        </div>
    );
}