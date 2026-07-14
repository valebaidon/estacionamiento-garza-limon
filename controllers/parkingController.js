const Vehicle = require("../models/Vehicle");
const Stay = require("../models/Stay");
const db = require("../config/db");
const RateService = require("../services/RateService");
const Report = require("../models/Report");
const ExcelJS = require("exceljs");

class ParkingController {

    // Mostrar formulario de entrada
    static async mostrarEntrada(req, res) {

        const [tipos] = await db.query(
            "SELECT * FROM tipos_vehiculo"
        );

        res.render("entrada", {
            tipos
        });

    }

    // Registrar entrada
    static async registrarEntrada(req, res) {

        try {

            let { placa, id_tipo } = req.body;

placa = placa.trim().toUpperCase();

            let vehiculo = await Vehicle.buscarPorPlaca(placa);

            let idVehiculo;

            if (!vehiculo) {

                idVehiculo = await Vehicle.crear(
                    placa,
                    id_tipo
                );

            } else {

                idVehiculo = vehiculo.id_vehiculo;

            }

            const estanciaAbierta = await Stay.buscarEstanciaAbierta(idVehiculo);

if (estanciaAbierta) {
    return res.send("El vehículo ya se encuentra dentro del estacionamiento.");
}

await Stay.crear(idVehiculo);

res.redirect("/entrada");

        } catch (error) {

            console.log(error);

            res.send("Error al registrar la entrada.");

        }

    }

    static async mostrarSalida(req, res) {

    res.render("salida", {
        resultado: null,
        error: null
    });

    
}


static async registrarSalida(req, res) {

    try {

        let { placa } = req.body;

        placa = placa.trim().toUpperCase();

        const vehiculo = await Vehicle.buscarPorPlaca(placa);

        if (!vehiculo) {

            return res.render("salida", {
                error: "El vehículo no existe.",
                resultado: null
            });

        }

        const estancia = await Stay.obtenerEstanciaAbierta(vehiculo.id_vehiculo);

        if (!estancia) {

            return res.render("salida", {
                error: "El vehículo no tiene una estancia abierta.",
                resultado: null
            });

        }

        const entrada = new Date(estancia.fecha_hora_entrada);
        const salida = new Date();

        const minutos = Math.ceil((salida - entrada) / 60000);

        const total = RateService.calcular(
            minutos,
            vehiculo.tarifa_por_minuto
        );

        await Stay.cerrar(
            estancia.id_estancia,
            minutos,
            total
        );

        res.render("salida", {
            error: null,
            resultado: {
                placa,
                minutos,
                total
            }
        });

    } catch (error) {

        console.log(error);

        res.render("salida", {
            error: "Ocurrió un error.",
            resultado: null
        });

    }

}

    static async mostrarReportes(req, res) {

    res.render("reportes", {
        reportes: [],
        filtros: {
            fecha: "",
            horaInicio: "",
            horaFin: ""
        }
    });

}

    static async buscarReportes(req, res) {

    try {

        const { fecha, horaInicio, horaFin } = req.body;

        const reportes = await Report.obtener(
            fecha,
            horaInicio,
            horaFin
        );

        reportes.forEach(r => {

    r.fechaEntrada = new Date(r.fecha_hora_entrada)
        .toLocaleString("es-MX");

    r.fechaSalida = r.fecha_hora_salida
        ? new Date(r.fecha_hora_salida).toLocaleString("es-MX")
        : "-";

});

        res.render("reportes", {
            reportes,
            filtros: {
                fecha,
                horaInicio,
                horaFin
            }
        });

    } catch (error) {

        console.error(error);

        res.render("reportes", {
            reportes: [],
            filtros: {
                fecha: "",
                horaInicio: "",
                horaFin: ""
            }
        });

    }

}

static async exportarExcel(req, res) {

    try {

        const { fecha, horaInicio, horaFin } = req.query;

        const reportes = await Report.obtener(
            fecha,
            horaInicio,
            horaFin
        );

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet("Reporte");

        worksheet.columns = [
            { header: "Placa", key: "placa", width: 15 },
            { header: "Tipo", key: "tipo", width: 20 },
            { header: "Entrada", key: "entrada", width: 25 },
            { header: "Salida", key: "salida", width: 25 },
            { header: "Minutos", key: "minutos", width: 15 },
            { header: "Total", key: "total", width: 15 }
        ];

        reportes.forEach(r => {

            worksheet.addRow({

                placa: r.placa,

                tipo: r.tipo,

                entrada: new Date(r.fecha_hora_entrada).toLocaleString("es-MX"),

                salida: r.fecha_hora_salida
                    ? new Date(r.fecha_hora_salida).toLocaleString("es-MX")
                    : "-",

                minutos: r.minutos,

                total: r.total_pagado

            });

        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=reporte_estacionamiento.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {

        console.log(error);

        res.status(500).send("Error al generar el Excel.");

    }

}
}

module.exports = ParkingController;