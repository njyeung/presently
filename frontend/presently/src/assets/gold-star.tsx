export default function GoldStar( {handleClick, isGold} : any) {
    return <button>
        <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isGold ? "#f0cb07" : "#787878"}
        className="w-8 h-8"
        >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.783 1.402 8.168L12 18.897l-7.336 3.864 1.402-8.168L.132 9.21l8.2-1.192z" />
        </svg>
    </button>
    
}