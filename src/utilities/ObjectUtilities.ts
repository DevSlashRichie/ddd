
export class ObjectUtilities {

    /**
   * Convert an string to a javascript primitive.
   * @param val The string that is a mirror of javacript code.
   */
    public static convertStringToJS(val: string) {

        let type: 'OBJECT' | 'NUMBER' | 'STRING' | null;

        if (/[0-9]+/.test(val)) {
            type = 'NUMBER';
        } else if (val.startsWith('{') && val.endsWith('}')) {
            type = 'OBJECT';
        } else {
            type = 'STRING';
        }

        switch (type) {
        case 'NUMBER':
            return parseInt(val);
        case 'OBJECT':
            return JSON.parse(val);
        case 'STRING':
            return String(val);
        }

    }

}