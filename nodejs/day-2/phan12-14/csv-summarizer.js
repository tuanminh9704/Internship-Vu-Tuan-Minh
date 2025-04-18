import csv from 'csv-parser'
import fs from 'fs';
const filename = 'data.csv';


const handleFileCSV = async (filename) => {
    const records = [];
    const newRecord = [];
    const obj = {};
    await new Promise((resolve, reject) => {
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => {
                records.push(data);
            })
            .on('end', resolve)
            .on('error', reject);
    });
    records.forEach(element => {
        for (const key in element) {
            const num = Number(element[key]);
            if (!isNaN(num)) {
                newRecord.push(num);
            }
        }
    });

    const sum = newRecord.reduce((total, item) => total + item, 0);
    const avg = sum / newRecord.length;
    console.table([
        { Type: 'Tổng (Sum)', Value: sum },
        { Type: 'Trung bình (Avg)', Value: avg.toFixed(2) }
    ]);
}

Promise.all([handleFileCSV(filename)])

