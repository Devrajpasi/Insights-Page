import DataUriParser from "datauri/parser.js";
import parth from 'path';

const getBuffer=(file:any)=>{

    const parser=new DataUriParser();

    const extName=parth.extname(file.originalname).toString();

    return parser.format(extName,file.buffer);
}

export default getBuffer;



