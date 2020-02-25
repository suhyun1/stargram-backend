import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random()* adjectives.length)
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

console.log(process.env.SENDGRID_USERNAME);

const sendMail = (email) =>{
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));

    return client.sendMail(email);

};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "s@stargram.com",
        to: address,
        subject: "🔐Login Secret for Stargram",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy and paste on the app/website.`
    }
    return sendMail(email);
};

//토큰 생성 함수
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
