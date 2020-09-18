export interface ExportProduct {
    pallerID: string,
    productID: string,
    productName: string,
    quantity: number
}

export interface ListOfProduct extends Array<{ExportProduct}> {}