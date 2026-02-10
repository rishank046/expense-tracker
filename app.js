import http from 'node:http';
import initDB from './db/initDB.js';
import getExpense from './controllers/getExpense.js';
import database from './db/database.js';
import 'dotenv/config';
import url from 'node:url';
import createUser from './controllers/createUser.js';
import { create } from 'node:domain';
import addExpense from './controllers/addExpense.js';

const server = http.createServer(async function(req , res){
    res.setHeader('Access-Control-Allow-Origin' , 'http://localhost:3000');
    const reqUrl = new URL(req.url , `http://${req.headers.host}`);

    try{
    if(req.method === 'OPTIONS'){
        res.writeHead(200 , {
            'Content-Type' : 'text/plain',
            'Timeout' : '10',
            'cache-control' : 'no-cache'
        })
        res.end('This data is not for user')
        return;
    }

    else if(req.method === 'POST' && reqUrl.pathname === '/signUp'){
        res.statusCode = 201;
        try{
            await createUser(reqUrl.searchParams.get('username') , reqUrl.searchParams.get('email') , reqUrl.searchParams.get('password'))
            res.end('User Created');
            return;
        } catch(error){
            res.end('Cannot able to create user');
            return;
        }
    }

    else if(req.method === 'GET' && reqUrl.pathname === '/getExpense'){
        try{
            const expenceData = await getExpense(reqUrl.searchParams.get('email') , reqUrl.searchParams.get('password'));
            if(expenceData.length === 0){
                res.statusCode = 404;
                res.end();
                return;
            }
            else{
                res.end(JSON.stringify(expenceData));
                return;
            }
        } catch (error){
            res.end(`Cannot get expense ${error}`);
            return;
        }
    }

    else if(req.method === 'POST' && reqUrl.pathname === '/addExpense'){
        const result = await addExpense(reqUrl.searchParams.get('userId') , reqUrl.searchParams.get('amnt') , reqUrl.searchParams.get('dscr'));
        if(result === 0){
            res.end('Added expense');
            return;
        }
        else{
            res.end('Failed to add expense');
            return;
        }
    }
    
    else if(req.method === 'GET' && reqUrl.pathname === '/getExpense'){
        const result = await getExpense(reqUrl.searchParams.get('email') , reqUrl.searchParams.get('password'));
        if(result === 1){
            res.end('cannot fetch data');
            return;
        }
        else{
            res.end(result);
            return;
        }
    }

    else{
        res.end('invalid request');
        return;
    }

    }
    catch(err){
        res.statusCode = 500;
        res.end()
        return;
    }
})

initDB().then(() => {
    server.listen(3000 , async function(){
        console.log("Server is working and running")
    });
})
