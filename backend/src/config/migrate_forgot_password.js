const db = require('./db');

db.serialize(() => {
    // We add email, reset_token, and reset_expires to the users table
    db.run("ALTER TABLE users ADD COLUMN email TEXT", (err) => {
        if (err && !err.message.includes("duplicate column name")) console.error(err);
    });
    db.run("ALTER TABLE users ADD COLUMN reset_token TEXT", (err) => {
        if (err && !err.message.includes("duplicate column name")) console.error(err);
    });
    db.run("ALTER TABLE users ADD COLUMN reset_expires INTEGER", (err) => {
        if (err && !err.message.includes("duplicate column name")) console.error(err);
    });
    console.log("Migration for Forgot Password completed.");
});
