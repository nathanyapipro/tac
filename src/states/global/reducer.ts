import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { ValueType } from "../../components/Autocomplete";
import { getOption } from "../../helpers/antibiotic";
export interface Class {
  id: string;
  name: string;
}

export interface Antibiotic {
  id: string;
  class: string;
  name: string;
  commercialNames: Array<string>;
}

export interface ById<T> {
  [key: string]: T;
}

export interface GlobalState {
  readonly class: ById<Class>;
  readonly antibiotics: ById<Antibiotic>;
  readonly allergenicAntibioticId: ValueType;
  readonly prescribedAntibioticId: ValueType;
}

const INITIAL_STATE = {
  allergenicAntibioticId: undefined,
  prescribedAntibioticId: undefined,
  class: {
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
      class: "1",
      name: "Amikacine",
      commercialNames: []
    },
    "2": {
      id: "2",
      class: "1",
      name: "Gentamicine",
      commercialNames: []
    },
    "3": {
      id: "3",
      class: "1",
      name: "Néomycine",
      commercialNames: []
    },
    "4": {
      id: "4",
      class: "1",
      name: "Nétilmicine",
      commercialNames: []
    },
    "5": {
      id: "5",
      class: "1",
      name: "Paromomycine",
      commercialNames: []
    },
    "6": {
      id: "6",
      class: "1",
      name: "Streptomycine",
      commercialNames: []
    },
    "7": {
      id: "7",
      class: "1",
      name: "Tobramycine",
      commercialNames: []
    },
    "8": {
      id: "8",
      class: "2",
      name: "Ciprofloxacine",
      commercialNames: ["Cipro"]
    },
    "9": {
      id: "9",
      class: "2",
      name: "Gatifloxacine",
      commercialNames: ["Tequin"]
    },
    "10": {
      id: "10",
      class: "2",
      name: "Lévofloxacine",
      commercialNames: ["Levaquin"]
    },
    "11": {
      id: "11",
      class: "2",
      name: "Moxifloxacine",
      commercialNames: ["Avelox"]
    },
    "12": {
      id: "12",
      class: "2",
      name: "Norfloxacine",
      commercialNames: []
    },
    "13": {
      id: "13",
      class: "2",
      name: "Ofloxacine",
      commercialNames: ["Floxin"]
    },
    "14": {
      id: "14",
      class: "2",
      name: "Acide nalidixique",
      commercialNames: ["NegGram"]
    },
    "15": {
      id: "15",
      class: "3",
      name: "Dapsone",
      commercialNames: []
    },
    "16": {
      id: "16",
      class: "3",
      name: "Sulfadiazine",
      commercialNames: ["Coptin", "Flamazine"]
    },
    "17": {
      id: "17",
      class: "3",
      name: "Sulfisoxazole / érythromycine",
      commercialNames: ["Pediazole"]
    },
    "18": {
      id: "18",
      class: "3",
      name: "Triméthoprime-sulfaméthoxazole ou TMP-SMX",
      commercialNames: ["Septra"]
    },
    "19": {
      id: "19",
      class: "3",
      name: "Sulfacétamide",
      commercialNames: []
    },
    "20": {
      id: "20",
      class: "4",
      name: "Azithromycine",
      commercialNames: ["Zithromax"]
    },
    "21": {
      id: "21",
      class: "4",
      name: "Clarithromycine",
      commercialNames: ["Biaxin"]
    },
    "22": {
      id: "22",
      class: "4",
      name: "Érythromycine",
      commercialNames: []
    },
    "23": {
      id: "23",
      class: "4",
      name: "Sulfisoxazole / érythromycine",
      commercialNames: ["Pediazole"]
    },
    "24": {
      id: "24",
      class: "4",
      name: "Télithromycine",
      commercialNames: ["Ketek"]
    },
    "25": {
      id: "25",
      class: "5",
      name: "Déméclocycline",
      commercialNames: ["Declomycin"]
    },
    "26": {
      id: "26",
      class: "5",
      name: "Doxycycline",
      commercialNames: ["Vibra-Tabs"]
    },
    "27": {
      id: "27",
      class: "5",
      name: "Minocycline",
      commercialNames: ["Minocin"]
    },
    "28": {
      id: "28",
      class: "5",
      name: "Tétracycline",
      commercialNames: []
    },
    "29": {
      id: "29",
      class: "6",
      name: "Pénicilline",
      commercialNames: []
    },
    "30": {
      id: "30",
      class: "6",
      name: "Ampicilline",
      commercialNames: []
    },
    "31": {
      id: "31",
      class: "6",
      name: "Amoxicilline",
      commercialNames: []
    },
    "32": {
      id: "32",
      class: "6",
      name: "Amoxicilline-clavulanate",
      commercialNames: ["Clavulin"]
    },
    "33": {
      id: "33",
      class: "6",
      name: "Cloxacilline",
      commercialNames: []
    },
    "34": {
      id: "34",
      class: "6",
      name: "Pipéracilline-tazobactam",
      commercialNames: ["Tazocin"]
    },
    "35": {
      id: "35",
      class: "6",
      name: "Pipéracilline",
      commercialNames: []
    },
    "36": {
      id: "36",
      class: "6",
      name: "Pivampicilline",
      commercialNames: ["Pondocillin"]
    },
    "37": {
      id: "37",
      class: "6",
      name: "Ticarcilline-clavulanate",
      commercialNames: ["Timentin"]
    },
    "38": {
      id: "38",
      class: "7",
      name: "Céfaclor",
      commercialNames: []
    },
    "39": {
      id: "39",
      class: "7",
      name: "Céfadroxil",
      commercialNames: ["Duricef"]
    },
    "40": {
      id: "40",
      class: "7",
      name: "Céfazoline",
      commercialNames: []
    },
    "41": {
      id: "41",
      class: "7",
      name: "Céfépime",
      commercialNames: ["Maxipime"]
    },
    "42": {
      id: "42",
      class: "7",
      name: "Céfixime",
      commercialNames: ["Suprax"]
    },
    "43": {
      id: "43",
      class: "7",
      name: "Céfotaxime",
      commercialNames: ["Claforan"]
    },
    "44": {
      id: "44",
      class: "7",
      name: "Céfoxitine",
      commercialNames: []
    },
    "45": {
      id: "45",
      class: "7",
      name: "Cefprozil",
      commercialNames: ["Cefzil"]
    },
    "46": {
      id: "46",
      class: "7",
      name: "Ceftazidime",
      commercialNames: []
    },
    "47": {
      id: "47",
      class: "7",
      name: "Ceftriaxone",
      commercialNames: ["Rocephin"]
    },
    "48": {
      id: "48",
      class: "7",
      name: "Céfuroxime",
      commercialNames: ["Zinacef", "Ceftin"]
    },
    "49": {
      id: "49",
      class: "7",
      name: "Céphalexine",
      commercialNames: []
    },
    "50": {
      id: "50",
      class: "8",
      name: "Ertapénem",
      commercialNames: ["Invanz"]
    },
    "51": {
      id: "51",
      class: "8",
      name: "Imipénem-cilastatine",
      commercialNames: ["Primaxin"]
    },
    "52": {
      id: "52",
      class: "8",
      name: "Méropénem",
      commercialNames: ["Merrem"]
    },
    "53": {
      id: "53",
      class: "9",
      name: "Acide fusidique",
      commercialNames: ["Fucidin"]
    },
    "54": {
      id: "54",
      class: "9",
      name: "Clindamycine",
      commercialNames: ["Dalacin C"]
    },
    "55": {
      id: "55",
      class: "9",
      name: "Fosfomycine",
      commercialNames: ["Monurol"]
    },
    "56": {
      id: "56",
      class: "9",
      name: "Linézolide",
      commercialNames: ["Zyvoxam"]
    },
    "57": {
      id: "57",
      class: "9",
      name: "Métronidazole",
      commercialNames: ["Flagyl"]
    },
    "58": {
      id: "58",
      class: "9",
      name: "Nitrofurantoïne",
      commercialNames: ["MacroBID"]
    },
    "59": {
      id: "59",
      class: "9",
      name: "Rifampine",
      commercialNames: ["Rifadin"]
    },
    "60": {
      id: "60",
      class: "9",
      name: "Triméthoprime",
      commercialNames: []
    },
    "61": {
      id: "61",
      class: "9",
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
    case getType(actions.setAllergenicAntibioticId): {
      return {
        ...state,
        allergenicAntibioticId: action.payload
      };
    }
    case getType(actions.setPrescribedAntibioticId): {
      return {
        ...state,
        prescribedAntibioticId: action.payload
      };
    }

    default:
      return state;
  }
}
