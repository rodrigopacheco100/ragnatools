import { ItemId } from "./items-enum";

type ItemData = {
  name: string;
  img: string;
};

export type ItemKey = keyof typeof items;

export const items = {
  [ItemId.AMETISTA]: {
    name: "Ametista",
    img: "https://www.divine-pride.net/img/items/item/bRO/719",
  },
  [ItemId.AQUAMARINA]: {
    name: "Aquamarina",
    img: "https://www.divine-pride.net/img/items/item/bRO/720",
  },
  [ItemId.TOPAZ]: {
    name: "Topaz",
    img: "https://www.divine-pride.net/img/items/item/bRO/728",
  },
  [ItemId.ROSA_ETERNA]: {
    name: "Rosa Eterna",
    img: "https://www.divine-pride.net/img/items/item/bRO/748",
  },
  [ItemId.BLOCO_DE_SUCATA]: {
    name: "Bloco de Sucata",
    img: "https://www.divine-pride.net/img/items/item/bRO/6961",
  },
  [ItemId.TANQUE_VELHO]: {
    name: "Tanque Velho",
    img: "https://www.divine-pride.net/img/items/item/bRO/6962",
  },
  [ItemId.ARMA_DANIFICADA]: {
    name: "Arma Danificada",
    img: "https://www.divine-pride.net/img/items/item/bRO/25668",
  },
  [ItemId.SOMBRIODECON]: {
    name: "Sombriodecon",
    img: "https://www.divine-pride.net/img/items/item/bRO/25729",
  },
  [ItemId.ZELUNIUM]: {
    name: "Zelunium",
    img: "https://www.divine-pride.net/img/items/item/bRO/25731",
  },
  [ItemId.ARQUIVOS_DE_BIOPESQUISA]: {
    name: "Arquivos de Biopesquisa",
    img: "https://www.divine-pride.net/img/items/item/bRO/25786",
  },
  [ItemId.FRAGMENTO_DE_EXPERIMENTO]: {
    name: "Fragmento de Experimento",
    img: "https://www.divine-pride.net/img/items/item/bRO/25787",
  },
  [ItemId.DYNITE]: {
    name: "Dynite",
    img: "https://www.divine-pride.net/img/items/item/bRO/25814",
  },
  [ItemId.TICKET_SOMBRIO_GERAL]: {
    name: "Ticket Sombrio [Geral]",
    img: "https://site.heroragnarok.com/?module=image&action=processicon&id=30060",
  },
  [ItemId.TICKET_SOMBRIO_HABILIDADES]: {
    name: "Ticket Sombrio [Habilidades]",
    img: "https://site.heroragnarok.com/?module=image&action=processicon&id=30061",
  },
  [ItemId.TICKET_SOMBRIO_CLASSES]: {
    name: "Ticket Sombrio [Classes]",
    img: "https://site.heroragnarok.com/?module=image&action=processicon&id=30062",
  },
  [ItemId.TICKET_SOMBRIO_AVANCADO]: {
    name: "Ticket Sombrio [Avançado]",
    img: "https://site.heroragnarok.com/?module=image&action=processicon&id=30064",
  },
  [ItemId.CAIXA_AREIA_ESTELAR_DE_BRUXA_400]: {
    name: "Caixa Areia Estelar de Bruxa [400]",
    img: "https://www.divine-pride.net/img/items/item/bRO/617",
  },
  [ItemId.MOEDA_DO_INICIANTE]: {
    name: "Moeda do Iniciante",
    img: "https://site.heroragnarok.com/?module=image&action=processicon&id=50169",
  },
  [ItemId.CAIXA_ANCESTRAL]: {
    name: "Caixa Ancestral",
    img: "https://site.heroragnarok.com/?module=image&action=processicon&id=51115",
  },
  [ItemId.AUTOMATIC_MODULE_BOX]: {
    name: "Automatic Module Box",
    img: "https://www.divine-pride.net/img/items/item/bRO/100160",
  },
  [ItemId.BARMEAL_TICKET]: {
    name: "Barmeal Ticket",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000103",
  },
  [ItemId.PIECE_OF_SIN]: {
    name: "Piece of Sin (Fragment of Sin)",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000257",
  },
  [ItemId.FRAGMENT_OF_GOOD_WILL]: {
    name: "Fragment of Good Will (Fragment of Fate)",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000263",
  },
  [ItemId.AMBAR]: {
    name: "Âmbar",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000321",
  },
  [ItemId.PO_DE_ETER]: {
    name: "Pó de Éter",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000322",
  },
  [ItemId.GEMA_ETER]: {
    name: "Gema Éter",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000323",
  },
  [ItemId.MINNEAS]: {
    name: "Minneas",
    img: "https://www.divine-pride.net/img/items/item/bRO/1000367",
  },
} satisfies Readonly<Record<ItemId, ItemData>>;
