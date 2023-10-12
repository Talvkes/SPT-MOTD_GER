"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MOTDMod 
{
    constructor() 
    {
        this.messages = require("./messages.json");
    }

    // Code added here will load BEFORE the server has started loading
    postDBLoad(container) 
    {
        const logger = container.resolve("WinstonLogger"); 
        let LOCALES = container.resolve("DatabaseServer").getTables().locales.global;
        const MENU = container.resolve("DatabaseServer").getTables().locales.menu.en;

        let message = "";

        if(Intl.DateTimeFormat().resolvedOptions().locale == "ru-RU") //check user language
        {
            LOCALES = LOCALES.ru;
            var randomNumber = Math.floor(Math.random() * this.messages.Messages_ru.length);
            message = this.messages.Messages_ru[randomNumber];
        }
        else
        {
            LOCALES = LOCALES.en;
            var randomNumber = Math.floor(Math.random() * this.messages.Messages_en.length);
            message = this.messages.Messages_en[randomNumber];
        }

        //Replaces title of Orange Box with motd
        LOCALES["Attention! This is a Beta version of Escape from Tarkov for testing purposes."] = "Message of the Day!";
        LOCALES["NDA free warning"] = message; //Replaces the Orange Box's text with the mod

        randomNumber = Math.floor(Math.random() * this.messages.loadingMessages.length); 

        LOCALES["Profile data loading..."] = this.messages.loadingMessages[randomNumber];
        MENU["Profile data loading..."] = this.messages.loadingMessages[randomNumber];

    }

}

module.exports = { mod: new MOTDMod() };
