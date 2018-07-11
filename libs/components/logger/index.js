const {createLogger, format, transports} = require('winston');
const {splat, combine, timestamp, label, printf} = format;

const context = require('../../../data/context');
if(!context)  {
    throw  new Error("Could not locate Context; please check `/data/context.js` to make sure the file exists!")
}

const logLevel = context.logger ? context.logger.level || 'debug' : context.logLevel || 'debug';
require('winston-daily-rotate-file');

var Logger = function (name, target) {
    let transportz = [new transports.Console()];

    if (context.logger && context.logger.file) {
        transportz.push(
            new transports.DailyRotateFile({
                filename: context.logger.file,
                datePattern: 'YYYY-MM-DD',
                prepend: false,
                localTime: false,
                level: logLevel
            })
        );
    }

    return createLogger({
        format: combine(
            splat(),
            label({label: {loggerName: name, coin: target}}),
            timestamp(),
            printf(info => {
                return `[${info.timestamp}] [${info.level}] [${info.label.coin}] [${info.label.loggerName}] : ${info.message}`;
            })
        ),
        level: logLevel,
        transports: transportz,
    });
};

module.exports = Logger;
