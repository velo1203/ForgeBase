class Entity {
    constructor(db) {
        this.db = db;
    }

    create(type) {
        const sql = "INSERT INTO Entities (type) VALUES (?)";
        return this.db.run(sql, [type]);
    }
    dk;
    read(entityId) {
        const sql = "SELECT * FROM Entities WHERE entity_id = ?";
        return this.db.get(sql, [entityId]);
    }
    getALl() {
        const sql = "SELECT * FROM Entities";
        return this.db.all(sql);
    }

    update(entityId, type) {
        const sql = "UPDATE Entities SET type = ? WHERE entity_id = ?";
        return this.db.run(sql, [type, entityId]);
    }

    delete(entityId) {
        const sql = "DELETE FROM Entities WHERE entity_id = ?";
        return this.db.runSql(sql, [entityId]);
    }

    getAttributes(entityId) {
        const sql = "SELECT * FROM Attributes WHERE entity_id = ?";
        return this.db.all(sql, [entityId]);
    }

    get(Type) {
        const sql = "SELECT * FROM Entities WHERE type = ?";
        return this.db.all(sql, [Type]);
    }

    getRelationships(entityId) {
        const sql =
            "SELECT * FROM Relationships WHERE entity_id1 = ? OR entity_id2 = ?";
        return this.db.all(sql, [entityId, entityId]);
    }
}

module.exports = Entity;
