#!/usr/bin/env node
import yargs from "yargs";
import createComponent, { getConfig } from "./createComponent";

async function a() {
  const options = await yargs.usage("\nUsage: gt <nameComponent>").option("c", {
    alias: "create",
    describe: "List all supported languages.",
    type: "string",
    demandOption: false,
  }).argv;

  const nameComponent = options._[0] as string;

  if (!nameComponent) {
    const config = await getConfig();
    console.log("Usage: gt <nameComponent> \n");
    console.log(JSON.stringify(config, null, 2));
    return;
  }

  await createComponent(nameComponent, console.log);
  console.log(`${nameComponent} created`);
}

a();
