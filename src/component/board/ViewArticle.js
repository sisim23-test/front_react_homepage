import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewArticle = ( ) => {
    const baseUrl = "http://localhost:8090";

    let navigate = useNavigate();

    const [article, setArticle] = useState({});
    
    return (
        <div>
            view
        </div>
    );
}

export default ViewArticle;