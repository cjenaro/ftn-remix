// /api/collections/clasificacion/records

export type PBError = {
  code: number;
  message: string;
  data: any;
};

export type Success<T> = {
  page: 1;
  perPage: 30;
  totalPages: 1;
  totalItems: 2;
  items: T[];
};

export type PocketBaseResponse<T> = Success<T> | PBError;

export type Farmaco = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  updated: Date;
  ifa: string;
  atc: string;
  ftn: string;
  grupo_fd: string;
  eficacia: string;
  seguridad: string;
  conveniencia_fc: string;
  contraindicaciones: string;
  precauciones: string;
  interacciones: string;
  embarazo_lactancia: string;
  posologia: string;
  bibliografia: string;
  clasificacion: string;
};

export type Clasificacion = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  updated: Date;
  atc: string;
  farmaco: string;
  codigo_ftn: string;
};

type Filter = {
  key: string;
  operator?: "=" | "!=" | ">" | ">=" | "<" | "<=" | "~" | "!~";
  value?: string | null;
};

const base_url = "https://ftn-pb.fly.dev/api/";

function filterReducer(acc: string, curr: Filter): string {
  return `${curr.key}${curr.operator || "="}'${curr.value}'${
    acc ? ` && ${acc}` : ""
  }`;
}

async function fetchSingle<T>(collection: string, id: string): Promise<T> {
  const url = new URL(
    base_url + "collections/" + collection + "/records/" + id
  );

  return fetch(decodeURIComponent(url.toString())).then((blob) => blob.json());
}

async function fetchCollection<T>(collection: string, filters?: Filter[]) {
  const url = new URL(base_url + "collections/" + collection + "/records");

  if (filters) {
    const nonEmptyFilters = filters.filter((f) => !!f.value);
    if (nonEmptyFilters.length > 0) {
      url.searchParams.set(
        "filter",
        `(${nonEmptyFilters.reduce(filterReducer, "")})`
      );
    }
  }

  const resultList: PocketBaseResponse<T> = await fetch(
    decodeURIComponent(url.toString())
  ).then((blob) => blob.json());

  if (!("items" in resultList)) {
    throw new Error(resultList.message);
  }

  return resultList;
}

const db = {
  fetchCollection,
  fetchSingle,
};

export default db;
