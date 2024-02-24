class Value {
    constructor(db) {
        this.db = db;
    }

    // 속성 값 생성
    create(entityId, attributeId, value) {
        const sql = `INSERT INTO EntityValues (EntityID, AttributeID, Value) VALUES (?, ?, ?)`;
        return this.db.run(sql, [entityId, attributeId, value]);
    }

    // 특정 엔티티의 모든 속성 값 조회
    findByEntityId(entityId) {
        const sql = `SELECT * FROM EntityValues WHERE EntityID = ?`;
        return this.db.all(sql, [entityId]);
    }

    // 특정 속성의 모든 속성 값 조회
    findByAttributeId(attributeId) {
        const sql = `SELECT * FROM EntityValues WHERE AttributeID = ?`;
        return this.db.all(sql, [attributeId]);
    }

    findByValue(value) {
        const sql = `SELECT * FROM EntityValues WHERE Value = ?`;
        return this.db.all(sql, [value]);
    }

    // 속성 값 업데이트
    update(valueId, newValue) {
        const sql = `UPDATE EntityValues SET Value = ? WHERE ValueID = ?`;
        return this.db.run(sql, [newValue, valueId]);
    }

    // 속성 값 삭제
    delete(valueId) {
        const sql = `DELETE FROM EntityValues WHERE ValueID = ?`;
        return this.db.run(sql, [valueId]);
    }
}

module.exports = Value;
