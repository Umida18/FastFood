import {
  Map,
  YMaps,
  Placemark,
  ZoomControl,
  TypeSelector,
  RouteButton,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import React from "react";

export const Xarita = () => {
  return (
    <div className=" bg-[#edeff3] h-[100vh]">
      <div
        className="w-full h-[60px] bg-white border-x-4 border-x-[#edeff3]"
        style={{
          display: "flex",
          justifyContent: "start",
          gap: 3,
          margin: "0",
          padding: "0",
        }}
      ></div>
      <YMaps>
        <Map
          defaultState={{ center: [41.327169, 69.282666], zoom: 13 }}
          className="w-[1050px] h-[550px] m-10 border-solid border-8 border-white mb-10"
        >
          <ZoomControl options={{ position: { right: 15, top: 15 } }} />
          {/* <TypeSelector options={{ float: "left" }} /> */}

          <Placemark
            // onChange={() => {
            //   console.log("shaxriston");
            // }}
            geometry={[41.353122, 69.289043]}
            properties={{
              balloonContentHeader: "Оператор: Иван Иванов",
              balloonContentBody: "Телефон: +998 90 123 45 67",
            }}
          />
          {/* shaxriston */}
          <Placemark
            onChange={() => {
              console.log("xamid olimjon");
            }}
            geometry={[41.318295, 69.294966]}
          />
          {/* xamid olimjon */}
          <Placemark
            onChange={() => {
              console.log("tinchlik");
            }}
            geometry={[41.333155, 69.219448]}
          />
          {/* tinchlik */}
          <Placemark
            onChange={() => {
              console.log("alisher navoiy");
            }}
            geometry={[41.319601, 69.254077]}
          />
          {/* alisher navoiy */}
          <Placemark
            onChange={() => {
              console.log("ming orik");
            }}
            geometry={[41.299734, 69.273612]}
          />
          {/* ming orik */}
        </Map>
      </YMaps>
    </div>
  );
};
