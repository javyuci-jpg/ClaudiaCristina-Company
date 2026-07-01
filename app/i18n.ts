// src/i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enBiografia from "../src/locales/en/biografia.json";
import esBiografia from "../src/locales/es/biografia.json";
import frBiografia from "../src/locales/fr/biografia.json";

import enHome from "../src/locales/en/home.json";
import esHome from "../src/locales/es/home.json";
import frHome from "../src/locales/fr/home.json";

import enServicios from "../src/locales/en/servicios.json";
import esServicios from "../src/locales/es/servicios.json";
import frServicios from "../src/locales/fr/servicios.json";

import enCommon from "../src/locales/en/common.json";
import esCommon from "../src/locales/es/common.json";
import frCommon from "../src/locales/fr/common.json";

import enHeader from "../src/locales/en/header.json";
import esHeader from "../src/locales/es/header.json";
import frHeader from "../src/locales/fr/header.json";

import enCotizar from "../src/locales/en/cotizar.json";
import esCotizar from "../src/locales/es/cotizar.json";
import frCotizar from "../src/locales/fr/cotizar.json";

import enHero from "../src/locales/en/hero.json";
import esHero from "../src/locales/es/hero.json";
import frHero from "../src/locales/fr/hero.json";

import enFooter from "../src/locales/en/footer.json";
import esFooter from "../src/locales/es/footer.json";
import frFooter from "../src/locales/fr/footer.json";

import enCallToAction from "../src/locales/en/CallToAction.json";
import esCallToAction from "../src/locales/es/CallToAction.json";
import frCallToAction from "../src/locales/fr/CallToAction.json";

import enAbout from "../src/locales/en/About.json";
import esAbout from "../src/locales/es/About.json";
import frAbout from "../src/locales/fr/About.json";

import enFaq from "../src/locales/en/faq.json";
import esFaq from "../src/locales/es/faq.json";
import frFaq from "../src/locales/fr/faq.json";


i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "es", "fr"],
  defaultNS: "common",
  ns: ["common", "home", "biografia", "servicios", "header","cotizar", "hero", "footer", "callToAction",  "about", "faq"],
  interpolation: { escapeValue: false },
  resources: {
    en: { common: enCommon, home: enHome, biografia: enBiografia, servicios: enServicios, header: enHeader, cotizar: enCotizar, hero: enHero, footer: enFooter, callToAction: enCallToAction, about: enAbout, faq: enFaq},
    es: { common: esCommon, home: esHome, biografia: esBiografia, servicios: esServicios, header: esHeader, cotizar: esCotizar, hero: esHero, footer: esFooter, callToAction: esCallToAction, about: esAbout, faq: esFaq},
    fr: { common: frCommon, home: frHome, biografia: frBiografia, servicios: frServicios, header: frHeader, cotizar: frCotizar, hero: frHero, footer: frFooter, callToAction: frCallToAction, about:frAbout, faq: frFaq},
  },
});

export default i18n;
