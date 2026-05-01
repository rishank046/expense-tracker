import db from "../db/database.connect.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import {
  CHECK_USER_CREATED,
  GET_USER,
  ADD_LOGIN_TOKEN,
  CREATE_USER,
  GET_USER_TOKEN,
  INSERT_USER_PROFILE,
  DELETE_TOKEN,
} from "../model/database.queries.js";

export async function userLogIn(data) {
  const { email, password } = data;

  if (!email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const [user] = await db.query(GET_USER, [email]);
  // new code
  // user does not exists in database
  if (user.length === 0) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }
  // user exists in database
  else if (await bcrypt.compare(password, user[0].userPassword)) {
    // check token
    const [token] = await db.query(GET_USER_TOKEN, [user[0].userId]);
    //if token exists and not expired
    if (token[0] && token[0].hours_elapsed < 24) {
      return token[0].token;
    }
    // if token does not exists
    else if (!token[0]) {
      const newToken = crypto.randomBytes(10).toString("hex");
      await db.query(ADD_LOGIN_TOKEN, [newToken, user[0].userId]);
      return newToken;
    }
    //if the token is expired
    else {
      db.query(DELETE_TOKEN, [token[0].token]);
      const newToken = crypto.randomBytes(10).toString("hex");
      await db.query(ADD_LOGIN_TOKEN, [newToken, user[0].userId]);
      return newToken;
    }
  }
}

export async function userSignIn(data) {
  const { name, email } = data;
  let { password } = data;

  if (!name || !email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const [userRow] = await db.query(CHECK_USER_CREATED, [email]);

  let rounds = 10;
  password = await bcrypt.hash(password, rounds);

  if (userRow.length === 0) {
    await db.query(CREATE_USER, [name, email, password]);
  } else {
    let error = new Error();
    error.code = "User_Already_Exists";
    throw error;
  }
}

export async function setupProfile(data) {
  const { userId, salary, minimumExpense, expenseGoal } = data;
  if (!userId || !salary || !minimumExpense || !expenseGoal) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }
  db.query(INSERT_USER_PROFILE, [userId, salary, minimumExpense, expenseGoal]);
}
