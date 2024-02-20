const sqlite3 = require("sqlite3").verbose();

class Database {
    constructor(dbPath) {
        // 데이터베이스 연결
        this.db = new sqlite3.Database(
            dbPath,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                if (err) {
                    console.error("Database connection error:", err.message);
                } else {
                    console.log("Database connection successful");
                }
            }
        );

        // 사용자 테이블 초기화
        this.initialize();
    }

    initialize() {
        const entitiesSql = `CREATE TABLE IF NOT EXISTS Entities (
            EntityID INTEGER PRIMARY KEY AUTOINCREMENT,
            EntityType TEXT NOT NULL
          )`;
        const attributesSql = `CREATE TABLE IF NOT EXISTS Attributes (
            AttributeID INTEGER PRIMARY KEY AUTOINCREMENT,
            AttributeName TEXT NOT NULL,
            DataType TEXT NOT NULL
          )`;

        const valueSql = `CREATE TABLE IF NOT EXISTS Values (
            EntityID INTEGER,
            AttributeID INTEGER,
            Value TEXT NOT NULL,
            FOREIGN KEY (EntityID) REFERENCES Entities (EntityID),
            FOREIGN KEY (AttributeID) REFERENCES Attributes (AttributeID)
          )`;
        const relationshipsSql = `CREATE TABLE IF NOT EXISTS Relationships (
            RelationshipID INTEGER PRIMARY KEY AUTOINCREMENT,
            EntityID1 INTEGER,
            EntityID2 INTEGER,
            RelationshipType TEXT NOT NULL,
            FOREIGN KEY (EntityID1) REFERENCES Entities (EntityID),
            FOREIGN KEY (EntityID2) REFERENCES Entities (EntityID)
          )`;

        return Promise.all([
            this.CreateTable(entitiesSql),
            this.CreateTable(attributesSql),
            this.CreateTable(valueSql),
            this.CreateTable(relationshipsSql),
        ])
            .then(() => {
                return "All tables initialized successfully";
            })
            .catch((err) => {
                return "Error initializing tables:", err;
            });
    }

    CreateTable(sql) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.error("Error running sql:", sql);
                    console.error(err);
                    reject(err);
                } else {
                    // this.lastID는 INSERT 작업에 대한 마지막 삽입 ID를 반환합니다.
                    resolve(this.lastID);
                }
            });
        });
    }

    // 단일 결과를 반환하는 SQL 쿼리를 실행하는 경우 (SELECT)
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.error("Error running sql:", sql);
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // 여러 결과를 반환하는 SQL 쿼리를 실행하는 경우 (SELECT)
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error("Error running sql:", sql);
                    console.error(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Database;
