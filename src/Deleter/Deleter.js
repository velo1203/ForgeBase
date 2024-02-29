class Deleter {
    constructor(db) {
        this.db = db;
    }

    async delete(entityType, ids) {
        const sql = `
            DELETE FROM Entities
            WHERE EntityID IN (${ids.map(() => "?").join(", ")})
            AND EntityType = ?
        `;
        try {
            await this.db.run(sql, [...ids, entityType]);
        } catch (error) {
            console.error("Error deleting entity:", error);
            throw error;
        }
    }
}

module.exports = Deleter;
