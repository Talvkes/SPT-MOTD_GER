"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');

class MOTDMod
{
    constructor() 
    {
        this.messages = require("./messages.json");
        this.newday = false;

        var lastday = new Date(this.messages.lastday);
        var today = new Date();

        lastday = Date.UTC( lastday.getFullYear(), lastday.getMonth(), lastday.getDate() );
        today = Date.UTC( today.getFullYear(), today.getMonth(), today.getDate() );

        if ( Math.abs(lastday-today) > 0 )
        {   
            this.newday = true;

            today = new Date();
            let month = today.getMonth() + 1;

            this.messages.lastday = today.getFullYear() +"-" + month +"-"+ today.getDate();
        } 

    }

    postDBLoad(container) 
    {
        let LOCALES = container.resolve("DatabaseServer").getTables().locales.global;
        const MENU = container.resolve("DatabaseServer").getTables().locales.menu.en;

        let message = "";

        if(Intl.DateTimeFormat().resolvedOptions().locale == "ru-RU") //check user language
        {
            LOCALES = LOCALES.ru;
            if(this.newday == true)
            {
                var randomNumber = Math.floor(Math.random() * this.messages.Messages_ru.length);
                message = this.messages.Messages_ru[randomNumber];
                this.messages.selectedMessage = message;
            }
            else
            {
                message = this.messages.selectedMessage;
            }
        }
        else
        {
            LOCALES = LOCALES.en;
            if(this.newday == true)
            {
                var randomNumber = Math.floor(Math.random() * this.messages.Messages_en.length);
                message = this.messages.Messages_en[randomNumber];
                this.messages.selectedMessage = message;
            }
            else
            {
                message = this.messages.selectedMessage;
            }

        }

        //Replaces title of Orange Box with motd
        LOCALES["Attention! This is a Beta version of Escape from Tarkov for testing purposes."] = "Message of the Day!";
        LOCALES["NDA free warning"] = message; //Replaces the Orange Box's text with the mod

        randomNumber = Math.floor(Math.random() * this.messages.loadingMessages.length); 

        LOCALES["Profile data loading..."] = this.messages.loadingMessages[randomNumber];
        MENU["Profile data loading..."] = this.messages.loadingMessages[randomNumber];

        fs.writeFileSync("./user/mods/welcomeMessages/messages.json", JSON.stringify(this.messages, null, 4) );


    }

}

module.exports = { mod: new MOTDMod() };
