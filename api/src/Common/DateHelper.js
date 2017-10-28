export default class DateHelper {
    static getAgeByDOB(date) {
        let ageDifMs = Date.now() - date.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}