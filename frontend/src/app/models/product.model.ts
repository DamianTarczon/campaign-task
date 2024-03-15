import Campaign from "./campaign.model";

export default interface Product {
    id: string,
    name: string,
    image: string,
    price: number,
    campaign?: Campaign
}