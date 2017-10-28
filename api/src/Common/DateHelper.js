export default class DateHelper {
    static getAgeByDOB(date) {
        //time difference
        let timeDiff = Math.abs(Date.now() - date.getTime());

        //days difference
        let daysDiff = Math.ceil(timeDiff / (1000.0 * 3600 * 24));

        //years difference
        let yearsDiff = daysDiff / 365.0;

        return yearsDiff;
    }
}