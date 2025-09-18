// import React, { useState } from "react";
// import BuyActionWindow from "./BuyActionWindow";
// import SellActionWindow from "./SellActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid) => {},
//   closeBuyWindow: () => {},
//   openSellWindow: (uid) => {},
//   closeSellWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");
//   const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
//   const [selectedSellUID, setSelectedSellUID] = useState("");


//   const handleOpenBuyWindow = (uid) => {
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   const handleOpenSellWindow = (uid) => {
//   setIsSellWindowOpen(true);
//   setSelectedSellUID(uid);
// };

// const handleCloseSellWindow = () => {
//   setIsSellWindowOpen(false);
//   setSelectedSellUID("");
// };


//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//         openSellWindow: handleOpenSellWindow,
//         closeSellWindow: handleCloseSellWindow,
//       }}
//     >
//       {props.children}
//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
//       {isSellWindowOpen && <SellActionWindow uid={selectedSellUID} />}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;


import React, { useState } from "react";
import OrderWindow from "./OrderWindow";

const GeneralContext = React.createContext({
  openOrderWindow: (mode, uid) => {},
  closeOrderWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isOrderWindowOpen, setIsOrderWindowOpen] = useState(false);
  const [orderData, setOrderData] = useState({ mode: "", uid: "" });

  const openOrderWindow = (mode, uid) => {
    setOrderData({ mode, uid });
    setIsOrderWindowOpen(true);
  };

  const closeOrderWindow = () => {
    setOrderData({ mode: "", uid: "" });
    setIsOrderWindowOpen(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        openOrderWindow,
        closeOrderWindow,
      }}
    >
      {props.children}
      {isOrderWindowOpen && (
        <OrderWindow
          mode={orderData.mode}
          uid={orderData.uid}
          onClose={closeOrderWindow}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
