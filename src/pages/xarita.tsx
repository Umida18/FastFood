import { Map, YMaps, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { setXarita } from "../store/slices/xaritaSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Hodimlar } from "./hodimlar";
import { Branch, Hodimlarr } from "../type/type";
export const Xarita = () => {
  const [hodimlar, setHodimlar] = useState<Hodimlarr[]>([]);

  const xarita = useSelector((state: RootState) => state.xarita.xarita);
  const dispatch = useDispatch();
  useEffect(() => {
    const initialData = async () => {
      try {
        const response = await axios.get(
          "https://3c2999041095f9d9.mokky.dev/filial"
        );
        const responseHodimlar = await axios.get(
          "https://10d4bfbc5e3cc2dc.mokky.dev/Hodimlar"
        );

        setHodimlar(responseHodimlar.data);
        dispatch(setXarita(response.data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    initialData();
  }, []);

  const operator = (operatorid: number) => {
    const branch = hodimlar.find((branch) => operatorid == branch.id);
    return branch ? branch.fistN + " " + branch.lastN : "topilmadi";
  };
  const operatornumber = (operatorid: number) => {
    const branch = hodimlar.find((branch) => operatorid == branch.id);
    return branch ? branch.phone : "topilmadi";
  };

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
          load: "Map,Placemark,control.ZoomControl,geoObject.addon.balloon",
        }}
      >
        <Map
          defaultState={{ center: [41.327169, 69.282666], zoom: 13 }}
          className="w-[1250px] h-[650px] m-10 border-solid border-8 border-white mb-10"
        >
          <ZoomControl options={{ position: { right: 15, top: 15 } }} />
          {xarita.map((item: Branch) => {
            return (
              <Placemark
                geometry={item.geometry}
                properties={{
                  balloonContentHeader: `Operator:${operator(item.operatorId)}`,
                  balloonContentBody: `Telefon: ${operatornumber(
                    item.operatorId
                  )}`,
                }}
              />
            );
          })}
        </Map>
      </YMaps>
    </div>
  );
};
