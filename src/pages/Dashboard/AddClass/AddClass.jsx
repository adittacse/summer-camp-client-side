import React, {useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useForm} from "react-hook-form";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";

const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, formState: { errors } } = useForm();
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
    
    const handleAddClass = (event) => {
        event.preventDefault();
        const formData = new FormData();
        setIsSubmitting(true);  // disable Add SeeClasses button
        
        const form = event.target;
        const className = form.className.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const seats = form.seats.value;
        const price = form.price.value;
        const image = form.image.files[0];
        
        formData.append("className", className);
        formData.append("instructorName", instructorName);
        formData.append("instructorEmail", instructorEmail);
        formData.append("seats", seats);
        formData.append("price", price);
        formData.append("image", image);
        
        fetch(imageHostingURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const newItem = {
                        className,
                        instructorName,
                        instructorEmail,
                        seats,
                        price: parseFloat(price),
                        image: imgURL,
                        status: "Pending",
                        feedback: ""
                    };
                    axiosSecure.post("/class", newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                form.reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'SeeClasses has been added successfully!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch((error) => {})
                        .finally(() => {
                            setIsSubmitting(false); // re-enable Add SeeClasses button
                        });
                }
            })
    }
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Add A Class | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Add A Class"></SectionTitle>
            
            <div className="w-[90%] justify-center mx-auto my-8 p-6 rounded-xl bg-zinc-200">
                <form onSubmit={handleAddClass}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-black">SeeClasses Name*</span>
                        </label>
                        <input type="text" name="className" placeholder="SeeClasses Name" {...register("className", {required: true, maxLength: 120})} className="input input-bordered w-full" required />
                    </div>
                    <div className="flex">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-black">Instructor Name</span>
                            </label>
                            <input type="text" name="instructorName" defaultValue={user?.displayName} disabled {...register("instructorName", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-1/2 ml-6">
                            <label className="label">
                                <span className="label-text text-black">Instructor Email</span>
                            </label>
                            <input type="text" name="instructorEmail" defaultValue={user.email} disabled {...register("instructorEmail", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-black">Available Seats*</span>
                            </label>
                            <input type="text" name="seats" placeholder="Available Seats" {...register("seats", { required: true })} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-1/2 ml-6">
                            <label className="label">
                                <span className="label-text text-black">Price*</span>
                            </label>
                            <input type="text" name="price" placeholder="Price" {...register("price", { required: true })} className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">SeeClasses Image*</span>
                        </label>
                        <input type="file" name="image" {...register("image", { required: true })} className="file-input w-full max-w-xs" required />
                    </div>
                    
                    <div className="flex mx-auto justify-center items-center mt-6 mb-4">
                        <input disabled={isSubmitting} className="btn btn-primary" type="submit" value="Add Class" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;