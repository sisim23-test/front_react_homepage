import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const ReplyForm = () => {
    const navigate = useNavigate();

    const { articleNO } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFileName, setImageFileName] = useState('');

    const fn_reply_form = async () => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("imageFileName", imageFileName);
        formData.append("name", sessionStorage.getItem("name"));
        formData.append("id", sessionStorage.getItem("userId"));
        formData.append("parentNO", articleNO);

        await axios
            .post(baseUrl + "/board/addReply", formData,
                { headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" } })
            .then((response) => {
                alert(response.data.message);
                navigate(response.data.path);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const readURL = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('preview').setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    //리스트로 이동
    const backToList = () => {
        navigate('/board/list');
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td align="right"> 작성자:&nbsp; </td>
                        <td><input type="text" size="20" maxLength="100" name="writer" value={sessionStorage.name} readOnly /> </td>
                    </tr>
                    <tr>
                        <td align="right">제목:&nbsp;  </td>
                        <td><input type="text" size="67" maxLength="500" name="title" onChange={(e) => { setTitle(e.target.value) }} /> </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">내용:&nbsp; </td>
                        <td><textarea name="content" rows="10" cols="65" maxLength="4000" onChange={(e) => { setContent(e.target.value) }} />  </td>
                    </tr>

                    <tr>
                        <td align="right">이미지파일 첨부:  </td>
                        <td> <input type="file" name="imageFileName" onChange={readURL} /></td>
                        <td><img id="preview" src="#" style={{ width: "200", height: "200" }} alt="preview" /></td>
                    </tr>
                    <tr>
                        <td align="right"> </td>
                        <td>
                            <input type="button" value="답글쓰기" onClick={fn_reply_form} />
                            <input type="button" value="취소" onClick={backToList} />

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ReplyForm;