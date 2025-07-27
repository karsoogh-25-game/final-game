/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
// import { UIWebsite } from "@workadventure/iframe-api-typings";
import { CoWebsite } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let playerCanGoUpstairs: boolean = true;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    // console.log(' ............ Player tags: ', WA.player.tags);




    // Hackathon Left stairs
    WA.room.onEnterLayer('leftUpstairsZone').subscribe(() => {
        playerCanGoUpstairs = false
        WA.room.hideLayer("leftUpstairsAnim")
        WA.controls.restorePlayerControls()
    })
    WA.room.onEnterLayer('leftDownstairsZone').subscribe(() => {
        playerCanGoUpstairs = true
        WA.room.hideLayer("leftDownstairsAnim")
        WA.controls.restorePlayerControls()
    })
    WA.room.onEnterLayer('leftStairsZone').subscribe(() => {
        if (playerCanGoUpstairs) {
            WA.controls.disablePlayerControls()
            WA.room.showLayer("leftUpstairsAnim")
            WA.player.moveTo(1230, 256)
        } else {
            WA.controls.disablePlayerControls()
            WA.room.showLayer("leftDownstairsAnim")
            WA.player.moveTo(1230, 448)
        }
    })

    // Hackathon Right stairs
    WA.room.onEnterLayer('rightUpstairsZone').subscribe(() => {
        playerCanGoUpstairs = false
        WA.room.hideLayer("rightUpstairsAnim")
        WA.controls.restorePlayerControls()
    })
    WA.room.onEnterLayer('rightDownstairsZone').subscribe(() => {
        playerCanGoUpstairs = true
        WA.room.hideLayer("rightDownstairsAnim")
        WA.controls.restorePlayerControls()
    })
    WA.room.onEnterLayer('rightStairsZone').subscribe(() => {
        if (playerCanGoUpstairs) {
            WA.controls.disablePlayerControls()
            WA.room.showLayer("rightUpstairsAnim")
            WA.player.moveTo(1648, 256)
        } else {
            WA.controls.disablePlayerControls()
            WA.room.showLayer("rightDownstairsAnim")
            WA.player.moveTo(1648, 448)
        }
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export { };