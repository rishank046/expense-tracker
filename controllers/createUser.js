import db from '../db/database.js';

const createUsr = async (userName , email , password) => {
    try{
        const [userRow] = await db.query(`SELECT * FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ?`  , [email])
    
        if(userRow.length === 0){
            await db.query(`INSERT INTO ${process.env.USER_TABLE_NAME} (usr_nm , usr_email , usr_pswd) VALUES (?, ?, ?)` , [userName , email , password]);
            return 0;
        }
        else{
            return 1;
        }
    }
    catch (error){
        console.log(`Failed to create user ${error}`);
    }
}

export default createUsr;
