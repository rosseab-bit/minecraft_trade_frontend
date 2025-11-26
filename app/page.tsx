"use client";
import { truncate } from "fs";
import { useEffect, useState } from "react";
const data_spanish: Record<string, string> = {
  anvil: "yunque",
  beetroot: "remolacha",
  blast_furnace: "alto horno",
  bread: "pan",
  cake: "torta",
  carrot: "zanahoria",
  cartography_table: "mesa de cartografía",
  coal: "carbón",
  cocoa_beans: "granos de cacao",
  cooked_beef: "carne de res cocida",
  cooked_chicken: "pollo cocido",
  cooked_cod: "bacalao cocido",
  cooked_mutton: "cordero cocido",
  cooked_porkchop: "chuleta de cerdo cocida",
  cooked_rabbit: "conejo cocido",
  cooked_salmon: "salmón cocido",
  cookie: "galleta",
  copper_ingot: "lingote de cobre",
  crafting_table: "mesa de trabajo",
  diamond: "diamante",
  emerald: "esmeralda",
  enchanting_table: "mesa de encantamientos",
  fletching_table: "mesa de flechas",
  furnace: "horno",
  gold_ingot: "lingote de oro",
  grindstone: "esmeril",
  iron_ingot: "lingote de hierro",
  lapis: "lapislázuli",
  melon_slice: "rodaja de melón",
  mushroom_stew: "estofado de champiñones",
  netherite_scrap: "fragmento de netherita",
  potato: "papa",
  pumpkin: "calabaza",
  pumpkin_pie: "pastel de calabaza",
  rabbit_stew: "estofado de conejo",
  raw_beef: "carne de res cruda",
  raw_chicken: "pollo crudo",
  raw_cod: "bacalao crudo",
  raw_mutton: "cordero crudo",
  raw_porkchop: "chuleta de cerdo cruda",
  raw_rabbit: "conejo crudo",
  raw_salmon: "salmón crudo",
  redstone_dust: "polvo de redstone",
  smithing_table: "mesa de herrería",
  smoker: "ahumador",
  stonecutter: "cortapiedras",
  sugar_cane: "caña de azúcar",
  wheat: "trigo",
};
interface DataRes {
    source_item: string,
    target_item: string,
    source_amount: number,
    result_amount: number,
    diamond_equivalent: number
}

export default function Home() {
  const [dataTrade, setDataTrade] = useState<string[]>([]);
  const [countItem, setCountItem] = useState<number>();
  const [tengo, setTengo] = useState<string>('');
  const [quiero, setQuiero] = useState<string>('');
  const [dataConvert, setDataConvert] = useState<DataRes |null>(null);
  const getItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setDataTrade(data);
  };
  const convertPost = async () => {
    let body_res = {
        source: tengo,
        target: quiero,
        amount: countItem,
      }
    const res = await fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body_res),
    });
    const data = await res.json();
    setDataConvert(data);
  }
  const handleCount = (e:any) => {
    setCountItem(e);
  }
  const handleTengo = (e:any) => {
    setTengo(e);
  }
  const handleQuiero = (e:any) => {
    setQuiero(e)
  }
  const handleConvert = () => {
    if(!countItem) return
    convertPost();
  }
  const disabledButton = () => {
    if (tengo.length > 0 && quiero.length > 0 && countItem) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="container-trade">
      <section className="section-title">
      <h1>Trade Minecraft</h1>
      </section>
      {dataTrade.length === 0 ? (
        <span>Loading...</span>
      ) : (
        <div className="form-trade">
          <span className="label-trade-tengo">Tengo</span>
          <select
            className="select-style"
            name="select"
            defaultValue="selecciona"
            onChange={(e) => handleTengo(e.target.value)}
          >
            <option className="option-style" value="selecciona">
              Selecciona
              </option>
            {dataTrade.map((item: string, index: number) => (
              <option className="option-style" key={index} value={item}>
                {data_spanish[item]}
              </option>
            ))}
          </select>
          <input className="input-count" type="number" value={countItem} placeholder="Cantidad que tengo" onChange={(e) => handleCount(e.target.value)}/>
          <span className="label-trade-tengo">Quiero</span>
          <select
            className="select-style"
            name="select"
            defaultValue="selecciona"
            onChange={(e) => handleQuiero(e.target.value)}
          >
             <option className="option-style" value="selecciona">
              Selecciona
              </option>
            {dataTrade.map((item: string, index: number) => (
              <option key={index} value={item}>
                {data_spanish[item]}
              </option>
            ))}
          </select>
          <button className={`${!disabledButton() ? 'button-style-disabled' : 'button-style' }`} onClick={handleConvert}>Calcular</button>
          {dataConvert &&
          <div className="result-trade">
            <span className="detail-convert">Con {dataConvert?.source_amount} de {data_spanish[tengo]}</span>
            <section className="line-solid"></section>
            <span className="detail-convert">Obtienes {dataConvert?.result_amount} de {data_spanish[quiero]}</span>
            <section className="line-solid"></section>
            <span className="detail-convert">Equivalente en diamante 💎 {dataConvert?.diamond_equivalent}</span>
          </div>}
        </div>
      )}
    </div>
  );
}
