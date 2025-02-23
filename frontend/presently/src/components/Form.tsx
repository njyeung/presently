"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button"
import { twMerge } from "tailwind-merge";
import ArrowRight from "@/assets/arrow-right";


const occasions = ["Birthday", "Graduation", "Anniversary", "Christmas"];

export default function Form(props: any) {
    const occasionId = props.occasionId
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({
        occasion: occasionId,
        params: {
            // Global fields
            age: '',
            gender: '',
            interests: '',
            relationship: '',
            budget: '',
            // Occasion-specific fields
            personality: '',      // Birthday
            fieldOfStudy: '',     // Graduation
            futurePlans: '',      // Graduation
            traditions: '',       // Christmas
            loveLanguage: ''
        }
    });

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            params: {
            ...formData.params,
            [e.target.name]: e.target.value,
          }
          
        });
    };
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(formData.params)
        const {
            age,
            gender,
            interests,
            relationship,
            budget,
            personality,
            fieldOfStudy,
            futurePlans,
            traditions,
            loveLanguage
          } = formData.params;
      
          // Validate global fields
          if (!age || !gender || !interests || !relationship || !budget) {
            setAlert(true);
            return;
          }
          console.log("SUBMIT")
          // Validate occasion-specific fields based on the occasionId
          // Birthday
          if (occasionId === "1" && !personality) {
            setAlert(true);
            return;
          }
          // Graduation
          if (occasionId === "2" && (!fieldOfStudy || !futurePlans)) {
            setAlert(true);
            return;
          }
          // Anniversary or Christmas (both use traditions in this example)
          if (occasionId === "3" && !loveLanguage) {
            setAlert(true);
            return;
          }
          if (occasionId === "3"  && !traditions) {
            setAlert(true);
            return;
          }
        console.log("SUBMIT")
        props.submit(formData);
    }

    return <>
        <section className="bg-gray-50 py-20 h-screen">
            <div className="max-w-2xl mx-auto contain">
            <h1 className="text-3xl font-bold mb-6">Find a PresentLy 
                <span className="bg-gradient text-transparent bg-clip-text"> {occasions[occasionId-1]} </span>
            gift</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Global Parameters */}
                <div>
                    <label className="block mb-1 font-medium">Age</label>
                    <input
                    name="age"
                    value={formData.params.age}
                    onKeyPress={(e)=>{
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Gender</label>
                    <select
                    name="gender"
                    value={formData.params.gender}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-200 h-10"
                    >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Interests</label>
                    <input
                    type="text"
                    name="interests"
                    value={formData.params.interests}
                    onChange={handleChange}
                    placeholder="e.g. music, sports, art..."
                    className="w-full border rounded p-2 bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Relationship</label>
                    <select
                    name="relationship"
                    value={formData.params.relationship}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-200 h-10"
                    >
                    <option value="">Select relationship</option>
                    <option value="friend">Friend</option>
                    <option value="family">Family</option>
                    <option value="partner">Partner</option>
                    <option value="colleague">Colleague</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Budget ($)</label>
                    <input
                    name="budget"
                    value={formData.params.budget}
                    onKeyPress={(e)=>{
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-200"
                    />
                </div>

                {/* Occasion-Specific Parameters */}
                {occasionId == 1 && (
                    <div>
                    <label className="block mb-1 font-medium">Personality/Style</label>
                    <input
                        type="text"
                        name="personality"
                        value={formData.params.personality}
                        onChange={handleChange}
                        placeholder="e.g. minimalist, quirky, classic..."
                        className="w-full border rounded p-2 bg-gray-200"
                    />
                    </div>
                )}

                {occasionId == 2 && (
                    <>
                        <div>
                            <label className="block mb-1 font-medium">
                            Field of Study / Career Aspirations
                            </label>
                            <input
                            type="text"
                            name="fieldOfStudy"
                            value={formData.params.fieldOfStudy}
                            onChange={handleChange}
                            placeholder="e.g. Engineering, Arts, Business..."
                            className="w-full border rounded p-2 bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Future Plans</label>
                            <input
                            type="text"
                            name="futurePlans"
                            value={formData.params.futurePlans}
                            onChange={handleChange}
                            placeholder="e.g. traveling, further studies, career shift..."
                            className="w-full border rounded p-2 bg-gray-200"
                            />
                        </div>
                    </>
                )}

                {occasionId == 3 && (
                    <div>
                    <label className="block mb-1 font-medium">
                        Love Language/Preferences:
                    </label>
                    <input
                        type="text"
                        name="traditions"
                        value={formData.params.loveLanguage}
                        onChange={handleChange}
                        placeholder="e.g. holiday customs, family traditions..."
                        className="w-full border rounded p-2 bg-gray-200"
                    />
                    </div>
                )}

                {occasionId == 4 && (
                    <div>
                    <label className="block mb-1 font-medium">
                        Cultural or Regional Traditions
                    </label>
                    <input
                        type="text"
                        name="traditions"
                        value={formData.params.traditions}
                        onChange={handleChange}
                        placeholder="e.g. holiday customs, family traditions..."
                        className="w-full border rounded p-2 bg-gray-200"
                    />
                    </div>
                )}
                <div className="flex gap-2">
                    <button
                        className={twMerge(buttonVariants({ variant: "ghost" }), "mt-4 p-5 text-lg")}
                        onClick={()=> {
                            setFormData({
                                occasion: occasionId,
                                params: {
                                    age: '',
                                    gender: '',
                                    interests: '',
                                    relationship: '',
                                    budget: '',
                                    // Occasion-specific fields
                                    personality: '',      // Birthday
                                    fieldOfStudy: '',     // Graduation
                                    futurePlans: '',      // Graduation
                                    traditions: '',       // Christmas
                                    loveLanguage: '',
                                }
                            })
                        }}
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        className={twMerge(buttonVariants({ variant: "default" }), "mt-4 p-5 text-lg")}
                    >
                        Submit
                        <ArrowRight></ArrowRight>
                    </button>
                </div>
            </form>
            { alert ? <>
                <div className="mt-5 w-full h-9 bg-red-600 flex text-white rounded-xl p-2 justify-center items-center">
                    <p>Please fill in all required fields.</p>
                </div>    
            </>
            : <></>}
        </div>
    </section>
    </>
    
}