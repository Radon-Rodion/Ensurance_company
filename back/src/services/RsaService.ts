/*
import {config} from "../app.config";
import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

export class RsaService {
    private privateKey: string;
    private publicKey: string;
    private enabled: boolean;

    constructor() {
        this.privateKey = config.authentication.rsa.privateKey;
        this.publicKey = config.authentication.rsa.publicKey;
        this.enabled = config.authentication.rsa.enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    encrypt(plaintext: string): string {
        if (!this.enabled)
            return plaintext;

        let buffer = new Buffer(plaintext);
        let encrypted = crypto.privateEncrypt(this.privateKey, buffer);

        return encrypted.toString('base64');
    }

    decrypt(cypher: string): string {
        if (!this.enabled)
            return cypher;

        let buffer = Buffer.from(cypher, 'base64');
        let plaintext = crypto.publicDecrypt(this.publicKey, buffer);

        return plaintext.toString('utf8')
    }
}*/
