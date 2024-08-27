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
      <YMaps
        query={{
          ns: "use-load-option",
          load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
        }}
      >
        <Map
          defaultState={{ center: [41.327169, 69.282666], zoom: 13 }}
          className="w-[1050px] h-[550px] m-10 border-solid border-8 border-white mb-10"
        >
          <ZoomControl options={{ position: { right: 15, top: 15 } }} />
          {/* <TypeSelector options={{ float: "left" }} /> */}

          <Placemark
            geometry={[41.353122, 69.289043]}
            properties={{
              balloonContentHeader: "Operator: Nazarova Munisa",
              balloonContentBody: "Telefon: +998 90 123 45 67",
            }}
          />
          {/* shaxriston */}
          <Placemark
            geometry={[41.318295, 69.294966]}
            properties={{
              balloonContentHeader: "Operator: Hamidova Saida",
              balloonContentBody: "Telefon: +998 90 111 44 66",
            }}
          />
          {/* xamid olimjon */}
          <Placemark
            geometry={[41.333155, 69.219448]}
            properties={{
              balloonContentHeader: "Operator: Karimova Nigora",
              balloonContentBody: "Telefon: +998 90 333 55 77",
            }}
          />
          {/* tinchlik */}
          <Placemark
            geometry={[41.319601, 69.254077]}
            properties={{
              balloonContentHeader: "Operator: Sadriddinov Farrux",
              balloonContentBody: "Telefon: +998 90 222 11 55",
            }}
          />
          {/* alisher navoiy */}
          <Placemark
            geometry={[41.299734, 69.273612]}
            properties={{
              balloonContentHeader: "Operator: Suvonov Mansur",
              balloonContentBody: "Telefon: +998 90 333 44 55",
            }}
          />
          {/* ming orik */}
        </Map>
      </YMaps>
    </div>
  );
};
