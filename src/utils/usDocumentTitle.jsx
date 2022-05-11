import { useEffect } from "react";

export function useDocumentTitle(title) {
    useEffect(()=>{
        document.title = `Chess TV | ${title}`
    },[title])
}
