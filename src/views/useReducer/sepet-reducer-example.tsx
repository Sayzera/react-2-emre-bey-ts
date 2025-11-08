import { useReducer } from "react";
import { productsData } from "@/views/useReducer/products-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsBasket } from "react-icons/bs";
import { Input } from "@/components/ui/input";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  created_at: string;
};

type State = {
  products: Product[];
  basket: (Product & {
    count: number;
  })[];
};

type Action = {
  type: "add_product" | "delete_product" | "update_product";
  payload: {
    id: number;
  };
};

/**
* TODO: Ürünlerin eğer count 1 ise direk arrayden kaldıralım ama count 1 den fazla ise önce countu eksiltelim sonrasında ürünü kaldıralım 
* 
* TODO: tüm ürünlerin count toplamını sepette gösterelim eksiliş ve artılarıda aynı zamanda sepete yansıtalım 
 */

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add_product": {
      //   const selectedProduct = state.products.find(
      //     (product) => product.id === action.payload.id
      //   );

      //   const existingProduct = state.basket.find(
      //     (basketProduct) => basketProduct.id === action.payload.id
      //   );

      //   if (!existingProduct) {
      //     if (selectedProduct) {
      //       state.basket = [...state.basket, { ...selectedProduct, count: 1 }];
      //     }
      //   }

      //   if (existingProduct) {

      //     const productId = existingProduct.id;
      //     const productCount = existingProduct.count;
      //     const productIndex = state.basket.findIndex(
      //       (product) => product.id === productId
      //     );

      //     state.basket[productIndex] = {
      //       ...state.basket[productIndex],
      //       count: productCount + 1,
      //     };
      //   }

      //   console.log(state.basket, 'basket')

      const selectedProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!selectedProduct) return state;

      // bu urun daha önce eklenmiş mi

      const existingProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );

      let updateBasket;

      if (existingProduct) {
        // sadece değerini yani countu 1 arttır
        updateBasket = state.basket.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                count: (product.count || 0) + 1,
              }
            : product
        );
      } else {
        updateBasket = [...state.basket, { ...selectedProduct, count: 1 }];
      }

      console.log(updateBasket, "updateBasket")
      return {
        ...state,
        basket: updateBasket,
      };
    }

    default:
      return state;
  }
}

const initialState = {
  products: productsData,
  basket: [],
};

const SeperReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addProduct = (id: number) => {
    dispatch({
      type: "add_product",
      payload: {
        id,
      },
    });
  };

  return (
    <div className="w-[80%] m-auto mt-10">
      <div className="flex justify-end mb-5 space-x-2 items-center ">
        <BsBasket className="w-5 h-5 shrink-0" /> <span>(5)</span>
      </div>

      {state.products.map((product) => (
        <Card key={product.id} className="my-5 ">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a
              ut, debitis velit tenetur nam! Corrupti, ea earum! Ab natus neque
              possimus tempora quaerat maxime, exercitationem perferendis sit
              harum incidunt.
            </CardDescription>
            <CardAction>
              <Button variant={"destructive"}>Sil</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quod repellendus doloremque dicta nam laudantium nobis ipsum
              repellat labore enim.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant={"outline"}
              onClick={() => {
                addProduct(product.id);
              }}
            >
              Sepete Ekle
            </Button>
           <div className="w-[20%]">
             <Input placeholder="Product count" />
           </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SeperReducerExample;
