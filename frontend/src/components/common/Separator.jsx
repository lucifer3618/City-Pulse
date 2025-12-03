
function Separator ({ text = "OR", color="border-gray-400" }) {
    return (
        <div className="relative flex pt-1 items-center w-full">
            <div className={`flex-grow border-t border-${color}`}></div>
            <span className={`flex-shrink mx-4 text-${color}`}>{text}</span>
            <div className={`flex-grow border-t border-${color}`}></div>
        </div>
    );
}

export default Separator;
