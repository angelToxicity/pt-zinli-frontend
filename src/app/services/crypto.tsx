import crypto from "crypto"
const key = process.env.NEXT_PUBLIC_KEY!;

export class Crypto {  
    // Función para cifrar datos con AES-128
    encryptData(data:string):string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        let encryptedData = cipher.update(data, 'utf8', 'hex');
        encryptedData += cipher.final('hex');
        return iv.toString('hex') + ':' + encryptedData;
    }
    
    // Función para descifrar datos cifrados con AES-128
     decryptData(encryptedData:string):string {
        const [iv, encryptedDataPart] = encryptedData.split(':');
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, Buffer.from(iv, 'hex'));
        let decryptedData = decipher.update(encryptedDataPart, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }

}
