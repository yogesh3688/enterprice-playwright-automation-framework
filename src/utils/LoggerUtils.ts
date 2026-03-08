import winston, { level, transports } from "winston";
import path from "path";
import moment from "moment-timezone";

const currentDir = __dirname;

//Go to one level up from current directory
const logDir = path.join(currentDir, "..", "logs");

// Change to loggig folder
const loggingDir = path.resolve(logDir, "logging");

//function to format log entries with timestamp and timezone
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

//Set the desired timezone
// cons timezone = "America/New_York"; // Example: New York timezone
const timeZone = "Asia/Kolkata"; // Example: Kolkata timezone

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
        customFormat
    ),
    transports: [
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({
            filename: path.join(loggingDir, "test_run.log"),
            maxFiles: 5, // Keep a maximum of 5 log files
            maxsize: 10 * 1024, // Rotate log file when it reaches 10 MB
            level: "info",
        }),
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({
            filename: path.join(loggingDir, "test_error.log"),
            maxFiles: 5, // Keep a maximum of 5 log files
            maxsize: 10 * 1024, // Rotate log file when it reaches 10 MB
            level: "error"
        }),
    ]
});

export default logger;