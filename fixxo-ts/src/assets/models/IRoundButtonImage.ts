export default interface IRoundButtonImage {
    link: string;
    image?:string;
    onClickEvent?:()=>void;
    notificationNumber?: number;
    cart?:boolean;
}