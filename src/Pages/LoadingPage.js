import React from 'react';

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center text-5xl">
                <div className="spinner rotate">
                    <div className="bounce-1"></div>
                    <div className="bounce-2"></div>
                    <div className="bounce-3"></div>
                </div>
                <p className="text-gray-500">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
