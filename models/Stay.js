const db = require("../config/db");

class Stay {

    static async crear(id_vehiculo) {

        const [result] = await db.query(
            `INSERT INTO estancias
            (id_vehiculo, fecha_hora_entrada)
            VALUES (?, NOW())`,
            [id_vehiculo]
        );

        return result.insertId;
    }

    static async buscarEstanciaAbierta(id_vehiculo) {

    const [rows] = await db.query(
        `SELECT * FROM estancias
        WHERE id_vehiculo = ?
        AND estado = 'ABIERTA'`,
        [id_vehiculo]
    );

    return rows[0];

}

static async obtenerEstanciaAbierta(id_vehiculo) {

    const [rows] = await db.query(
        `SELECT * FROM estancias
        WHERE id_vehiculo = ?
        AND estado = 'ABIERTA'
        LIMIT 1`,
        [id_vehiculo]
    );

    return rows[0];
}

static async cerrar(id_estancia, minutos, total) {

    await db.query(
        `UPDATE estancias
        SET fecha_hora_salida = NOW(),
            minutos = ?,
            total_pagado = ?,
            estado = 'CERRADA'
        WHERE id_estancia = ?`,
        [minutos, total, id_estancia]
    );

}

}




module.exports = Stay;