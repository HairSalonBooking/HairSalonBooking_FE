export interface IService {
    id: number;
    name: string;
    descriptionMarkdown: string;
    descriptionHTML: string;
    image: IServiceImage;
    priceId: string;
    createdAt: string;
    updatedAt: string;
}

interface   IServiceImage {
    type: string;
    data: number[];
}