import axios from "axios";
import fs from "fs-extra";

const templateName = "NAME";

const re = new RegExp(templateName, "g");

async function createComponent(
  f: string,
  log: (t: string) => void | undefined
) {
  const files = await getFiles();
  const pathSplited = f.split("/");
  pathSplited.push(pathSplited[pathSplited.length - 1]);
  files.forEach(async (file) => {
    pathSplited[pathSplited.length - 1] = file.filename.replace(
      re,
      pathSplited[pathSplited.length - 1]
    );
    const path = `./${pathSplited.join("/")}`;
    try {
      await fs.outputFile(path, file.content.replace(re, f));
      if (log) log(`${path} - created`);
    } catch (err) {
      if (log) log(`${path} - error`);
    }
  });
}

type fileGist = {
  filename: string;
  content: string;
};

type Response = {
  files: Record<string, fileGist>;
};

export async function getGist() {
  const { data } = await axios.get<Response>(
    "https://api.github.com/gists/ef6071607136a7ccf3d17521e4547435"
  );

  return data.files;
}

export async function getFiles() {
  const files = await getGist();

  return Object.values(files);
}

export async function getConfig() {
  const files = await getGist();
  return JSON.parse(files["gt.json"]?.content);
}

export default createComponent;
