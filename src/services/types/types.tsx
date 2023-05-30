export type Tingredient = {
  "_id": string,
  "name":string,
  "type":string,
  "proteins":number,
  "fat":number,
  "carbohydrates":number,
  "calories":number,
  "price":number,
  "image":string,
}

export type TingredientAndUnicID = Tingredient & {
  unicID: string;
  index?:number
}; 

export type TTextString = {
  ingredients?:string
}




