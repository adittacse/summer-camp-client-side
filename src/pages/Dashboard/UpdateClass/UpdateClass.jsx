import React, {useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import {useLoaderData} from "react-router-dom";
import {useForm} from "react-hook-form";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;

const UpdateClass = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, formState: { errors } } = useForm();
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
    
    const myClass = useLoaderData();
    const {className, seats, price, image} = myClass;
    
    const handleUpdateClass = (event) => {
        event.preventDefault();
        const formData = new FormData();
        setIsSubmitting(true);  // disable Add SeeClasses button
        
        const form = event.target;
        const className = form.className.value;
        const seats = form.seats.value;
        const price = form.price.value;
        const oldImage = form.oldImage.value;
        const newImage = form.image.files[0];
        let image = undefined;
        
        if (newImage === undefined) {
            image = oldImage;
        } else {
            image = newImage;
        }
        
        formData.append("className", className);
        formData.append("seats", seats);
        formData.append("price", price);
        formData.append("image", image);
        
        fetch(imageHostingURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(async imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const updatedItem = {
                        className,
                        seats,
                        price: parseFloat(price),
                        image: imgURL,
                    };
                    try {
                        await axiosSecure.patch(`/class/update-class/${myClass._id}`, updatedItem);
                        await Swal.fire(
                            'Congratulations!',
                            `${myClass.className} is Updated!`,
                            'success');
                    } catch (error) {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error.message}`,
                            footer: 'Something went wrong!',
                        });
                    }
                    setIsSubmitting(false); // re-enable Add SeeClasses button
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!',
                });
            })
    }
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Update SeeClasses | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Update SeeClasses"></SectionTitle>
            
            <div className="w-[90%] justify-center mx-auto my-8 p-6 rounded-xl bg-blue-950">
                <form onSubmit={handleUpdateClass}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">SeeClasses Name*</span>
                        </label>
                        <input type="text" defaultValue={className} name="className" placeholder="SeeClasses Name" {...register("className", {required: true, maxLength: 120})} className="input input-bordered w-full" required />
                    </div>
                    <div className="flex">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-white">Instructor Name</span>
                            </label>
                            <input type="text" name="instructorName" defaultValue={user?.displayName} disabled {...register("instructorName", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-1/2 ml-6">
                            <label className="label">
                                <span className="label-text text-white">Instructor Email</span>
                            </label>
                            <input type="text" name="instructorEmail" defaultValue={user.email} disabled {...register("instructorEmail", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-white">Available Seats*</span>
                            </label>
                            <input type="text" defaultValue={seats} name="seats" placeholder="Available Seats" {...register("seats", { required: true })} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-1/2 ml-6">
                            <label className="label">
                                <span className="label-text text-white">Price*</span>
                            </label>
                            <input type="text" defaultValue={price} name="price" placeholder="Price" {...register("price", { required: true })} className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-white">Image URL</span>
                            </label>
                            <input type="text" defaultValue={image} name="oldImage" {...register("oldImage")} className="input input-bordered w-full" required disabled />
                        </div>
                        <div className="form-control w-1/2 ml-6">
                            <label className="label">
                                <span className="label-text text-white">SeeClasses Image</span>
                            </label>
                            <input type="file" name="image" {...register("image")} className="file-input w-full max-w-xs" />
                        </div>
                    </div>
                    
                    <div className="flex mx-auto justify-center items-center mt-10 mb-4">
                        <input disabled={isSubmitting} className="btn btn-primary" type="submit" value="Update Class" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;