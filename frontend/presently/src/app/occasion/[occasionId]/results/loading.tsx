import LoadingSpinner from "@/assets/loading.gif"
export default function Loading() {
    const loadingMessages = [
        "Please PresentLy wait!",
        "Our AI is crunching!",
        "PresentLy unwrapping some ideas!",
        "PresentLy in deep thought...",
        "PresentLy consulting the wise AI wizards",
        "Sprinkling a PresentLy high dose of magic...",
        "Digging deep for the most PresentLy of gifts",
        "We hope you will be PresentLy surprised..."
    ]
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    return <section>
        <div className="bg-gradient min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
                <img
                    src={LoadingSpinner.src}
                    alt="Loading"
                    className="w-24 h-24 animate-spin"
                />
                <p className="mt-6 text-lg text-white font-semibold animate-pulse">
                    {randomMessage}
                </p>
            </div>
        </div>
    </section>
}