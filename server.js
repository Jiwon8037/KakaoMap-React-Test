const axios = require('axios')
const express = require('express')
const http=require('http')
const app = express();
const port = 8080
const server=http.createServer(app)
const fs = require('fs')
const dotenv = require('dotenv').config({ path: "./.env"});

const apiUrl= 'https://dapi.kakao.com/v2/local/search/keyword.json?query=';
const apiKey= process.env.REACT_APP_API_REST_KEY;
const apiHeader= {'Authorization':'KakaoAK '+ apiKey};
let kakaoData;
let serchKeyword='';

app.use(express.json());
app.use(express.static('./'));

app.get('/',(req,res)=>{
    fs.readFile('/index.html',(err,data)=>{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end();
    })
});

app.post('/test',(req,res)=>{
    serchKeyword=String(req.body.keyword);
    console.log(req.body.keyword)
    axios.get(apiUrl+encodeURI(serchKeyword), {headers:apiHeader},)
    .then((response)=>{
            kakaoData=response.data.documents;
            console.log(kakaoData[0]);
            const sendData={
                x:kakaoData[0].x,
                y:kakaoData[0].y,
                place_name:kakaoData[0].place_name,
            }
            res.json(sendData);
        }
    )
    .catch((error)=>{
        console.log(error)
    })
});

server.listen(port, ()=> {
    console.log(port+'포트로 서버 실행');
  });