export default interface Campaign {
    id: string,
    name: string,
    keywords: string[],
    bidAmount: number,
    fund: number,
    status: string,
    town: string,
    radius: number
}