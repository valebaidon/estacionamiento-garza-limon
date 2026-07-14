const express = require("express");
const router = express.Router();

const ParkingController = require("../controllers/parkingController");

router.get("/entrada", ParkingController.mostrarEntrada);

router.post("/entrada", ParkingController.registrarEntrada);

router.get("/salida", ParkingController.mostrarSalida);

router.post("/salida", ParkingController.registrarSalida);

router.get("/reportes", ParkingController.mostrarReportes);

router.post("/reportes", ParkingController.buscarReportes);

router.get("/reportes/excel", ParkingController.exportarExcel);

module.exports = router;