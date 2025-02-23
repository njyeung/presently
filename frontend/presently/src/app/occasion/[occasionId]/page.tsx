"use client"

import { Footer } from "@/components/Footer";
import Form from "@/components/Form"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function Occasion() {
    const router = useRouter();
        
    const { occasionId } = useParams();
    const occasionIdNumber =
    typeof occasionId === "string"
        ? parseInt(occasionId, 10) || 0
        : Array.isArray(occasionId)
        ? parseInt(occasionId[0], 10) || 0
        : 0;
    
    useEffect(()=>{
        if(occasionIdNumber > 4 || occasionIdNumber <= 0) {
            router.back();
        }
    }, [])

    function onSubmit(formData: any) {
        router.push(`/occasion/${occasionIdNumber}/results?info=${JSON.stringify(formData)}`);
    }

    return <section>
        <Form submit={(e:any)=>{onSubmit(e)}} occasionId={occasionIdNumber} />
        <Footer />
    </section>
}