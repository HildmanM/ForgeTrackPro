"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const pdfParser_1 = require("./utils/pdfParser");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.post('/api/upload/pdf', upload.single('file'), async (req, res) => {
    try {
        const result = await (0, pdfParser_1.parseTeklaPDF)(req.file.path);
        res.json(result);
    }
    catch (err) {
        console.error('PDF parse error:', err);
        res.status(500).json({ error: 'Failed to parse PDF' });
    }
});
app.get('/', (_req, res) => {
    res.send('ForgeTrack Backend Running');
});
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
