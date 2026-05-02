import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  CalendarDays,
  MapPin,
  Sparkles,
  Camera,
  Gift,
  Hotel,
  HelpCircle,
  Mail,
  Users,
  Bus,
  Home,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WEDDING = {
  // 👉 Edita aquí (solo una vez)
  couple: {
    a: "Leticia",
    b: "Nacho",
  },
  // Recomendado: incluye hora, p.ej. "2026-11-21T17:30:00"
  dateISO: "2026-11-21",
  city: "Santander",
  venue: "Huerta de Cubas",
  address: "[Dirección completa]",
  websiteUrl: "https://[tu-dominio].com",
};

const i18n = {
  es: {
    langName: "ES",
    nav: {
      details: "Detalles",
      schedule: "Horarios",
      gallery: "Fotos",
      travel: "Viaje",
      gifts: "Regalo",
      faq: "FAQ",
      rsvp: "Confirmación",
    },
    heroTag: "¡Nos casamos!",
    heroSubtitle: "Nos encantaría que nos acompañaras en nuestro gran día",
    quick: {
      date: "Fecha",
      place: "Lugar",
      celebration: "Celebración",
    },
    blocks: {
      dateValue: "[Sábado, 21 de noviembre de 2026]",
      placeValue: "Huerta de Cubas (Santander)",
      celebrationValue: "Ceremonia + celebración",
    },
    cta: {
      rsvp: "Confirmar asistencia",
      map: "Ver ubicación",
      calendar: "Añadir al calendario",
    },
    section: {
      detailsTitle: "Detalles del día",
      detailsText:
        "Hemos preparado este espacio para compartir contigo toda la información importante. Iremos actualizando horarios, recomendaciones y cualquier novedad.",
      scheduleTitle: "Horarios",
      galleryTitle: "Fotos",
      travelTitle: "Viaje y alojamiento",
      giftsTitle: "Regalo",
      faqTitle: "Preguntas frecuentes",
      rsvpTitle: "Confirmación de asistencia",
    },
    details: {
      where: "Dirección",
      city: "Ciudad",
    },
    schedule: [
      { time: "17:30", title: "Ceremonia", desc: "[Lugar ceremonia]" },
      { time: "19:00", title: "Cóctel", desc: "[Zona cóctel]" },
      { time: "20:30", title: "Cena", desc: "[Salón / exterior]" },
      { time: "23:30", title: "Fiesta", desc: "[Barra libre / DJ]" },
    ],
    gallery: {
      hint: "Añade aquí 6–12 fotos vuestras (o un carrusel).",
    },
    travel: {
      hotel: "Hoteles recomendados",
      transport: "Cómo llegar",
      notes: "Consejos",
      hotelText: "[Lista de hoteles con enlace y código si aplica]",
      transportText: "[Parking, taxis, autobuses, horarios, etc.]",
      notesText: "[Recomendaciones de la zona / qué hacer]",
    },
    gifts: {
      text:
        "Lo más importante es contar con vosotros. Si aun así queréis tener un detalle, podéis hacerlo aquí:",
      label: "[IBAN / Bizum / Lista de bodas]",
      copy: "Copiar",
    },
    faq: [
      {
        q: "¿Puedo llevar acompañante?",
        a: "[Indica cómo gestionar acompañantes en la confirmación]",
      },
      {
        q: "¿Hay opciones para alergias/intolerancias?",
        a: "Sí, indícalo en la confirmación y lo tendremos en cuenta.",
      },
      {
        q: "¿Habrá autobús?",
        a: "[Indica horarios/recorridos si aplica]",
      },
    ],
    rsvp: {
      fullName: "Nombre y apellidos",
      attending: "¿Vas a venir?",
      attendingYes: "Sí",
      attendingNo: "No",
      companions: "¿Con quién vienes acompañado/a?",
      intolerances: "Intolerancias / alergias alimentarias",
      bus: "¿Necesitarás autobús?",
      busYes: "Sí",
      busNo: "No",
      address: "Dirección",
      message: "Notas (opcional)",
      send: "Enviar confirmación",
      sentTitle: "¡Gracias!",
      sentText:
        "Tu respuesta se ha guardado en esta página (demo). Si quieres que quede registrada de forma real (Excel/SharePoint + notificación), se puede conectar a un formulario o a Power Automate.",
      export: "Descargar invitación (.ics)",
      mailto: "Enviar por email",
      edit: "Editar",
    },
    footer: "Con cariño",
  },
  en: {
    langName: "EN",
    nav: {
      details: "Details",
      schedule: "Schedule",
      gallery: "Photos",
      travel: "Travel",
      gifts: "Gift",
      faq: "FAQ",
      rsvp: "RSVP",
    },
    heroTag: "We’re getting married!",
    heroSubtitle: "We’d love you to join us on our special day",
    quick: {
      date: "Date",
      place: "Venue",
      celebration: "Celebration",
    },
    blocks: {
      dateValue: "[Saturday, 21 November 2026]",
      placeValue: "Huerta de Cubas (Santander)",
      celebrationValue: "Ceremony + celebration",
    },
    cta: {
      rsvp: "RSVP",
      map: "Open map",
      calendar: "Add to calendar",
    },
    section: {
      detailsTitle: "Day details",
      detailsText:
        "We created this space to share everything you need to know. We’ll keep updating times, tips, and any last-minute changes.",
      scheduleTitle: "Schedule",
      galleryTitle: "Photos",
      travelTitle: "Travel & stay",
      giftsTitle: "Gift",
      faqTitle: "Frequently asked questions",
      rsvpTitle: "RSVP",
    },
    details: {
      where: "Address",
      city: "City",
    },
    schedule: [
      { time: "5:30 PM", title: "Ceremony", desc: "[Ceremony location]" },
      { time: "7:00 PM", title: "Cocktail", desc: "[Cocktail area]" },
      { time: "8:30 PM", title: "Dinner", desc: "[Dining area]" },
      { time: "11:30 PM", title: "Party", desc: "[Open bar / DJ]" },
    ],
    gallery: {
      hint: "Add 6–12 photos (or a carousel).",
    },
    travel: {
      hotel: "Recommended hotels",
      transport: "How to get there",
      notes: "Tips",
      hotelText: "[Hotel list with links / discount code if any]",
      transportText: "[Parking, taxis, shuttle, etc.]",
      notesText: "[Local recommendations / things to do]",
    },
    gifts: {
      text:
        "Your presence is the best gift. If you’d still like to contribute, you can do so here:",
      label: "[IBAN / Bizum / registry]",
      copy: "Copy",
    },
    faq: [
      {
        q: "Can I bring a plus one?",
        a: "[Explain how to handle companions in the RSVP]",
      },
      {
        q: "Food allergies/intolerances?",
        a: "Yes—please note them in the RSVP form.",
      },
      {
        q: "Will there be a bus?",
        a: "[Provide shuttle info if applicable]",
      },
    ],
    rsvp: {
      fullName: "Full name",
      attending: "Will you attend?",
      attendingYes: "Yes",
      attendingNo: "No",
      companions: "Who are you coming with?",
      intolerances: "Food allergies / intolerances",
      bus: "Will you need the bus?",
      busYes: "Yes",
      busNo: "No",
      address: "Address",
      message: "Notes (optional)",
      send: "Submit RSVP",
      sentTitle: "Thank you!",
      sentText:
        "Your RSVP is saved on this page (demo). For real collection (Excel/SharePoint + notification), it can be connected to a form or Power Automate.",
      export: "Download invite (.ics)",
      mailto: "Send by email",
      edit: "Edit",
    },
    footer: "With love",
  },
  pt: {
    langName: "PT",
    nav: {
      details: "Detalhes",
      schedule: "Horários",
      gallery: "Fotos",
      travel: "Viagem",
      gifts: "Presente",
      faq: "FAQ",
      rsvp: "Confirmação",
    },
    heroTag: "Vamos casar!",
    heroSubtitle: "Adoraríamos que estivesses connosco no nosso grande dia",
    quick: {
      date: "Data",
      place: "Local",
      celebration: "Celebração",
    },
    blocks: {
      dateValue: "[Sábado, 21 de novembro de 2026]",
      placeValue: "Huerta de Cubas (Santander)",
      celebrationValue: "Cerimónia + celebração",
    },
    cta: {
      rsvp: "Confirmar presença",
      map: "Ver mapa",
      calendar: "Adicionar ao calendário",
    },
    section: {
      detailsTitle: "Detalhes do dia",
      detailsText:
        "Criámos este espaço para partilhar contigo toda a informação importante. Vamos atualizando horários, dicas e novidades.",
      scheduleTitle: "Horários",
      galleryTitle: "Fotos",
      travelTitle: "Viagem e alojamento",
      giftsTitle: "Presente",
      faqTitle: "Perguntas frequentes",
      rsvpTitle: "Confirmação de presença",
    },
    details: {
      where: "Morada",
      city: "Cidade",
    },
    schedule: [
      { time: "17:30", title: "Cerimónia", desc: "[Local da cerimónia]" },
      { time: "19:00", title: "Cocktail", desc: "[Zona do cocktail]" },
      { time: "20:30", title: "Jantar", desc: "[Sala / exterior]" },
      { time: "23:30", title: "Festa", desc: "[Bar aberto / DJ]" },
    ],
    gallery: {
      hint: "Adiciona 6–12 fotos (ou um carrossel).",
    },
    travel: {
      hotel: "Hotéis recomendados",
      transport: "Como chegar",
      notes: "Dicas",
      hotelText: "[Lista de hotéis com links / código de desconto]",
      transportText: "[Estacionamento, táxis, shuttle, etc.]",
      notesText: "[Dicas da zona / o que fazer]",
    },
    gifts: {
      text:
        "O mais importante é a tua presença. Se ainda assim quiseres oferecer algo, podes fazê-lo aqui:",
      label: "[IBAN / MB Way / lista]",
      copy: "Copiar",
    },
    faq: [
      {
        q: "Posso levar acompanhante?",
        a: "[Explica como indicar acompanhantes na confirmação]",
      },
      {
        q: "Há opções para alergias/intolerâncias?",
        a: "Sim—indica na confirmação e teremos isso em conta.",
      },
      {
        q: "Vai haver autocarro?",
        a: "[Partilha info do shuttle se aplicável]",
      },
    ],
    rsvp: {
      fullName: "Nome completo",
      attending: "Vais estar presente?",
      attendingYes: "Sim",
      attendingNo: "Não",
      companions: "Com quem vens acompanhado/a?",
      intolerances: "Alergias / intolerâncias alimentares",
      bus: "Vais precisar de autocarro?",
      busYes: "Sim",
      busNo: "Não",
      address: "Morada",
      message: "Notas (opcional)",
      send: "Enviar confirmação",
      sentTitle: "Obrigado!",
      sentText:
        "A tua resposta ficou guardada nesta página (demo). Para recolha real (Excel/SharePoint + notificação), pode ligar-se a um formulário ou Power Automate.",
      export: "Descarregar convite (.ics)",
      mailto: "Enviar por email",
      edit: "Editar",
    },
    footer: "Com carinho",
  },
};

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toICSDate(dt) {
  const y = dt.getUTCFullYear();
  const m = pad2(dt.getUTCMonth() + 1);
  const d = pad2(dt.getUTCDate());
  const hh = pad2(dt.getUTCHours());
  const mm = pad2(dt.getUTCMinutes());
  const ss = pad2(dt.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

function downloadTextFile(filename, content, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildICS() {
  const start = new Date(
    WEDDING.dateISO.includes("T") ? WEDDING.dateISO : `${WEDDING.dateISO}T12:00:00`
  );
  // Sin endISO: usamos una duración razonable (8h) solo para el .ics
  const end = new Date(start.getTime() + 8 * 60 * 60 * 1000);
  const uid = `${start.getTime()}-${Math.random().toString(16).slice(2)}@wedding`;
  const title = `${WEDDING.couple.a} & ${WEDDING.couple.b} — Wedding`;
  const location = `${WEDDING.venue}, ${WEDDING.address}, ${WEDDING.city}`;
  const description = `Wedding details: ${WEDDING.websiteUrl}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//Invite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function Section({ id, icon: Icon, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shadow-sm">
          <Icon className="w-5 h-5 text-rose-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600">
      {children}
    </span>
  );
}

function YesNo({ value, onChange, yesLabel, noLabel }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("yes")}
        className={`px-4 py-2 rounded-xl border text-sm transition ${
          value === "yes"
            ? "bg-rose-100 border-rose-200 text-rose-700"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("no")}
        className={`px-4 py-2 rounded-xl border text-sm transition ${
          value === "no"
            ? "bg-rose-100 border-rose-200 text-rose-700"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {noLabel}
      </button>
    </div>
  );
}

export default function WeddingPage() {
  const [lang, setLang] = useState("es");
  const t = i18n[lang] ?? i18n.es;

  const mapUrl = useMemo(() => {
    const q = encodeURIComponent(`${WEDDING.venue} ${WEDDING.address} ${WEDDING.city}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }, []);

  const [rsvp, setRsvp] = useState({
    fullName: "",
    attending: "yes",
    companions: "",
    intolerances: "",
    bus: "no",
    address: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const giftText = "[IBAN / Bizum / MB Way / Lista de bodas]";

  const nav = [
    { id: "details", label: t.nav.details },
    { id: "schedule", label: t.nav.schedule },
    { id: "gallery", label: t.nav.gallery },
    { id: "travel", label: t.nav.travel },
    { id: "gifts", label: t.nav.gifts },
    { id: "faq", label: t.nav.faq },
    { id: "rsvp", label: t.nav.rsvp },
  ];

  function onNav(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  function copyToClipboard(text) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
  }

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${WEDDING.couple.a} & ${WEDDING.couple.b} — RSVP`);
    const body = encodeURIComponent(
      `RSVP\n\nFull name: ${rsvp.fullName}\nAttending: ${rsvp.attending}\nCompanions: ${rsvp.companions}\nFood intolerances: ${rsvp.intolerances}\nBus needed: ${rsvp.bus}\nAddress: ${rsvp.address}\nNotes: ${rsvp.message}\n\nWebsite: ${WEDDING.websiteUrl}`
    );
    return `mailto:?subject=${subject}&body=${body}`;
  }, [rsvp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-neutral-50 to-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNav("top")}
            className="flex items-center gap-2 text-gray-900"
            aria-label="Home"
          >
            <Heart className="w-5 h-5 text-rose-500" />
            <span className="font-semibold">
              {WEDDING.couple.a} & {WEDDING.couple.b}
            </span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden md:flex gap-2">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onNav(n.id)}
                  className="text-sm px-3 py-1 rounded-full hover:bg-rose-50 text-gray-700"
                >
                  {n.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Pill>
                <span className="opacity-70 mr-2">Lang</span>
                <button
                  onClick={() => setLang("es")}
                  className={`px-2 py-0.5 rounded-md ${
                    lang === "es"
                      ? "bg-rose-100 text-rose-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-0.5 rounded-md ${
                    lang === "en"
                      ? "bg-rose-100 text-rose-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("pt")}
                  className={`px-2 py-0.5 rounded-md ${
                    lang === "pt"
                      ? "bg-rose-100 text-rose-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  PT
                </button>
              </Pill>

              <Button className="rounded-xl" onClick={() => onNav("rsvp")}>
                {t.cta.rsvp}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div id="top" className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Hero */}
          <Card className="rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 text-rose-500">
                    <Sparkles className="w-5 h-5" />
                    <span className="tracking-widest uppercase text-sm">
                      {t.heroTag}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                    {WEDDING.couple.a} <span className="text-rose-500">&</span> {WEDDING.couple.b}
                  </h1>

                  <p className="text-lg text-gray-600">{t.heroSubtitle}</p>

                  <div className="flex flex-wrap gap-2">
                    <Pill>
                      <CalendarDays className="inline w-4 h-4 mr-1 text-rose-500" />
                      {t.blocks.dateValue}
                    </Pill>
                    <Pill>
                      <MapPin className="inline w-4 h-4 mr-1 text-rose-500" />
                      {t.blocks.placeValue}
                    </Pill>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="rounded-xl" onClick={() => onNav("rsvp")}>
                      {t.cta.rsvp}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => window.open(mapUrl, "_blank")}
                    >
                      {t.cta.map}
                    </Button>
                  </div>
                </div>

                <div className="bg-rose-50 rounded-2xl p-6 md:p-8 shadow-sm border border-rose-100 space-y-4">
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <CalendarDays className="w-5 h-5 text-rose-500" />
                    {t.section.detailsTitle}
                  </div>
                  <p className="text-sm text-gray-700">{t.section.detailsText}</p>
                  <div className="flex flex-wrap gap-2">
                    <Pill>
                      <MapPin className="inline w-4 h-4 mr-1 text-rose-500" />
                      {WEDDING.venue}
                    </Pill>
                    <Pill>
                      <Home className="inline w-4 h-4 mr-1 text-rose-500" />
                      {WEDDING.city}
                    </Pill>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => window.open(mapUrl, "_blank")}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t.cta.map}
                    </Button>
                    <Button
                      className="rounded-xl"
                      onClick={() =>
                        downloadTextFile(
                          "wedding-invite.ics",
                          buildICS(),
                          "text/calendar"
                        )
                      }
                    >
                      {t.cta.calendar}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center space-y-2">
                <CalendarDays className="mx-auto text-rose-500" />
                <h3 className="font-semibold">{t.quick.date}</h3>
                <p className="text-sm text-gray-500">{t.blocks.dateValue}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center space-y-2">
                <MapPin className="mx-auto text-rose-500" />
                <h3 className="font-semibold">{t.quick.place}</h3>
                <p className="text-sm text-gray-500">{t.blocks.placeValue}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center space-y-2">
                <Heart className="mx-auto text-rose-500" />
                <h3 className="font-semibold">{t.quick.celebration}</h3>
                <p className="text-sm text-gray-500">{t.blocks.celebrationValue}</p>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <Section id="details" icon={CalendarDays} title={t.section.detailsTitle}>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-7 md:p-8 space-y-5">
                <p className="text-gray-700">{t.section.detailsText}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="text-sm text-gray-500">{t.details.where}</div>
                    <div className="font-semibold text-gray-900 mt-1">
                      {WEDDING.venue}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{WEDDING.address}</div>
                    <Button
                      variant="outline"
                      className="rounded-xl mt-4"
                      onClick={() => window.open(mapUrl, "_blank")}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t.cta.map}
                    </Button>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">{t.details.city}</div>
                      <div className="font-semibold text-gray-900 mt-1">
                        {WEDDING.city}
                      </div>
                    </div>
                    <Button
                      className="rounded-xl"
                      onClick={() =>
                        downloadTextFile(
                          "wedding-invite.ics",
                          buildICS(),
                          "text/calendar"
                        )
                      }
                    >
                      {t.cta.calendar}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Schedule */}
          <Section id="schedule" icon={Users} title={t.section.scheduleTitle}>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-7 md:p-8">
                <div className="space-y-4">
                  {t.schedule.map((item) => (
                    <div
                      key={`${item.time}-${item.title}`}
                      className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-gray-100"
                    >
                      <div className="min-w-16 text-center">
                        <div className="text-rose-600 font-semibold">{item.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Gallery */}
          <Section id="gallery" icon={Camera} title={t.section.galleryTitle}>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-7 md:p-8">
                <p className="text-gray-700 mb-5">{t.gallery.hint}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-2xl bg-gradient-to-br from-rose-100 to-neutral-100 border border-gray-100 flex items-center justify-center"
                    >
                      <Camera className="w-6 h-6 text-rose-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Travel */}
          <Section id="travel" icon={Hotel} title={t.section.travelTitle}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-7 space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <Hotel className="w-5 h-5 text-rose-500" />
                    {t.travel.hotel}
                  </div>
                  <p className="text-sm text-gray-600">{t.travel.hotelText}</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-7 space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    {t.travel.transport}
                  </div>
                  <p className="text-sm text-gray-600">{t.travel.transportText}</p>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => window.open(mapUrl, "_blank")}
                  >
                    {t.cta.map}
                  </Button>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-7 space-y-2">
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                    {t.travel.notes}
                  </div>
                  <p className="text-sm text-gray-600">{t.travel.notesText}</p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Gifts */}
          <Section id="gifts" icon={Gift} title={t.section.giftsTitle}>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-7 md:p-8 space-y-4">
                <p className="text-gray-700">{t.gifts.text}</p>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-500">{t.gifts.label}</div>
                    <div className="font-mono text-gray-900 mt-1">{giftText}</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => copyToClipboard(giftText)}
                  >
                    {t.gifts.copy}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* FAQ */}
          <Section id="faq" icon={HelpCircle} title={t.section.faqTitle}>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-7 md:p-8 space-y-4">
                {t.faq.map((item) => (
                  <div
                    key={item.q}
                    className="bg-white rounded-2xl p-5 border border-gray-100"
                  >
                    <div className="font-semibold text-gray-900">{item.q}</div>
                    <div className="text-sm text-gray-600 mt-2">{item.a}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Section>

          {/* RSVP */}
          <Section id="rsvp" icon={Mail} title={t.section.rsvpTitle}>
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-7 md:p-8">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label>{t.rsvp.fullName}</Label>
                      <Input
                        value={rsvp.fullName}
                        onChange={(e) =>
                          setRsvp((s) => ({ ...s, fullName: e.target.value }))
                        }
                        placeholder={t.rsvp.fullName}
                        className="rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.rsvp.attending}</Label>
                      <YesNo
                        value={rsvp.attending}
                        onChange={(v) => setRsvp((s) => ({ ...s, attending: v }))}
                        yesLabel={t.rsvp.attendingYes}
                        noLabel={t.rsvp.attendingNo}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.rsvp.companions}</Label>
                      <Input
                        value={rsvp.companions}
                        onChange={(e) =>
                          setRsvp((s) => ({ ...s, companions: e.target.value }))
                        }
                        placeholder="[Nombre/s del acompañante]"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.rsvp.intolerances}</Label>
                      <Textarea
                        value={rsvp.intolerances}
                        onChange={(e) =>
                          setRsvp((s) => ({ ...s, intolerances: e.target.value }))
                        }
                        placeholder="[Sin gluten, vegetariano/a, alergias, etc.]"
                        className="rounded-xl min-h-24"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-rose-500" /> {t.rsvp.bus}
                      </Label>
                      <YesNo
                        value={rsvp.bus}
                        onChange={(v) => setRsvp((s) => ({ ...s, bus: v }))}
                        yesLabel={t.rsvp.busYes}
                        noLabel={t.rsvp.busNo}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-rose-500" /> {t.rsvp.address}
                      </Label>
                      <Textarea
                        value={rsvp.address}
                        onChange={(e) =>
                          setRsvp((s) => ({ ...s, address: e.target.value }))
                        }
                        placeholder="[Calle, número, ciudad, CP]"
                        className="rounded-xl min-h-20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.rsvp.message}</Label>
                      <Textarea
                        value={rsvp.message}
                        onChange={(e) =>
                          setRsvp((s) => ({ ...s, message: e.target.value }))
                        }
                        placeholder="[Cualquier detalle adicional]"
                        className="rounded-xl min-h-24"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button type="submit" className="rounded-xl">
                        {t.rsvp.send}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() =>
                          downloadTextFile(
                            "wedding-invite.ics",
                            buildICS(),
                            "text/calendar"
                          )
                        }
                      >
                        {t.rsvp.export}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => window.location.assign(mailtoHref)}
                      >
                        {t.rsvp.mailto}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                      <div className="text-xl font-semibold text-gray-900">
                        {t.rsvp.sentTitle}
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        {t.rsvp.sentText}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-2">
                        <div className="text-sm text-gray-500 mb-1">RSVP</div>
                        <div className="text-gray-900 font-semibold">
                          {rsvp.fullName || "—"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {t.rsvp.attending}: <span className="font-semibold">{rsvp.attending}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {t.rsvp.bus}: <span className="font-semibold">{rsvp.bus}</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3">
                        <Button
                          className="rounded-xl w-full"
                          onClick={() =>
                            downloadTextFile(
                              "wedding-invite.ics",
                              buildICS(),
                              "text/calendar"
                            )
                          }
                        >
                          {t.rsvp.export}
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl w-full"
                          onClick={() => window.location.assign(mailtoHref)}
                        >
                          {t.rsvp.mailto}
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl w-full"
                          onClick={() => setSent(false)}
                        >
                          {t.rsvp.edit}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Section>

          {/* Footer */}
          <div className="pt-8 text-center text-sm text-gray-500">
            {t.footer} {WEDDING.couple.a} & {WEDDING.couple.b} ·
            <span className="ml-1 text-gray-400">{WEDDING.websiteUrl}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
