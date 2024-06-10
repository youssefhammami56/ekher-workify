import { FaExclamationCircle } from "react-icons/fa";


interface FormErrorProps {
    message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
    if(!message) return null;
    return(
        <div className="bg-destructive/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ">
            <FaExclamationCircle className="h-4 w-4"/>
            <span>{message}</span>
        </div>
    )
}