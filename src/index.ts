/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
// import { UIWebsite } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let playerCanGoUpstairs: boolean = true;

// Waiting for the API to be ready
WA.onInit().then(() => {
    // let numberWebsite: UIWebsite;
    console.log('Scripting API ready');
    // console.log(' ............ Player tags: ', WA.player.tags);


    // user auth
    // let numberWebsite: UIWebsite | undefined;



    WA.room.onEnterLayer("visibleNumberField").subscribe(async () => {
        console.log(' .---...---. Player tags: ', WA.player.tags);

        if (!WA.player.tags.includes("auth")) {
            // console.log(" ************************* Entering visibleNote layer");
            // console.log(numberWebsite);
            await WA.ui.website.open({
                url: "./src/auth/numberfield.html",
                position: {
                    vertical: "top",
                    horizontal: "middle",
                },
                size: {
                    height: "18vh",
                    // height: "13vh",
                    width: "14vw",
                },
                margin: {
                    top: "20vh",
                },
                allowApi: true,
            });
        }

    });

    WA.room.onLeaveLayer("visibleNumberField").subscribe(() => {
        // console.log(WA.ui.website.getAll())
        // console.log(" 790e48590e4580             get out ");
        // console.log(numberWebsite.position.horizontal);
        // if (numberWebsite) {
        // numberWebsite.close().then(() => {
        // numberWebsite = null;
        // console.log("satisfide")
        // }).catch(e => console.log(e));
        // }

        // numberWebsite.close();


        WA.ui.website.getAll().then((websites) => {
            console.log("alll the tags", WA.player.tags);
            // console.log("تمام پنجره‌های باز:", websites);
            websites.forEach(site => {
                // console.log("URL:", site.url);
                // console.log("Visible:", site.visible);
                if (site.url == "./src/auth/numberfield.html")
                    site.close();
            });
        });


    });



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