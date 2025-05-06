import { useState, useEffect } from "react";

export const FetchApiCustom = (url) => {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        fetch(url)
        .then(response => response.data.json())
        .then(result => setDatas(result.data));
    }, []);

    return [datas];
}