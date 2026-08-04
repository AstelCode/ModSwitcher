export interface ExternalIdArgs {
  id?: string;
  externalId: string;
  externalType: string;
  url?: string;
}
export interface ExternalIdPersistence {
  externalId: string;
  externalType: string;
  url?: string;
}
export interface ExternalIdJson {
  id: string;
  externalId: string;
  externalType: string;
  url?: string;
}

export class ExternalId {
  id?: string;
  externalId: string;
  externalType: string;
  url?: string;
  constructor(args: ExternalIdArgs) {
    this.id = args.id;
    this.externalId = args.externalId;
    this.externalType = args.externalType;
    this.url = args.url;
  }
  toPersistence(): ExternalIdPersistence {
    if (!this.externalId) throw new Error("ExternalId must have an externalId");
    if (!this.externalType)
      throw new Error("ExternalId must have an externalType");
    return {
      externalId: this.externalId,
      externalType: this.externalType,
      url: this.url,
    };
  }
  toJson(): ExternalIdJson {
    if (!this.id) throw new Error("ExternalId must have an id");
    if (!this.externalId) throw new Error("ExternalId must have an externalId");
    if (!this.externalType)
      throw new Error("ExternalId must have an externalType");
    return {
      id: this.id,
      externalId: this.externalId,
      externalType: this.externalType,
      url: this.url,
    };
  }
}
