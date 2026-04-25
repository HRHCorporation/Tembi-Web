"use client";

import { XCircle, CheckCircle, Info } from 'lucide-react';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export default function CustomAlert({ isOpen, onClose, title, message, type = 'error' }: CustomAlertProps) {
  if (!isOpen) return null;

  // Konfigurasi warna berdasarkan tipe
  const styles = {
    error: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      btnBg: 'bg-red-600 hover:bg-red-700 shadow-red-600/20',
      Icon: XCircle
    },
    success: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      btnBg: 'bg-green-600 hover:bg-green-700 shadow-green-600/20',
      Icon: CheckCircle
    },
    info: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      btnBg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20',
      Icon: Info
    }
  };

  const currentStyle = styles[type];
  const Icon = currentStyle.Icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className={`p-8 text-center flex flex-col items-center ${currentStyle.bg}`}>
          <div className={`w-20 h-20 ${currentStyle.iconBg} rounded-full flex items-center justify-center mb-6 shadow-inner`}>
            <Icon className={`w-10 h-10 ${currentStyle.iconColor} stroke-[2.5]`} />
          </div>
          <h3 className={`text-2xl font-serif font-bold mb-3 ${currentStyle.titleColor}`}>
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed px-4">
            {message}
          </p>
        </div>

        {/* Footer Button */}
        <div className="p-6 bg-white border-t border-gray-100">
          <button
            onClick={onClose}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg ${currentStyle.btnBg}`}
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
