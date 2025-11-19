import type { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

const useAppDispatch = () => {
    const appDispatch = useDispatch<AppDispatch>();
    return appDispatch
}
export default useAppDispatch;