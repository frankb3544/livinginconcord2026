import fs from 'fs'

// Local-development convenience only: if an env.json file exists in the
// project root (it is gitignored and never committed), load its values into
// process.env. In deployed environments (e.g. Vercel) the file is absent and
// variables come from the platform instead — in that case this is a no-op.
if (fs.existsSync('env.json')) {
  const envConfig = JSON.parse(fs.readFileSync('env.json', 'utf8'));

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}
