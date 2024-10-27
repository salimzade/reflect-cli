import { customAlphabet } from "nanoid";

function shortid(size) {
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, size);
    return nanoid();
}

export default shortid;