export interface IPlan {
    _id:string;
    name: string;
    price: string;
    slots:number
    features: string[];
    isSoldOut: boolean;
    buttonText: string;
    className: string;
}

export interface IPurchase{
    _id:string,
    plan:{
        name:string,
    },
    city:{
        name:string
    },
    updatedAt:Date
    expireAt:Date,
    
}