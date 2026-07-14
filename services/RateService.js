class RateService {

    static calcular(minutos, tarifa) {
        return minutos * tarifa;
    }

}

module.exports = RateService;