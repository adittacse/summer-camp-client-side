import React from 'react';

const SectionTitle = ({ heading }) => {
    return (
        <div className="text-center mx-auto md:w-4/12 my-8">
            <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;