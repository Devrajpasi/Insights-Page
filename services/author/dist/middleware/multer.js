import multer from 'multer';
const storage = multer.memoryStorage(); // memoryStorage kyunki hume file ko cloud pe upload karna hai directly (disk storage)
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
//# sourceMappingURL=multer.js.map