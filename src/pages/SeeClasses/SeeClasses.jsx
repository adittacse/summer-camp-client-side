import React, { useEffect, useState } from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import axios from "axios";

const SeeClasses = () => {
    const { instructorId } = useParams();
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const data = useLoaderData();
    
    
    
    return (
        <div>
            <h2>{data.name}</h2>
            {/*<h2>Classes for Instructor</h2>*/}
            {/*{classes.length === 0 ? (*/}
            {/*    <p>No classes found for this instructor.</p>*/}
            {/*) : (*/}
            {/*    <ul>*/}
            {/*        {classes.map((classItem) => (*/}
            {/*            <li key={classItem._id}>*/}
            {/*                <Link to={`/class/${classItem._id}`}>{classItem.className}</Link>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*)}*/}
        </div>
    );
};

export default SeeClasses;
