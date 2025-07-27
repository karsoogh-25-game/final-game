/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

const noteTextArea = document.getElementById("tinyNote") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

const flatStrings: String[] = ["12"];

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    noteTextArea.value = ("") as string;
    saveButton.addEventListener("click", () => {

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
    });


}).catch(e => console.error(e));

export { };