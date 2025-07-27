/// <reference types="@workadventure/iframe-api-typings" />

// import * as fs from 'fs';
// import { parse } from 'csv-parse';

console.log('Script started successfully');

const noteTextArea = document.getElementById("tinyNote") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
// const resetButton = document.getElementById("resetButtton") as HTMLButtonElement;

const flatStrings: String[] = ["12"];

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    noteTextArea.value = ("") as string;
    saveButton.addEventListener("click", () => {
        // WA.state.noteText = noteTextArea.value;
        // if (WA.player.state.auth || WA.player.state.auth === "-1") {

        // fs.createReadStream('./strings.csv') // نام فایل CSV
        //     .pipe(parse({ delimiter: ',' })) // بدون cast
        //     .on('data', (row: string[]) => {
        //         flatStrings.push(...row); // ترکیب تمام رشته‌ها در یک آرایه
        //     })
        //     .on('end', () => {

        // console.log('All strings:', flatStrings);
        // console.log("          ", noteTextArea.value);

        if (flatStrings.includes(noteTextArea.value.toString())) {
            if (!WA.player.state.auth) {
                WA.player.state.saveVariable("auth", noteTextArea.value.toString(), {
                    public: false,
                    persist: true,
                    scope: "world",
                })
            } else {
                WA.player.state.auth = noteTextArea.value.toString();
            }

            // WA.player.tags.push("auth");
            // WA.player.tags.push(noteTextArea.value);
            console.log(' .-------. Player state', WA.player.state.loadVariable("auth"));
        } else {
            if (!WA.player.state.auth) {
                WA.player.state.saveVariable("auth", "-1", {
                    public: false,
                    persist: true,
                    scope: "world",
                })
            } else {
                WA.player.state.auth = "-1";
            }
        }

        // })
        // .on('error', (err: Error) => {
        //     console.error('Error reading CSV:', err);
        // });
        // }
    });

    // resetButton.addEventListener("click", () => {
    //     if (WA.player.state.auth) {
    //         WA.player.state.auth = "-1";
    //     } else {
    //         WA.player.state.saveVariable("auth", "-1", {
    //             public: false,
    //             persist: true,
    //             scope: "world",
    //         })
    //     }
    // });

}).catch(e => console.error(e));

export { };