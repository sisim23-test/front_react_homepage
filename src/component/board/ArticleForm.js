import { useState } from "react";
import { Link } from "react-router-dom";

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFileName, setImageFileName] = useState('');

    const readURL = (e) => {
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onloadend = function(){
                document.getElementById("preview").setAttribute('src', reader.result);
            }

            reader.readAsDataURL(e.target.files[0]);
            setImageFileName(e.target.files[0]);
        }
    }

    const fn_addFile = ( ) => {

    }

    const handleWrite = ( ) => {

    }
    
    return (
        <div>
            <h1 style={{textAlign:"center"}}>글쓰기</h1>
            <table style={{border:"0", align:"center"}}>
                <tbody>
                    <tr>
                        <td style={{align:"right"}}>작성자: </td>
                        <td style={{colSpan:2, align:"left"}}><input type="text" style={{size:"20", maxLength:"100"}} value="홍길동" readOnly/></td>
                    </tr>
                    <tr>
                        <td style={{align:"right"}}>글제목: </td>
                        <td style={{colSpan:2, align:"left"}}><input type="text" style={{size:"67",  maxLength:"500", name:"title"}} /></td>
                    </tr>
                    <tr>
                        <td style={{align:"right"}}>글내용: </td>
                        <td style={{colSpan:2, align:"left"}}><textarea name="content" rows="10" colos="65" maxLength="4000" ></textarea></td>
                    </tr>
                    <tr>
                        <td style={{align:"right"}}>이미지파일 첨부: </td>
                        <td><input type="file" name="imageFileName" onChange={readURL} /></td>
                        <td><img id="preview" style={{width:"200px", height:"200px"}} alt="preview" /></td>
                        <td style={{align:"right"}}>이미지파일 첨부</td>
                        <td style={{align:"left"}}><input type="button" value="파일 추가" onClick={fn_addFile} /></td>
                    </tr>  

                    <tr>
                        <td colSpan="4"><div id="d_file"></div></td>
                    </tr>   

                    <tr>
                        <td style={{align:"right"}}></td>
                        <td colSpan="2">
                            <Link to="/" onClick={handleWrite} >글쓰기</Link>
                            <Link to="/" >목록보기</Link>
                        </td>
                    </tr>               
                </tbody>
            </table>
        </div>
    );
}

export default ArticleForm;