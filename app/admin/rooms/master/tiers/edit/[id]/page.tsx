"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditTiersRoom } from "../../_hooks/use-edit-tiers-room";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";

export default function EditTierPage() {

    const params = useParams();
    const id = params.id as string;
    const { loading, fetchLoading, nameId, errors, setNameId, handleSubmit } = useEditTiersRoom(id);

    const router = useRouter();
    if (fetchLoading) return (
        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Loading...
        </div>
    );

    return (
        <FormPage
            title="Edit Tier Kamar"
            description="Update data tier kamar"
        >

            {/* FORM */}
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
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
                    />
                </div>
                {errors.name_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name_id}
                    </p>
                )}
                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>

        </FormPage>

    );
}


