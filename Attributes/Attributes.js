class Attributes {
    constructor(db) {
        this.db = db;
    }

    create(entityId, key, value) {
        const sql =
            "INSERT INTO Attributes (entity_id, key, value) VALUES (?, ?, ?)";
        return this.db.run(sql, [entityId, key, value]);
    }

    read(attributeId) {
        const sql = "SELECT * FROM Attributes WHERE attribute_id = ?";
        return this.db.get(sql, [attributeId]);
    }

    update(attributeId, key, value) {
        const sql =
            "UPDATE Attributes SET key = ?, value = ? WHERE attribute_id = ?";
        return this.db.run(sql, [key, value, attributeId]);
    }

    delete(attributeId) {
        const sql = "DELETE FROM Attributes WHERE attribute_id = ?";
        return this.db.run(sql, [attributeId]);
    }

    get(entityId) {
        const sql = "SELECT * FROM Attributes WHERE entity_id = ?";
        return this.db.all(sql, [entityId]);
    }

    getAttribute(entityId, key) {
        const sql = "SELECT * FROM Attributes WHERE entity_id = ? AND key = ?";
        return this.db.get(sql, [entityId, key]);
    }

    getAttributeValue(entityId, key) {
        const sql =
            "SELECT value FROM Attributes WHERE entity_id = ? AND key = ?";
        return this.db.get(sql, [entityId, key]);
    }

    getAttributeKey(entityId, value) {
        const sql =
            "SELECT key FROM Attributes WHERE entity_id = ? AND value = ?";
        return this.db.get(sql, [entityId, value]);
    }

    getAttributeId(entityId, key, value) {
        const sql =
            "SELECT attribute_id FROM Attributes WHERE entity_id = ? AND key = ? AND value = ?";
        return this.db.get(sql, [entityId, key, value]);
    }
}

module.exports = Attributes;
