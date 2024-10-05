class DynamicEncryptor {
  private ivLength: number = 16;
  private blockSize: number = 16;

  private generateKey(vaultKey: string): number[] {
    const dynamicComponent = (new Date().getTime() % 1000).toString();
    const key = (vaultKey + dynamicComponent).slice(0, 16);
    return this.stringToByteArray(key);
  }

  private stringToByteArray(str: string): number[] {
    const byteArray = [];
    for (let i = 0; i < str.length; i++) {
      byteArray.push(str.charCodeAt(i) & 0xff);
    }
    return byteArray;
  }

  private byteArrayToString(byteArray: number[]): string {
    return String.fromCharCode.apply(null, byteArray);
  }

  private encryptBlock(block: number[], key: number[]): number[] {
    const encryptedBlock = [];
    for (let i = 0; i < block.length; i++) {
      encryptedBlock[i] = block[i] ^ key[i % key.length];
    }
    return encryptedBlock;
  }

  private decryptBlock(block: number[], key: number[]): number[] {
    return this.encryptBlock(block, key);
  }

  private generateIV(): number[] {
    const iv = [];
    for (let i = 0; i < this.ivLength; i++) {
      iv.push(Math.floor(Math.random() * 256));
    }
    return iv;
  }

  private padData(data: number[]): number[] {
    const paddingLength = this.blockSize - (data.length % this.blockSize);
    const paddedData = data.slice();
    for (let i = 0; i < paddingLength; i++) {
      paddedData.push(paddingLength);
    }
    return paddedData;
  }

  private unpadData(data: number[]): number[] {
    const paddingLength = data[data.length - 1];
    return data.slice(0, data.length - paddingLength);
  }

  public encrypt(data: string, vaultKey: string): string {
    const key = this.generateKey(vaultKey);
    const iv = this.generateIV();
    const byteData = this.stringToByteArray(data);
    const paddedData = this.padData(byteData);

    const encryptedData: number[] = [];
    for (let i = 0; i < paddedData.length; i += this.blockSize) {
      const block = paddedData.slice(i, i + this.blockSize);
      const encryptedBlock = this.encryptBlock(block, key);
      encryptedData.push(...encryptedBlock);
    }

    const result = [...iv, ...encryptedData];
    return btoa(this.byteArrayToString(result)); // Кодування в Base64
  }

  public decrypt(data: string, vaultKey: string): string {
    const decodedData = this.stringToByteArray(atob(data)); // Декодування з Base64
    const key = this.generateKey(vaultKey);

    const encryptedData = decodedData.slice(this.ivLength);

    const decryptedData: number[] = [];
    for (let i = 0; i < encryptedData.length; i += this.blockSize) {
      const block = encryptedData.slice(i, i + this.blockSize);
      const decryptedBlock = this.decryptBlock(block, key);
      decryptedData.push(...decryptedBlock);
    }

    const unpaddedData = this.unpadData(decryptedData);
    return this.byteArrayToString(unpaddedData);
  }
}

export const dynamicEncryptor = new DynamicEncryptor();
