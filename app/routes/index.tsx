import type { LoaderArgs } from "@remix-run/node";
import { Form, Link, useSubmit } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import type { Clasificacion, Farmaco } from "~/db";
import db from "~/db";
import debounce from "lodash.debounce";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const clasificacion = url.searchParams.get("clasificacion");
  const search = url.searchParams.get("search");

  const farmacos = await db.fetchCollection<Farmaco>("farmaco", [
    { key: "clasificacion", value: clasificacion },
    { key: "ifa", value: search, operator: "~" },
  ]);

  const clasificaciones = await db.fetchCollection<Clasificacion>(
    "clasificacion"
  );

  return typedjson({
    farmacos: farmacos?.items,
    clasificaciones: clasificaciones?.items,
    clasificacion,
    search,
  });
}

export default function Index() {
  const { farmacos, clasificaciones, clasificacion, search } =
    useTypedLoaderData<typeof loader>();
  const submit = useSubmit();

  function handleChange(e: ChangeEvent<HTMLFormElement>) {
    const data = new FormData(e.target.closest("form") as HTMLFormElement);

    submit(data, { method: "get", replace: true });
  }

  return (
    <div className="container">
      <h1>Formulario Terapéutico Nacional</h1>
      <div className="forms">
        <Form onChange={handleChange}>
          <select
            name="clasificacion"
            id="clasificacion"
            defaultValue={clasificacion || ""}
          >
            <option value=""></option>
            {clasificaciones.map((c) => (
              <option value={c.id} key={c.id}>
                {c.atc}
              </option>
            ))}
          </select>
        </Form>
        <Form onChange={debounce(handleChange, 500)}>
          <input
            type="search"
            name="search"
            id="search"
            defaultValue={search || ""}
          />
        </Form>
      </div>
      <ul key={farmacos.length}>
        {farmacos?.map((f: Farmaco) => (
          <li key={f.id}>
            <Link to={f.id}>{f.ifa}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
