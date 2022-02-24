import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import './ViewArticle.css';

const ViewArticle = () => {
    //const baseUrl = "http://localhost:8090";

    let navigate = useNavigate();

    const [article, setArticle] = useState({});
    const { articleNO } = useParams();
    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);
    const [imageFileName, setImageFileName] = useState('');
    const [disabled, setDisabled] = useState(true);

    // console.log("articleNO" ,articleNO);

    useEffect(() => {
        async function call() {
            await axios
                .get(baseUrl + '/board/viewArticle', { params: { articleNO: articleNO } })
                .then((response) => {
                    setArticle(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        call();
    }, []);

    const readURL = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('preview').setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
            setImageFileName(event.target.files[0]);
        }
    }

    //수정하기
    const fn_enable = () => {
        setDisabled(false);
        document.getElementById("tr_btn_modify").style.display = "block";
        if (document.getElementById("tr_file_upload") != null)
            document.getElementById("tr_file_upload").style.display = "block";
        document.getElementById("tr_btn").style.display = "none";

    }

    //수정반영하기
    const fn_modify_article = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("imageFileName", imageFileName);
        formData.append("name", sessionStorage.getItem("name"));
        formData.append("id", sessionStorage.getItem("userId"));
        formData.append("articleNO", articleNO);

        await axios
            .put(baseUrl + `/board/modArticle`, formData,
                { headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" } })
            .then((response) => {
                alert(response.data.message);
                navigate(response.data.path);
            })
            .catch((error) => {
                console.log(error);
            })

        document.getElementById("tr_btn_modify").style.display = "none";
        document.getElementById("tr_btn").style.display = "block";
    }

    //삭제하기
    const fn_remove_article = async () => {
        await axios
            .delete(`${baseUrl}/board/removeArticle?articleNO=${articleNO}`)
            .then((response) => {
                alert(response.data.message);
                navigate(response.data.path);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //리스트로 이동
    const backToList = () => {
        navigate('/board/list');
    }

    //답변쓰기
    const fn_reply_form = async () => {
        navigate(`/board/replyForm/${articleNO}`);

    }



    return (
        <div>
            <table style={{ border: "0", align: "center" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }}>
                            글번호
                        </td>
                        <td >
                            <input type="text" value={article.articleNO} disabled />
                            <input type="hidden" name="articleNO" value={article.articleNO} />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }} >
                            작성자 아이디
                        </td>
                        <td >
                            <input type="text" value={article.id} name="writer" disabled />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }}>
                            제목
                        </td>
                        <td>
                            <input type="text" defaultValue={article.title} name="title" id="i_title" disabled={disabled} onChange={(e) => { setTitle(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }} >
                            내용
                        </td>
                        <td>
                            <textarea rows="20" cols="60" name="content" id="i_content" defaultValue={article.content} disabled={disabled} onChange={(e) => { setContent(e.target.value) }} />
                        </td>
                    </tr>

                    {console.log("dd:" + (article.imageFileName !== undefined && article.imageFileName !== null))}
                    {article.imageFileName !== undefined || article.imageFileName !== null ?
                        <>
                            <tr>
                                <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }} rowSpan="2">
                                    이미지
                                </td>
                                <td >
                                    <input type="hidden" name="originalFileName" value="${article.imageFileName }" />
                                    <img src={`${baseUrl}/download?articleNO=${article.articleNO}&imageFileName=${article.imageFileName}`} alt="preview" />
                                </td>
                            </tr>

                            <tr>

                                <td>
                                    <input type="file" name="imageFileName " id="i_imageFileName" disabled={disabled} onChange={readURL} />
                                </td>
                            </tr>
                        </>
                        :
                        <>
                            <tr id="tr_file_upload" >
                                <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }} >
                                    이미지
                                </td>
                                <td>
                                    <input type="hidden" name="originalFileName" value={article.imageFileName} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img id="preview" alt="preview" />
                                    <input type="file" name="imageFileName " id="i_imageFileName" disabled={disabled} onChange={readURL} />
                                </td>
                            </tr>
                        </>
                    }

                    <tr id="tr_preview">
                        <td style={{ width: "150px", align: "center" }} colSpan="2"></td>
                        <td >
                            <img id="preview" alt="preview" />
                            {/* <input type="file" name="imageFileName " id="i_imageFileName" disabled={disabled} onChange={readURL} /> */}
                        </td>
                    </tr>

                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }}>
                            등록일자
                        </td>
                        <td >
                            <input type="text" value={article.writeDate} disabled />
                        </td>
                    </tr>

                    <tr id="tr_btn_modify" style={{ width: "150px", backgroundColor: "red" }} >
                        <td></td>
                        <td colSpan="2" style={{ align: "center" }}>
                            <input type="button" value="수정반영하기" onClick={fn_modify_article} />
                            <input type="button" value="취소" onClick={backToList} />
                        </td>
                    </tr>

                    <tr id="tr_btn" >
                        <td colSpan="2" style={{ align: "center" }}>
                            {sessionStorage.userId === article.id ?
                                <>
                                    <input type="button" value="수정하기" onClick={fn_enable} />
                                    <input type="button" value="삭제하기" onClick={fn_remove_article} />
                                </>
                                : null}

                            <input type="button" value="리스트로 돌아가기" onClick={backToList} />
                            <input type="button" value="답글쓰기" onClick={fn_reply_form} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default ViewArticle;