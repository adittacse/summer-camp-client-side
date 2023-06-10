import React from 'react';

const ErrorPage = () => {
    const errorImageURL = "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NDA0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
    
    return (
        <div className="flex justify-center items-center h-screen">
            <img className="max-w-full max-h-full mx-auto rounded-xl" src={errorImageURL} alt="404 image" />
        </div>
    );
};

export default ErrorPage;