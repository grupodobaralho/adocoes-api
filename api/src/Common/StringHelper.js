export default class StringHelper {
    //Exibe somente a primeira letra de cada parte do nome. Estratégia utilizada: separa string em "espaços em branco" e pega a primeira letra de cada separação
    static getOnlyNameInitials(name) {
        let nameParts = name
            .split(" ")
            .map(str => {
                return str.charAt(0) + ".";
            });

        return nameParts.join(" ");
    }

    //Exibe somente o primeiro nome. Estratégia utilizada: separa string em "espaços em branco" e pega primeira separação
    static getOnlyFirstName(name) {
        return name.split(" ")[0];
    }
}