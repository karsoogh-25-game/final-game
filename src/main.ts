/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

import { openPopup , closePopup} from "./c";
import {day_night_cycle} from "./b";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {

    WA.room.onEnterLayer("zoneOffice").subscribe(() => {
        WA.room.hideLayer("Roof/roofOpenOffice");
        WA.room.hideLayer("Roof/roofOpenOffice2");
    });
    WA.room.onLeaveLayer("zoneOffice").subscribe(() => {
        WA.room.showLayer("Roof/roofOpenOffice");
        WA.room.showLayer("Roof/roofOpenOffice2");
    });

    WA.room.area.onEnter("roofZoneWorkShop").subscribe(() => {
        WA.room.hideLayer("Roof/roofWorkshop");
    });
    WA.room.area.onLeave("roofZoneWorkShop").subscribe(() => {
        WA.room.showLayer("Roof/roofWorkshop");
    });

    WA.room.area.onEnter("roofZoneAuditorium").subscribe(() => {
        WA.room.hideLayer("Roof/roofAuditorium");
        WA.room.hideLayer("Roof/roofAuditorium2");
    });
    WA.room.area.onLeave("roofZoneAuditorium").subscribe(() => {
        WA.room.showLayer("Roof/roofAuditorium");
        WA.room.showLayer("Roof/roofAuditorium2");
    });

    let currentZone: string;
    WA.room.area.onEnter('fireplacezone').subscribe (() => {
        //console.log('   uhiuiiuh        iuh iuiuh          uihuih');
        currentZone = 'fireplacezone';
        openPopup(currentZone, currentZone + 'Popup');
    });
    WA.room.area.onLeave('fireplacezone').subscribe(() => {
        closePopup();
    });

    //This function will automatically change day mode into night mode
    //folders for the inputs: first day folder, second night folder.
    //In each folder, the layers should be related to the state of day and night.
    day_night_cycle("","");

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
