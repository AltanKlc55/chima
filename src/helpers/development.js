import { developmentMode } from "../config/application";

export function consoleLog(title, description, logs) {
  if (developmentMode) {
    if (logs) {
      console.group(`%c${title} > %c${description}`, "color:yellow", "color:white");
      const logDatas = Array.isArray(logs) ? logs : (typeof logs === "string" ? [[0, logs]] : Object.entries(logs));      
      for (let i = 0; i < logDatas.length; i++) {
        if (logDatas[i].length === 2 && typeof logDatas[i][0] == "string") console.log(`%c${logDatas[i][0]}`, "color:#yellow", logDatas[i][1]);
        else if (Array.isArray(logDatas[i])) console.log(...logDatas[i]);
        else console.log(logDatas[i]);
      }
      console.groupEnd();
    }
    else if (description) {
      console.log(`%c${title} > %c${description}`, "color:yellow", "color:white");
    }
    else if (typeof title === "string") {
      console.log(`%c${title}`, "color:yellow");
    }
    else console.log(title);
  }
}