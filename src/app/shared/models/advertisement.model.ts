export class Advertisement {
  constructor(
    public category: string,
    public description: string,
    public imageLink: string,
    public relevance: number,
    public type: string
  ) {}
}


export const AdvertisementKind = {
  SPEND: 'SPEND',
  INVEST: 'INVEST',
}

export const AdvertisementType = {
  PREVIEW: 'PREVIEW',
  FULL: 'FULL',
}
