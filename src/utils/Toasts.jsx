import { toast } from "react-toastify";

const errorToast = (message,theme)=> toast.error(message,{autoClose:2000,theme});
const successToast = (message,theme)=> toast.success(message,{autoClose:2000,theme});
const infoToast = (message,theme)=> toast.info(message,{autoClose:2000,theme});

export {errorToast,successToast,infoToast}