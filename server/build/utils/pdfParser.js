"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTeklaPDF = parseTeklaPDF;
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
/**
 * Parses a Tekla-generated PDF and extracts job, mark, employee, hours, and station data.
 * @param filePath The absolute file path to the uploaded PDF.
 * @returns An array of structured job records.
 */
async function parseTeklaPDF(filePath) {
    const dataBuffer = fs_1.default.readFileSync(filePath);
    const parsed = await (0, pdf_parse_1.default)(dataBuffer);
    const lines = parsed.text.split('\n');
    const results = [];
    let job = '';
    let mark = '';
    for (let line of lines) {
        line = line.trim();
        // Extract job and mark numbers
        if (line.startsWith('Job #:')) {
            const jobMatch = line.match(/Job #:\s*(\d+)/);
            const markMatch = line.match(/Mark\s*:\s*(\S+)/);
            job = jobMatch ? jobMatch[1] : '';
            mark = markMatch ? markMatch[1] : '';
        }
        // Look for lines like: Python 1234 NAME 4/3/2024 3.25
        if (line.match(/(Python|Dragon|Master)/i) && line.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
            const stationMatch = line.match(/^(.*?)\s+\d+\s+/);
            const empMatch = line.match(/\s([a-zA-Z0-9]+)\d{1,2}\/\d{1,2}\/\d{4}/);
            const hoursMatch = line.match(/(\d+\.\d{2})$/);
            if (stationMatch && empMatch && hoursMatch) {
                results.push({
                    job,
                    mark,
                    station: stationMatch[1].trim(),
                    employee: empMatch[1],
                    hours: parseFloat(hoursMatch[1])
                });
            }
        }
    }
    // Clean up the uploaded file after parsing
    fs_1.default.unlinkSync(filePath);
    return results;
}
