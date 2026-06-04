"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreatePolicy } from "../_hooks/use-create-policies-room";
import { IconPicker } from "@/components/admin/global/IconPicker";

export default function CreatePolicyPage() {

    const {
        name_ind,
        name_eng,
        icon,
        type,
        loading,
        errors,
        setNameInd,
        setNameEng,
        setIcon,
        setType,
        handleSubmit,
    } = useCreatePolicy();


    const policyTypes = [
        {
            value: "CHECKIN_CHECKOUT",
            label: "Check-in & Check-out",
        },
        {
            value: "CANCELLATION_POLICY",
            label: "Cancellation Policy",
        },
    ];

    return (
        <FormPage
            title="Add Policies"
            description="Add new policies"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="grid grid-cols-2 gap-5">
                    {/* NAMA (INDONESIA) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Policy Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setNameInd(e.target.value)}
                            className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama fasilitas"
                        />
                        {errors.name_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                        )}
                    </div>

                    {/* NAMA (ENGLISH) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Nama (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setNameEng(e.target.value)}
                            className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter facility name"
                        />
                        {errors.name_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                        )}
                    </div>
                </div>


                {/* TIPE */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Tipe
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Choose Tipe --</option>

                        {policyTypes.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                    )}
                </div>

                {/* ICON */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Icon
                    </label>
                    <IconPicker
                        value={icon}
                        onChange={setIcon}
                        error={errors.icon}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}