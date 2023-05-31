"use client"
import React from 'react';
import { motion } from "framer-motion";
interface AlertProps {
    type: string;
    message: string;

}

const Alert = ({ type, message }: AlertProps) => {
    // React.useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         onclose();
    //     }, 5000);
    //     return () => clearTimeout(timeout);
    // }, [onclose]);

    let bgColor;
    let borderColor;
    let textColor;

    switch (type) {
        case 'success':
            bgColor = 'bg-green-100';
            borderColor = 'border-green-500';
            textColor = 'text-green-700';
            break;
        case 'warning':
            bgColor = 'bg-yellow-100';
            borderColor = 'border-yellow-500';
            textColor = 'text-yellow-700';
            break;
        case 'error':
            bgColor = 'bg-red-100';
            borderColor = 'border-red-500';
            textColor = 'text-red-700';
            break;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-md ${borderColor} ${bgColor} ${textColor}`}
            role="alert"
        >
            {message}
        </motion.div>
    );
};

export default Alert;
