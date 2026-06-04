"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateMattress } from "../_hooks/use-create-mattress-room";

export default function CreateMattressPage() {

    const { name, loading, errors, setName, handleSubmit } = useCreateMattress();

    return (
        <FormPage
            title="Add Mattress"
            description="Add new mattress data"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {/* NAME */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Mattress Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the name of the mattress"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}