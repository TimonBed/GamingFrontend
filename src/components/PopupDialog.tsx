// components/PopupDialog.tsx
import React, { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PopupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    children: ReactNode;
}

const PopupDialog: React.FC<PopupDialogProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-brandgray-900 opacity-75"></div> {/* Updated background color to brandgray-900 */}
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-brandgray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> {/* Updated background color to brandgray-800 */}
                    <div className="absolute top-0 right-0 p-4">
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-brandgray-500 hover:text-brandgray-700 focus:outline-none">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {children}
                    
                </div>
            </div>
        </div>
    );
};

export default PopupDialog;
