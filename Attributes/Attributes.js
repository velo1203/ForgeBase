class Attributes {
    constructor(db) {
        this.db = db;
    }

    // 속성 생성
    create(attributeName) {
        const sql = `INSERT INTO Attributes (AttributeName) VALUES (?)`;
        return this.db.run(sql, [attributeName]);
    }

    // 속성 조회 (ID로 조회)
    findById(attributeId) {
        const sql = `SELECT * FROM Attributes WHERE AttributeID = ?`;
        return this.db.get(sql, [attributeId]);
    }

    findAllbyName(attributeName) {
        const sql = `SELECT * FROM Attributes WHERE AttributeName = ?`;
        return this.db.all(sql, [attributeName]);
    }

    // 속성 업데이트
    update(attributeId, attributeName) {
        const sql = `UPDATE Attributes SET AttributeName = ? WHERE AttributeID = ?`;
        return this.db.run(sql, [attributeName, attributeId]);
    }

    // 속성 삭제
    delete(attributeId) {
        const sql = `DELETE FROM Attributes WHERE AttributeID = ?`;
        return this.db.run(sql, [attributeId]);
    }

    // 모든 속성 조회
    findAll() {
        const sql = `SELECT * FROM Attributes`;
        return this.db.all(sql);
    }
}

module.exports = Attributes;
