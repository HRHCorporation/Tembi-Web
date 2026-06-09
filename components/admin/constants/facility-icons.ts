import {
    WifiHighIcon,
    BathtubIcon,
    BedIcon,
    TreeIcon,
    FlowerIcon,
    WavesIcon,
    LeafIcon,
    ClockIcon,
    WarningIcon,
    InfoIcon,
    CheckCircleIcon,
    IdentificationCardIcon,
    SpeakerHighIcon,
    PawPrintIcon,
    ArmchairIcon,
} from "@phosphor-icons/react";
import type { IconWeight } from "@phosphor-icons/react";

export type FacilityIcon = {
    value: string;
    label: string;
    icon: React.ElementType;
    color: string;
    weight: IconWeight;
};

export const FACILITY_ICONS: FacilityIcon[] = [
    { value: "WifiHighIcon",          label: "WiFi",          icon: WifiHighIcon,          color: "#3B82F6", weight: "fill" },
    { value: "LeafIcon",              label: "Daun",          icon: LeafIcon,              color: "#22C55E", weight: "fill" },
    { value: "BathtubIcon",           label: "Bathtub",       icon: BathtubIcon,           color: "#06B6D4", weight: "fill" },
    { value: "BedIcon",               label: "Tempat Tidur",  icon: BedIcon,               color: "#8B5CF6", weight: "fill" },
    { value: "TreeIcon",              label: "Pohon",         icon: TreeIcon,              color: "#16A34A", weight: "fill" },
    { value: "FlowerIcon",            label: "Bunga",         icon: FlowerIcon,            color: "#EC4899", weight: "fill" },
    { value: "WavesIcon",             label: "Kolam Renang",  icon: WavesIcon,             color: "#0EA5E9", weight: "fill" },
    { value: "ClockIcon",             label: "Jam",           icon: ClockIcon,             color: "#F59E0B", weight: "fill" },
    { value: "WarningIcon",           label: "Warning",       icon: WarningIcon,           color: "#EF4444", weight: "fill" },
    { value: "InfoIcon",              label: "Info",          icon: InfoIcon,              color: "#6366F1", weight: "fill" },
    { value: "CheckCircleIcon",       label: "Check",         icon: CheckCircleIcon,       color: "#10B981", weight: "fill" },
    { value: "IdentificationCardIcon",label: "ID Card",       icon: IdentificationCardIcon,color: "#64748B", weight: "fill" },
    { value: "SpeakerHighIcon",       label: "Sound",         icon: SpeakerHighIcon,       color: "#F97316", weight: "fill" },
    { value: "PawPrintIcon",          label: "Pet",           icon: PawPrintIcon,          color: "#A855F7", weight: "fill" },
    { value: "ArmchairIcon",          label: "Terrace",       icon: ArmchairIcon,          color: "#84CC16", weight: "fill" },
];