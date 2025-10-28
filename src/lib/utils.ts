// src/lib/serialize.ts
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  