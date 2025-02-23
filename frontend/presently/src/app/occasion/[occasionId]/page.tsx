"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button"
import { twMerge } from "tailwind-merge";
import ArrowRight from "@/assets/arrow-right";

const occasions = ["Birthday", "Graduation", "Anniversary", "Christmas"];

export default function Occasion() {
    const { occasionId } = useParams();
    const occasionIdNumber =
    typeof occasionId === "string"
      ? parseInt(occasionId, 10) || 0
      : Array.isArray(occasionId)
      ? parseInt(occasionId[0], 10) || 0
      : 0;

    const [formData, setFormData] = useState({
        occasion: occasionIdNumber,
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
    
    

    return <section className="bg-gradient py-20">
        <div className="max-w-2xl mx-auto contain">
            <h1 className="text-3xl font-bold mb-6">Survey for {occasions[occasionIdNumber-1]}</h1>
            <form className="space-y-4">
            {/* Global Parameters */}
            <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                type="number"
                name="age"
                value={formData.params.age}
                onKeyPress={(e)=>{
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-gray-900"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Gender</label>
                <select
                name="gender"
                value={formData.params.gender}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-gray-900 h-10"
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
                className="w-full border rounded p-2 bg-gray-900"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Relationship</label>
                <select
                name="relationship"
                value={formData.params.relationship}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-gray-900 h-10"
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
                type="number"
                name="budget"
                value={formData.params.budget}
                onKeyPress={(e)=>{
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-gray-900"
                />
            </div>

            {/* Occasion-Specific Parameters */}
            {occasionId === '1' && (
                <div>
                <label className="block mb-1 font-medium">Personality/Style</label>
                <input
                    type="text"
                    name="personality"
                    value={formData.params.personality}
                    onChange={handleChange}
                    placeholder="e.g. minimalist, quirky, classic..."
                    className="w-full border rounded p-2 bg-gray-900"
                />
                </div>
            )}

            {occasionId === '2' && (
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
                    className="w-full border rounded p-2 bg-gray-900"
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
                    className="w-full border rounded p-2 bg-gray-900"
                    />
                </div>
                </>
            )}

            {occasionId === '3' && (
                <div>
                <label className="block mb-1 font-medium">
                    Love Language/Preferences:
                </label>
                <input
                    type="text"
                    name="traditions"
                    value={formData.params.traditions}
                    onChange={handleChange}
                    placeholder="e.g. holiday customs, family traditions..."
                    className="w-full border rounded p-2 bg-gray-900"
                />
                </div>
            )}

            {occasionId === '4' && (
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
                    className="w-full border rounded p-2 bg-gray-900"
                />
                </div>
            )}
            <div className="flex gap-2">
                <button
                    className={twMerge(buttonVariants({ variant: "ghost" }), "mt-4 p-5 text-lg")}
                    onClick={()=> {
                        setFormData({
                            occasion: occasionIdNumber,
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
        </div>
    </section>
    
}