import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import CustomAccordion from "~/components/accordion";
import type { Farmaco } from "~/db";
import db from "~/db";
import farmacoCSS from "~/styles/farmacoId.css";

export const links: LinksFunction = () => [
  {
    href: farmacoCSS,
    rel: "stylesheet",
  },
];

export async function loader({ params }: LoaderArgs) {
  const id = params.farmacoId;

  if (!id) {
    return redirect("/");
  }

  const farmaco = await db.fetchSingle<Farmaco>("farmaco", id);

  return typedjson({
    farmaco,
  });
}

export default function Index() {
  const { farmaco } = useTypedLoaderData<{ farmaco: Farmaco }>();

  return (
    <div className="container">
      <h1>{farmaco.ifa}</h1>
      <div className="labels">
        <span>ATC: {farmaco.atc}</span>
        <span>FTN: {farmaco.ftn}</span>
      </div>
      <CustomAccordion
        items={[
          {
            title: "Grupo",
            description: farmaco.grupo_fd,
          },
          {
            title: "Eficacia",
            description: farmaco.eficacia,
          },
          {
            title: "Seguridad",
            description: farmaco.seguridad,
          },
          {
            title: "Conveniencia",
            description: farmaco.conveniencia_fc,
          },
          {
            title: "Contraindicaciones",
            description: farmaco.contraindicaciones,
          },
          {
            title: "Precauciones",
            description: farmaco.precauciones,
          },
          {
            title: "Interacciones",
            description: farmaco.interacciones,
          },
          {
            title: "Embarazo y Lactancia",
            description: farmaco.embarazo_lactancia,
          },
          {
            title: "Posología",
            description: farmaco.posologia,
          },
          {
            title: "Bibliografía",
            description: farmaco.bibliografia,
          },
        ]}
      />
    </div>
  );
}
