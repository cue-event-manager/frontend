import { useEffect, useState } from "react";


export default function useNavbarHeight() {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const nav = document.querySelector("header.MuiAppBar-root");
        if (nav) setHeight(nav.clientHeight);
    }, []);
    return height;
}
