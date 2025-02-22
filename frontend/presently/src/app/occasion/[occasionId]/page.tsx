"use client";
import { useParams } from "next/navigation";

export default function Occasion() {
    const { occasionId } = useParams();
    return <p>{occasionId}</p>
}