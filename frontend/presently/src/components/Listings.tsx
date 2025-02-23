"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Listings() {
    const searchParams = useSearchParams();
    const info = searchParams.get('info');
    const router = useRouter();

    const [formData, setFormData] = useState({});

    useEffect(()=>{
        if(info == null) {
            router.back();
        }
        setFormData(JSON.parse(info!))
    }, [])
    
    console.log(info)
    return <>RESULTS</>
}