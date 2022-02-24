import './BoardList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';

//useEffect(callback, dependency array[])
//useEffect(callback)
//useEffect(callback,[]) 최초 렌더링할때만
//useEffect(callback,[boardList]) 최초 렌더링, boardList 상태가 업데이트

const BoardList = () => {
    //const baseUrl = "http://localhost:8090";

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        async function call() {
            await axios
                .get(baseUrl + '/board/listArticles')
                .then((response) => {
                    console.log(response.data);
                    setBoardList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        call();
    }, []);

    let result = [];
    return (
        <div>
            <table style={{ align: "center", border: "1", width: "80%" }}>
                <thead>
                    <tr style={{ height: "20px", align: "center", backgroundColor: "lightgreen" }}>
                        <th>글번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>

                <tbody>
                    {boardList.length === 0 ?
                        <tr>
                            <td colSpan="4">
                                <p style={{ align: "center" }}>
                                    <b><span style={{ fontSize: "9pt" }}>등록된 글이 없습니다</span></b>
                                </p></td>
                        </tr>
                        :
                        boardList.map((article, key) => {
                            return (
                                <tr style={{ align: "center" }} key={key}>
                                    <td style={{ width: "5%" }}>{article.articleNO}</td>
                                    <td style={{ width: "10%" }}> {article.id} </td>
                                    <td style={{ textAlign: "left", width: "35%" }}>
                                        {/* https://myhappyman.tistory.com/60 
						https://codingbroker.tistory.com/123
						   https://velog.io/@hidaehyunlee/React-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-2-JSX%EC%97%90%EC%84%9C-%EC%A1%B0%EA%B1%B4%EB%AC%B8-%EC%82%AC%EC%9A%A9%ED%95%B4-%EB%A0%8C%EB%8D%94%EB%A7%81%ED%95%98%EA%B8%B0*/}
                                        {(() => {
                                            result = []
                                            if (article.level > 1) {
                                                for (let i = 0; i < article.level; i++) {
                                                    result.push(<span key={i} style={{ paddingLeft: "10px" }}></span>)
                                                }

                                                result.push(<span style={{ fontSize: "12px" }}>[답변]</span>);
                                            }

                                            result.push(<Link to={`/board/viewArticle/${article.articleNO}`}>{article.title}</Link>);
                                            return (result);
                                        }
                                        )()
                                        }
                                    </td>
                                    <td style={{ width: "10%" }}>{article.writeDate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link className="cls1" to="/board/articleForm"><p className="cls2">글쓰기</p></Link>
        </div>
    )
}


export default BoardList;