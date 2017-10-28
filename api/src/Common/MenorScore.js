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
        return Math.sqrt(
            Math.pow(Math.abs(
                (agePoint/18 * (genderWeigth/ageWeigth)) +
                (age/18 * (genderWeigth/ageWeigth))
            ), 2) +
            Math.pow(Math.abs(
                genderPoint - genderScore
            ), 2)
        );
    }
}