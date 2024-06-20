import openDB from "@/configdb";

class User {
    id?: number;
    status?: number;
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Create Table
    async createTable() {
        try {
            const db = await openDB();
            await db.exec(`CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, status INTEGER, name TEXT, email TEXT, password VARCHAR(64))`);
        } catch (error) {
            console.error("Error creating table:", error);
        }
    }

    // Insert User
    async insert() {
        try {
            const db = await openDB();
            await db.run(`INSERT INTO User (status, name, email, password) VALUES (?, ?, ?, ?)`, [1, this.name, this.email, this.password]);
        } catch (error) {
            console.error("Error inserting user:", error);
        }
    }

    // List Users
    async list() {
        try {
            const db = await openDB();
            const users = await db.all(`SELECT id, status, name, email FROM User`);
            return users;
        } catch (error) {
            console.error("Error selecting all users:", error);
        }
    }

    // Select User by ID
    async select(id: number) {
        try {
            const db = await openDB();
            const user = await db.all(`SELECT id, status, name, email FROM User WHERE id = ?`, [id]);
            return user;
        } catch (error) {
            console.error("Error selecting user:", error);
        }
    }

    // Update User
    async update(id: number) {
        try {
            const db = await openDB();
            await db.run(`UPDATE User SET status = ?, name = ?, email = ?, password = ? WHERE id = ?`, [this.status, this.name, this.email, this.password, id]);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    // Reset Password
    async reset(password: string, id: number) {
        try {
            const db = await openDB();
            await db.run(`UPDATE User SET password = ? WHERE id = ?`, [password, id]);
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    }

    // Disable User
    async disable(id: number) {
        try {
            const db = await openDB();
            await db.run(`UPDATE User SET status = 0 WHERE id = ?`, [id]);
        } catch (error) {
            console.error("Error disabling user:", error);
        }
    }

    // Activate User
    async activate(id: number) {
        try {
            const db = await openDB();
            await db.run(`UPDATE User SET status = 1 WHERE id = ?`, [id]);
        } catch (error) {
            console.error("Error activating user:", error);
        }
    }
}

export default User;