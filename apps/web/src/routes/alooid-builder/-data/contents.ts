import type { ItemKey } from "./items";
import { ItemId } from "./items-enum";

type ContentData = {
  name: string;
  items: ItemKey[];
};

export const contents: Readonly<ContentData[]> = [
  {
    name: "Drops de equipamentos",
    items: [ItemId.ROSA_ETERNA],
  },
  {
    name: "Campos de Niflheim 3",
    items: [
      ItemId.AMETISTA,
      ItemId.TOPAZ,
      ItemId.SOMBRIODECON,
      ItemId.ZELUNIUM,
      ItemId.AMBAR,
      ItemId.PO_DE_ETER,
      ItemId.GEMA_ETER,
    ],
  },
  {
    name: "Caminho do Iniciante",
    items: [
      ItemId.MOEDA_DO_INICIANTE,
      ItemId.ARQUIVOS_DE_BIOPESQUISA,
      ItemId.FRAGMENTO_DE_EXPERIMENTO,
      ItemId.BLOCO_DE_SUCATA,
      ItemId.TANQUE_VELHO,
      ItemId.TICKET_SOMBRIO_GERAL,
      ItemId.TICKET_SOMBRIO_HABILIDADES,
      ItemId.TICKET_SOMBRIO_CLASSES,
      ItemId.DYNITE,
      ItemId.CAIXA_AREIA_ESTELAR_DE_BRUXA_400,
      ItemId.PIECE_OF_SIN,
      ItemId.FRAGMENT_OF_GOOD_WILL,
      ItemId.AUTOMATIC_MODULE_BOX,
      ItemId.CAIXA_ANCESTRAL,
      ItemId.MINNEAS,
      ItemId.BARMEAL_TICKET,
      ItemId.ARMA_DANIFICADA,
    ],
  },
];
