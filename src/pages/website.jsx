import React from "react";
import Home from "./home/home";
import Actuality from "./actuality/actuality";
import Banque from "./establishment/banque/banque";
import Etablissement from "./establishment/establissement/etablissement";
import Hotel from "./establishment/hotel/hotel";

const Website = () => {
  return (
    <div className="flex flex-col gap-10">
      <section id="home"><Home /></section>
      <section id="actuality"><Actuality /></section>
      <section id="banque"><Banque/></section>
      <section id="etablissement"><Etablissement/></section>
      <section id="hotel"><Hotel/></section>
    </div>
  );
};

export default Website;
