"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const pdfParser_js_1 = require("./utils/pdfParser.js");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.post('/api/upload/pdf', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await (0, pdfParser_js_1.parseTeklaPDF)(file.path);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error('PDF parse error:', err);
        return res.status(500).json({ error: 'Failed to parse PDF' });
    }
});
app.get('/', (_req, res) => {
    res.status(200).send('ForgeTrack Backend Running');
});
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
