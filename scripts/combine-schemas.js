const $RefParser = require('json-schema-ref-parser');
const fs = require('fs');
const swaggerCombine = require('swagger-combine');

const schemasFolder = './reference';

if(!fs.existsSync(schemasFolder)) {
  throw new Error('Folder '+schemasFolder+' does not exist');
}

const dirCont = fs.readdirSync( schemasFolder ).filter((val) => {
  return fs.existsSync(schemasFolder+'/'+val+'/openapi.yaml');
});

if(!dirCont.length) {
  throw new Error('No services found. Check your '+schemasFolder+' folder');
}

if(!process.env.PROJECT_CONTACT){
  throw new Error('Define project title with PROJECT_CONTACT=[...]');
}

if(!process.env.PROJECT_DESCRIPTION){
  throw new Error('Define project title with PROJECT_DESCRIPTION=[...]');
}

if(!process.env.PROJECT_SERVER){
  throw new Error('Define project title with PROJECT_SERVER=[...]');
}

if(!process.env.PROJECT_TITLE){
  throw new Error('Define project title with PROJECT_TITLE=[...]');
}

if(!process.env.PROJECT_VERSION){
  throw new Error('Define project title with PROJECT_VERSION=[...]');
}

const schemaConfig = {
  "openapi": "3.0.0",
  "info": {
    "contact": {
      "name": process.env.PROJECT_CONTACT
    },
    "description": process.env.PROJECT_DESCRIPTION,
    "title": process.env.PROJECT_TITLE,
    "version": process.env.PROJECT_VERSION
  },
  "servers": [{
    "url": process.env.PROJECT_SERVER
  }]
};

// Add apis to config
schemaConfig.apis = dirCont.map((dir) => {
  return {
    url: schemasFolder+'/'+dir+'/openapi.yaml',
    paths: {
      base: "/"+dir,
    }
  };
});


/// Combine schemas
swaggerCombine(schemaConfig, (err, result) => {
  if(err){
    throw new Error(err);
  }

  process.stdout.write($RefParser.YAML.stringify(result));
});

