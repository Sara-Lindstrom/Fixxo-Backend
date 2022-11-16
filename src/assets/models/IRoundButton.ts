export default interface IRoundButton {
    link: string;
    image?:string;
    onClickEvent?:()=>void;
    notificationNumber?: number;
    cart?:boolean;
}