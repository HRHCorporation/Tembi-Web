"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer } from 'lucide-react';

interface BookingDetail {
    id: string;
    roomId: string;
    roomSlug: string;
    roomName: string;
    roomPrice: number;
    basePrice: number;
    serviceFee: number;
    tourismTax: number;
    totalPrice: number;
    breakfast: number;
    extraBed: number;
    checkInDate: string;
    checkOutDate: string;
    duration: number;
    adults: number;
    children: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerCity: string;
    customerPostalCode: string;
    status: string;
    xenditInvoiceId: string | null;
    xenditInvoiceUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const ADDONS_PRICE = {
    breakfast: 50000,
    extrabed: 150000
};

export default function InvoiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<BookingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/admin/invoice/${params.id}`);
                const data = await res.json();

                if (data.success) {
                    setBooking(data.data);
                } else {
                    setError(data.message || 'Invoice not found');
                }
            } catch (err) {
                console.error('Error fetching invoice:', err);
                setError('Failed to load invoice');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tembi mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading invoice...</p>
                </div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Invoice not found'}</p>
                    <button
                        onClick={() => router.push('/admin/invoices')}
                        className="text-tembi hover:underline"
                    >
                        Back to Invoices
                    </button>
                </div>
            </div>
        );
    }

    const duration = booking.duration || 1;

    const getStatusStyle = (status: string) => {
        const styles = {
            PAID: 'bg-green-500 text-white',
            PENDING: 'bg-yellow-500 text-white',
            CANCELLED: 'bg-red-500 text-white',
            EXPIRED: 'bg-gray-500 text-white',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-500 text-white';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24 md:pt-28 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Back Button - HIDDEN IN PRINT */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:text-tembi mb-6 transition-colors no-print"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Invoices
                </button>

                {/* INVOICE CONTENT - THIS WILL BE PRINTED */}
                <div id="invoice-content" className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

                    {/* Header with Logo/Branding (Optional) */}
                    <div className="bg-gray-900 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                                Invoice ID
                            </p>
                            <h1 className="text-2xl md:text-3xl font-mono font-bold">
                                {booking.id}
                            </h1>
                            <p className="text-gray-400 text-xs mt-2">
                                Tembi Cultural House
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${getStatusStyle(booking.status)}`}>
                            {booking.status}
                        </div>
                    </div>

                    <div className="p-6 md:p-8">

                        {/* Customer & Stay Info Grid */}
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10 border-b border-gray-100 pb-8 md:pb-10 print-break">

                            {/* Customer Details */}
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                                    Customer Details
                                </h3>
                                <p className="text-xl font-bold text-gray-800 mb-1">
                                    {booking.customerName}
                                </p>
                                <p className="text-gray-600 mb-1 break-words">
                                    {booking.customerEmail}
                                </p>
                                <p className="text-gray-600 mb-3">
                                    {booking.customerPhone}
                                </p>

                                {booking.customerAddress && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                            Address
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {booking.customerAddress}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {booking.customerCity} {booking.customerPostalCode}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Stay Information */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                                    Stay Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <span className="text-gray-600 text-sm">Check-In</span>
                                        <span className="font-semibold text-right text-sm">
                                            {formatDate(booking.checkInDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-gray-600 text-sm">Check-Out</span>
                                        <span className="font-semibold text-right text-sm">
                                            {formatDate(booking.checkOutDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-gray-600 text-sm">Duration</span>
                                        <span className="font-semibold text-sm">
                                            {duration} Night{duration > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">Guests</span>
                                        <span className="font-semibold text-sm">
                                            {booking.adults} Adult{booking.adults > 1 ? 's' : ''}, {booking.children} Kid{booking.children !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="print-break">
                            <h3 className="text-gray-800 font-bold text-lg mb-4">
                                Payment Summary
                            </h3>

                            <div className="space-y-3 mb-6">

                                {/* Room Charge */}
                                <div className="flex justify-between items-start pb-3 border-b border-gray-50">
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800">
                                            {booking.roomName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatCurrency(booking.roomPrice)} × {duration} night{duration > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <span className="font-semibold text-gray-700 ml-4">
                                        {formatCurrency(booking.roomPrice * duration)}
                                    </span>
                                </div>

                                {/* Breakfast */}
                                {booking.breakfast > 0 && (
                                    <div className="flex justify-between items-start pb-3 border-b border-gray-50 bg-orange-50/50 p-3 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">
                                                🍳 Extra Breakfast
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {booking.breakfast} pax × {duration} night{duration > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <span className="font-semibold text-gray-700 ml-4">
                                            {formatCurrency(booking.breakfast * ADDONS_PRICE.breakfast * duration)}
                                        </span>
                                    </div>
                                )}

                                {/* Extra Bed */}
                                {booking.extraBed > 0 && (
                                    <div className="flex justify-between items-start pb-3 border-b border-gray-50 bg-green-50/50 p-3 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">
                                                🛏️ Extra Bed
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {booking.extraBed} bed × {duration} night{duration > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <span className="font-semibold text-gray-700 ml-4">
                                            {formatCurrency(booking.extraBed * ADDONS_PRICE.extrabed * duration)}
                                        </span>
                                    </div>
                                )}

                                {/* Fees */}
                                <div className="flex justify-between items-center text-sm text-gray-600 pt-2">
                                    <span>Service Fee (5%)</span>
                                    <span>{formatCurrency(booking.serviceFee)}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Tourism Tax</span>
                                    <span>{formatCurrency(booking.tourismTax)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center bg-gray-900 text-white p-5 md:p-6 rounded-xl mb-6">
                                <span className="font-bold text-base md:text-lg">
                                    TOTAL PAID
                                </span>
                                <span className="text-xl md:text-2xl font-bold font-mono">
                                    {formatCurrency(booking.totalPrice)}
                                </span>
                            </div>
                        </div>

                        {/* Booking Metadata */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 print-break">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                Booking Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Created At:</span>
                                    <span className="font-medium text-gray-800">
                                        {formatDateTime(booking.createdAt)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Updated:</span>
                                    <span className="font-medium text-gray-800">
                                        {formatDateTime(booking.updatedAt)}
                                    </span>
                                </div>
                                {booking.xenditInvoiceId && (
                                    
                                    <div className="flex justify-between md:col-span-2">
                                        <span className="text-gray-600">Xendit Invoice ID:</span>
                                        <span className="font-mono text-xs text-gray-800 break-all ml-2">
                                            {booking.xenditInvoiceId}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Link - HIDDEN IN PRINT */}
                        {booking.status === 'PENDING' && booking.xenditInvoiceUrl && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 no-print">
                                <p className="text-sm text-yellow-800 mb-2 font-semibold">
                                    ⏳ Payment Pending
                                </p>
                                <a href={booking.xenditInvoiceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline break-all">
                                    Open Payment Link →
                                </a>
                            </div>
                        )}

                        {/* Print Button - HIDDEN IN PRINT */}
                        <div className="text-center pt-4 border-t border-gray-100 no-print">
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium"
                            >
                                <Printer size={18} />
                                Print Invoice
                            </button>
                        </div>

                        {/* Footer - Only visible in print */}
                        <div className="hidden print:block text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-100">
                            <p>Tembi Cultural House - Authentic Indonesian Heritage Experience</p>
                            <p className="mt-1">Thank you for your booking!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}