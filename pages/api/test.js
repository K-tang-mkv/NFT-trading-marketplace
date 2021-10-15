import mongoose from 'mongoose';
import dbConnection from "../../module/connection";
// import {NFT} from '../../module/db';
// import dbSchema from '../../module/db';
dbConnection();
const NFT = require('../../module/db');
export default async (req, res) => {
    
    res.json({
        test: 'test'
    });
}