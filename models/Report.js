const db = require("../config/db");

class Report {

    static async obtener(fecha, horaInicio, horaFin) {

        const [rows] = await db.query(
            `
            SELECT
                v.placa,
                tv.nombre AS tipo,
                e.fecha_hora_entrada,
                e.fecha_hora_salida,
                e.minutos,
                e.total_pagado
            FROM estancias e
            INNER JOIN vehiculos v
                ON e.id_vehiculo = v.id_vehiculo
            INNER JOIN tipos_vehiculo tv
                ON v.id_tipo = tv.id_tipo
            WHERE DATE(e.fecha_hora_entrada) = ?
            AND TIME(e.fecha_hora_entrada) BETWEEN ? AND ?
            ORDER BY e.fecha_hora_entrada ASC
            `,
            [fecha, horaInicio, horaFin]
        );

        return rows;
    }

}

module.exports = Report;