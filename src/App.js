import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [showModal,setShowModal]=useState(false);

  const showModalHandler=()=>{
    setShowModal(true);
  }

  const removeModalHandler=()=>{
    setShowModal(false);
  }
  return (
    <CartProvider>
      {showModal && <Cart onRemove={removeModalHandler} />}
      <Header onShow={showModalHandler} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
