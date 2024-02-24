class Entity {
    constructor(db) {
        this.db = db;
    }

    // 엔티티 생성
    create(entityType) {
        const sql = `INSERT INTO Entities (EntityType) VALUES (?)`;
        return this.db.run(sql, [entityType]);
    }

    // 엔티티 조회 (ID로 조회)
    findById(entityId) {
        const sql = `SELECT * FROM Entities WHERE EntityID = ?`;
        return this.db.get(sql, [entityId]);
    }

    // 엔티티 업데이트
    update(entityId, entityType) {
        const sql = `UPDATE Entities SET EntityType = ? WHERE EntityID = ?`;
        return this.db.run(sql, [entityType, entityId]);
    }

    // 엔티티 삭제
    delete(entityId) {
        const sql = `DELETE FROM Entities WHERE EntityID = ?`;
        return this.db.run(sql, [entityId]);
    }

    // 특정 타입의 모든 엔티티 조회
    findAllByType(entityType) {
        const sql = `SELECT * FROM Entities WHERE EntityType = ?`;
        return this.db.all(sql, [entityType]);
    }
}

module.exports = Entity;
