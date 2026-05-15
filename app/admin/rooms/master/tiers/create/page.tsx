"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateTiersRoom } from "../_hooks/use-create-tiers-room";

export default function CreateTierPage() {

    const { nameId, loading, errors, setNameId, handleSubmit } = useCreateTiersRoom();

    return (
        <FormPage
            title="Tambah Tier Kamar"
            description="Tambahkan data tier kamar baru"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {/* NAME ID */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Tier
                    </label>
                    <input
                        type="text"
                        value={nameId}
                        onChange={(e) => setNameId(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama tier kamar"
                    />
                    {errors.name_id && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name_id}
                        </p>
                    )}
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}