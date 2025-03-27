import { useMutation } from "@tanstack/react-query";



export function useAddProduct(){
    return  useMutation(
        {
            mutationKey: ["products"],
            mutationFn: (newProduct:{title: number , price: number ,description:string,category:string,image:string})=>
                fetch("https://fakestoreapi.com/products", {
                    method:"POST",
                    body: JSON.stringify(newProduct)
                })
                .then((res)=> res.json())
        }
    )
}