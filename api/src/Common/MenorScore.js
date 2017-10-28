import { config } from '../config';
import Gender from './Gender';
import DateHelper from './DateHelper';

export default class MenorScore {
    static calculate(dob, gender, agePoint, genderPoint) {
        let genderScore = (gender === "Masculino" ? Gender.MALE : Gender.FEMALE);
        let age = DateHelper.getAgeByDOB(dob);

        return this.getOrder(age, genderScore, agePoint, genderPoint, config.ageWeigth, config.genderWeigth);
    }

    static getOrder(age, genderScore, agePoint, genderPoint, ageWeigth, genderWeigth) {
        let weigth = genderWeigth/ageWeigth;

        return Math.sqrt(
            Math.pow(Math.abs(
                (agePoint / config.maximumAgePoint * weigth) -
                (age / config.maximumAgePoint * weigth)
            ), 2.0) +
            Math.pow(Math.abs(
                genderPoint - genderScore
            ), 2.0)
        );
    }
}