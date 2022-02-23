import { useEffect, useState } from 'react';
import './BoardList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

//useEffect(callback, dependency array[])
//useEffect(callback) : 모든 update, upmount 시 callback 무조건 수행
//useEffect(callback, []) : componet가 최초 렌더링 될때만 callback실행
//useEffect(callback, [boardList])  : component가 최초 렌더링될때, state(boardList)가 update될때 callback 실행

const BoardList = () => {
    const baseUrl = "http://localhost:8090";
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + '/board/listArticles')
            .then((response) => {
                console.log(response.data);
                setBoardList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            <table style={{ align: "center", border: "1", width: "80%" }}>
                <thead>
                    <tr style={{ height: "10", align: "center", backgroundColor: "lightgreen" }}>
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
                                    <b><span style={{ fontSize: "9pt" }}>
                                        등록된 글이 없습니다.
                                    </span></b>
                                </p>
                            </td>
                        </tr>
                        :
                        boardList.map((article, key) => {
                            return (
                                <tr style={{ align: "center" }} key={key}>
                                    <td style={{ width: "5%" }}> {article.articleNO} </td>
                                    <td style={{ width: "10%" }}> {article.id} </td>
                                    <td style={{ textAlign: "left", width: "35%" }}>
                                        {(() => {
                                            let result = [];
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
                                    <td style={{ width: "10%" }}> {article.writeDate} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/board/articleForm"><p>글쓰기</p></Link>
        </div>
    );
}

export default BoardList;
