/// <reference types="@workadventure/iframe-api-typings" />

import * as fs from 'fs';
import { parse } from 'csv-parse';

console.log('Script started successfully');

const noteTextArea = document.getElementById("tinyNote") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

const flatStrings: String[] = [];

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    noteTextArea.value = ("") as string;
    saveButton.addEventListener("click", () => {
        // WA.state.noteText = noteTextArea.value;
        if (!WA.player.tags.includes("auth")) {

            fs.createReadStream('./strings.csv') // نام فایل CSV
                .pipe(parse({ delimiter: ',' })) // بدون cast
                .on('data', (row: string[]) => {
                    flatStrings.push(...row); // ترکیب تمام رشته‌ها در یک آرایه
                })
                .on('end', () => {
                    console.log('All strings:', flatStrings);
                    if (flatStrings.includes(noteTextArea.value)) {
                        WA.player.tags.push("auth");
                        WA.player.tags.push(noteTextArea.value);
                    }
                })
                .on('error', (err: Error) => {
                    console.error('Error reading CSV:', err);
                });
        }
    });

}).catch(e => console.error(e));

export { };