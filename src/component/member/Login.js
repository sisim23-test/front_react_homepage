import React, { useState } from 'react';
import axios from 'axios';

const Login = ( ) => {
    const baseUrl = "http://localhost:8090";

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
        console.log(id);
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
        console.log(pwd);
    }

    function handleSubmit(e) {
        const handleSubmit = async() => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
            e.preventDefault();
            console.log(id);
            console.log(pwd);
            
            await axios
                .post(baseUrl+'/member/login', {id:id, pwd:pwd})
                .then((response)=>{
                    console.log(response.status);

                    if(response.data.success===true){
                        alert('로그인되었습니다.');
                        sessionStorage.setItem('name', response.data.name);
                        sessionStorage.setItem('success', response.data.success);
                        sessionStorage.setItem('userId', response.data.userId);
                        document.location.href='/';
                    }else {
                        console.log(response.data.success);
                        alert('회원이 아닙니다.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        handleSubmit();
        setId('');
        setPwd('');
    }

    return (
        <div>
            <p><input type="text" placeholder="아이디" onChange={handleId} value={id} /></p>
            <p><input type="text" placeholder="비밀번호" onChange={handlePwd} value={pwd} /></p>
            <p><button onClick={handleSubmit}>로그인</button></p>
        </div>
    );
};

export default Login;