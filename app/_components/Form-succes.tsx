import { FaExclamationCircle } from "react-icons/fa";


interface FormSuccesProps {
    message: string | undefined;
}

export const FormSucces = ({ message }: FormSuccesProps) => {
    if(!message) return null;
    return(
        <div className="bg-emerald-500/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 ">
            <FaExclamationCircle className="h-4 w-4"/>
            <span>{message}</span>
        </div>
    )
}