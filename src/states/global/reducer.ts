import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { ValueType } from "../../components/Autocomplete";
import { getOption } from "../../helpers/antibiotic";
export interface Group {
  id: string;
  name: string;
}

export interface Antibiotic {
  id: string;
  group: string;
  name: string;
  commercialNames: Array<string>;
}

export interface ById<T> {
  [key: string]: T;
}

export interface AntibioticData {
  valueType: ValueType;
  antibiotic: Antibiotic;
  group: Group;
}

export interface GlobalState {
  readonly groupes: ById<Group>;
  readonly antibiotics: ById<Antibiotic>;
  readonly allergenicAntibiotic?: AntibioticData;
  readonly prescribedAntibiotic?: AntibioticData;
}

const INITIAL_STATE = {
  allergenicAntibiotic: undefined,
  prescribedAntibiotic: undefined,
  groupes: {
    "1": {
      id: "1",
      name: "Aminosides"
    },
    "2": {
      id: "2",
      name: "Quinolones"
    },
    "3": {
      id: "3",
      name: "Sulfamidées et associations"
    },
    "4": {
      id: "4",
      name: "Macrolides et dérivés"
    },
    "5": {
      id: "5",
      name: "Tétracyclines"
    },
    "6": {
      id: "6",
      name: "Pénicillines, dérivés et associations"
    },
    "7": {
      id: "7",
      name: "Céphalosporines"
    },
    "8": {
      id: "8",
      name: "Carbapénèmes"
    },
    "9": {
      id: "9",
      name: "Autres antibiotiques"
    }
  },
  antibiotics: {
    "1": {
      id: "1",
      group: "1",
      name: "Amikacine",
      commercialNames: []
    },
    "2": {
      id: "2",
      group: "1",
      name: "Gentamicine",
      commercialNames: []
    },
    "3": {
      id: "3",
      group: "1",
      name: "Néomycine",
      commercialNames: []
    },
    "4": {
      id: "4",
      group: "1",
      name: "Nétilmicine",
      commercialNames: []
    },
    "5": {
      id: "5",
      group: "1",
      name: "Paromomycine",
      commercialNames: []
    },
    "6": {
      id: "6",
      group: "1",
      name: "Streptomycine",
      commercialNames: []
    },
    "7": {
      id: "7",
      group: "1",
      name: "Tobramycine",
      commercialNames: []
    },
    "8": {
      id: "8",
      group: "2",
      name: "Ciprofloxacine",
      commercialNames: ["Cipro"]
    },
    "9": {
      id: "9",
      group: "2",
      name: "Gatifloxacine",
      commercialNames: ["Tequin"]
    },
    "10": {
      id: "10",
      group: "2",
      name: "Lévofloxacine",
      commercialNames: ["Levaquin"]
    },
    "11": {
      id: "11",
      group: "2",
      name: "Moxifloxacine",
      commercialNames: ["Avelox"]
    },
    "12": {
      id: "12",
      group: "2",
      name: "Norfloxacine",
      commercialNames: []
    },
    "13": {
      id: "13",
      group: "2",
      name: "Ofloxacine",
      commercialNames: ["Floxin"]
    },
    "14": {
      id: "14",
      group: "2",
      name: "Acide nalidixique",
      commercialNames: ["NegGram"]
    },
    "15": {
      id: "15",
      group: "3",
      name: "Dapsone",
      commercialNames: []
    },
    "16": {
      id: "16",
      group: "3",
      name: "Sulfadiazine",
      commercialNames: ["Coptin", "Flamazine"]
    },
    "17": {
      id: "17",
      group: "3",
      name: "Sulfisoxazole / érythromycine",
      commercialNames: ["Pediazole"]
    },
    "18": {
      id: "18",
      group: "3",
      name: "Triméthoprime-sulfaméthoxazole ou TMP-SMX",
      commercialNames: ["Septra"]
    },
    "19": {
      id: "19",
      group: "3",
      name: "Sulfacétamide",
      commercialNames: []
    },
    "20": {
      id: "20",
      group: "4",
      name: "Azithromycine",
      commercialNames: ["Zithromax"]
    },
    "21": {
      id: "21",
      group: "4",
      name: "Clarithromycine",
      commercialNames: ["Biaxin"]
    },
    "22": {
      id: "22",
      group: "4",
      name: "Érythromycine",
      commercialNames: []
    },
    "23": {
      id: "23",
      group: "4",
      name: "Sulfisoxazole / érythromycine",
      commercialNames: ["Pediazole"]
    },
    "24": {
      id: "24",
      group: "4",
      name: "Télithromycine",
      commercialNames: ["Ketek"]
    },
    "25": {
      id: "25",
      group: "5",
      name: "Déméclocycline",
      commercialNames: ["Declomycin"]
    },
    "26": {
      id: "26",
      group: "5",
      name: "Doxycycline",
      commercialNames: ["Vibra-Tabs"]
    },
    "27": {
      id: "27",
      group: "5",
      name: "Minocycline",
      commercialNames: ["Minocin"]
    },
    "28": {
      id: "28",
      group: "5",
      name: "Tétracycline",
      commercialNames: []
    },
    "29": {
      id: "29",
      group: "6",
      name: "Pénicilline",
      commercialNames: []
    },
    "30": {
      id: "30",
      group: "6",
      name: "Ampicilline",
      commercialNames: []
    },
    "31": {
      id: "31",
      group: "6",
      name: "Amoxicilline",
      commercialNames: []
    },
    "32": {
      id: "32",
      group: "6",
      name: "Amoxicilline-clavulanate",
      commercialNames: ["Clavulin"]
    },
    "33": {
      id: "33",
      group: "6",
      name: "Cloxacilline",
      commercialNames: []
    },
    "34": {
      id: "34",
      group: "6",
      name: "Pipéracilline-tazobactam",
      commercialNames: ["Tazocin"]
    },
    "35": {
      id: "35",
      group: "6",
      name: "Pipéracilline",
      commercialNames: []
    },
    "36": {
      id: "36",
      group: "6",
      name: "Pivampicilline",
      commercialNames: ["Pondocillin"]
    },
    "37": {
      id: "37",
      group: "6",
      name: "Ticarcilline-clavulanate",
      commercialNames: ["Timentin"]
    },
    "38": {
      id: "38",
      group: "7",
      name: "Céfaclor",
      commercialNames: []
    },
    "39": {
      id: "39",
      group: "7",
      name: "Céfadroxil",
      commercialNames: ["Duricef"]
    },
    "40": {
      id: "40",
      group: "7",
      name: "Céfazoline",
      commercialNames: []
    },
    "41": {
      id: "41",
      group: "7",
      name: "Céfépime",
      commercialNames: ["Maxipime"]
    },
    "42": {
      id: "42",
      group: "7",
      name: "Céfixime",
      commercialNames: ["Suprax"]
    },
    "43": {
      id: "43",
      group: "7",
      name: "Céfotaxime",
      commercialNames: ["Claforan"]
    },
    "44": {
      id: "44",
      group: "7",
      name: "Céfoxitine",
      commercialNames: []
    },
    "45": {
      id: "45",
      group: "7",
      name: "Cefprozil",
      commercialNames: ["Cefzil"]
    },
    "46": {
      id: "46",
      group: "7",
      name: "Ceftazidime",
      commercialNames: []
    },
    "47": {
      id: "47",
      group: "7",
      name: "Ceftriaxone",
      commercialNames: ["Rocephin"]
    },
    "48": {
      id: "48",
      group: "7",
      name: "Céfuroxime",
      commercialNames: ["Zinacef", "Ceftin"]
    },
    "49": {
      id: "49",
      group: "7",
      name: "Céphalexine",
      commercialNames: []
    },
    "50": {
      id: "50",
      group: "8",
      name: "Ertapénem",
      commercialNames: ["Invanz"]
    },
    "51": {
      id: "51",
      group: "8",
      name: "Imipénem-cilastatine",
      commercialNames: ["Primaxin"]
    },
    "52": {
      id: "52",
      group: "8",
      name: "Méropénem",
      commercialNames: ["Merrem"]
    },
    "53": {
      id: "53",
      group: "9",
      name: "Acide fusidique",
      commercialNames: ["Fucidin"]
    },
    "54": {
      id: "54",
      group: "9",
      name: "Clindamycine",
      commercialNames: ["Dalacin C"]
    },
    "55": {
      id: "55",
      group: "9",
      name: "Fosfomycine",
      commercialNames: ["Monurol"]
    },
    "56": {
      id: "56",
      group: "9",
      name: "Linézolide",
      commercialNames: ["Zyvoxam"]
    },
    "57": {
      id: "57",
      group: "9",
      name: "Métronidazole",
      commercialNames: ["Flagyl"]
    },
    "58": {
      id: "58",
      group: "9",
      name: "Nitrofurantoïne",
      commercialNames: ["MacroBID"]
    },
    "59": {
      id: "59",
      group: "9",
      name: "Rifampine",
      commercialNames: ["Rifadin"]
    },
    "60": {
      id: "60",
      group: "9",
      name: "Triméthoprime",
      commercialNames: []
    },
    "61": {
      id: "61",
      group: "9",
      name: "Vancomycine",
      commercialNames: ["Vancocin"]
    }
  }
};

export function global(
  state: GlobalState = INITIAL_STATE,
  action: ActionType<typeof actions>
): GlobalState {
  switch (action.type) {
    case getType(actions.setAllergenicAntibiotic): {
      if (action.payload) {
        const selected =
          action.payload instanceof Array ? action.payload[0] : action.payload;
        const antibiotic = state.antibiotics[selected.value];
        const group = state.groupes[antibiotic.group];
        return {
          ...state,
          allergenicAntibiotic: {
            valueType: action.payload,
            antibiotic,
            group
          }
        };
      } else {
        return {
          ...state,
          allergenicAntibiotic: undefined
        };
      }
    }
    case getType(actions.setPrescribedAntibiotic): {
      if (action.payload) {
        const selected =
          action.payload instanceof Array ? action.payload[0] : action.payload;
        const antibiotic = state.antibiotics[selected.value];
        const group = state.groupes[antibiotic.group];
        return {
          ...state,
          prescribedAntibiotic: {
            valueType: action.payload,
            antibiotic,
            group
          }
        };
      } else {
        return {
          ...state,
          prescribedAntibiotic: undefined
        };
      }
    }

    default:
      return state;
  }
}
