import { Map, YMaps, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from "react";
import { Branch } from "./filiallar/filiallar";
import axios from "axios";

export const Xarita = () => {
  const [data, setData] = useState<Branch[]>([]);
  useEffect(() => {
    const initialData = async () => {
      try {
        const response = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/filial"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    initialData();
  }, []);
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
          // ns: "use-load-option",
          load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
        }}
      >
        <Map
          defaultState={{ center: [41.327169, 69.282666], zoom: 13 }}
          className="w-[1050px] h-[550px] m-10 border-solid border-8 border-white mb-10"
        >
          <ZoomControl options={{ position: { right: 15, top: 15 } }} />
          {/* <TypeSelector options={{ float: "left" }} /> */}
          <div>
            {" "}
            {data.map((item: Branch) => {
              return (
                <Placemark
                  geometry={item.geometry}
                  properties={{
                    balloonContentHeader: `Operator:${item.operator}`,
                    balloonContentBody: `Telefon: ${item.telefon}`,
                  }}
                />
              );
            })}
          </div>
        </Map>
      </YMaps>
    </div>
  );
};
