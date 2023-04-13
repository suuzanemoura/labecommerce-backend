export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
  }

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    total_price: number
    created_at: string,
    isPaid: number
}

export type TPurchaseIsPaid = {
    id: string,
    buyer: string,
    total_price: number
    created_at: string,
    isPaid: boolean
}

export type TFilteredPurchase = {
    purchaseId: string,
    buyerId: string,
    buyerName: string,
    buyerEmail: string,
    totalPrice: number,
    createdAt: string,
    isPaid: number
}

export type TQuantityInProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string,
    quantity: number
}

export type TProductsInPurchase = {
    purchaseId: string,
    buyerId: string,
    buyerName: string,
    buyerEmail: string,
    totalPrice: number,
    createdAt: string,
    isPaid: boolean,
    products: TQuantityInProduct[]
}