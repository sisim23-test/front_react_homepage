import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";


const ViewArticle = () => {
    //const baseUrl = "http://localhost:8090";

    let navigate = useNavigate();

    const [article, setArticle] = useState({});
    const { articleNO } = useParams();

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
        }
    }

    const fn_enable = () => {

    }

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

    const backToList = () => {
        navigate('/board/list');
    }

    const fn_reply_form = () => {

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
                            <input type="text" value={article.title} name="title" id="i_title" disabled />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }}>
                            내용
                        </td>
                        <td>
                            <textarea rows="20" cols="60" name="content" id="i_content" value={article.content} disabled />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933", rowSpan: "2" }}>
                            이미지
                        </td>

                        <td>
                            {
                                article.imageFileName !== null ?
                                    <>
                                        <input type="hidden" name="originalFileName" value={article.imageFileName} />
                                        <img src={`${baseUrl}/download?articleNO=${article.articleNO}&imageFileName=${article.imageFileName}`} id="preview" alt="preview" />
                                    </>
                                    :
                                    <p>이미지가 없습니다.</p>
                            }
                        </td>
                    </tr>

                    <tr>
                        <td style={{ width: "150px", align: "center", backgroundColor: "#FF9933" }}>
                            등록일자
                        </td>
                        <td>
                            <input type="text" value={article.writeDate} disabled />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" align="center">
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
        </div>
    )

}


export default ViewArticle;