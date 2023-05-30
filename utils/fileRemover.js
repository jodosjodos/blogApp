import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fileRemover=async(filename)=>[
fs.unlink(path.join(__dirname,"../uploads",filename),(err)=>{
 if(err && err.code=="ENOENT"){
//     file doesn't exist
console.log(`file ${filename} doesn't exist ,won't remove it`);
 }else if(err){
   console.log(`error occurred trying removing file ${filename}`);
 }else {
    console.log(`removed ${filename}`);
 }
})
]