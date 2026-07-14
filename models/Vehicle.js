const db = require("../config/db");

class Vehicle {

    static async buscarPorPlaca(placa) {

    const [rows] = await db.query(
        `SELECT
            v.*,
            t.nombre,
            t.tarifa_por_minuto,
            t.requiere_acumulacion
        FROM vehiculos v
        INNER JOIN tipos_vehiculo t
            ON v.id_tipo = t.id_tipo
        WHERE placa = ?`,
        [placa]
    );

    return rows[0];
}

    static async crear(placa, id_tipo) {
        const [result] = await db.query(
            "INSERT INTO vehiculos (placa, id_tipo) VALUES (?, ?)",
            [placa, id_tipo]
        );

        return result.insertId;
    }

}

module.exports = Vehicle;