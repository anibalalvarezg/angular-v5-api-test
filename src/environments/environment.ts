// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    url: 'https://beer9.p.rapidapi.com/',
    host: 'beer9.p.rapidapi.com',
    key: 'f817aae9ccmshcf30d75c746cb38p158521jsn948bf5b7942d'
  }
};