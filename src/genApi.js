
const { faker } = require('@faker-js/faker');


function generateDataFromTemplate(template, count) {
  const data = [];


  for (let i = 0; i < count; i++) {
    const item = {};


    for (const field in template) {
        const fakerMethod = template[field];
        const value = fakerMethod.split('.').reduce((obj, key) => obj[key], faker)();
        // console.log(`Field: ${field}, nValue: ${value}`); 
        item[field] = value;
    }

    data.push(item);
  }


  return data;
}


function generateApiFromSchema(app, schema) {
  for (const endpoint in schema) {
    const { template, count } = schema[endpoint]; 
    const data = generateDataFromTemplate(template, count);  

   
    app.get(`/${endpoint}`, (req, res) => {
      res.json(data);  
    });
  }
}


module.exports = generateApiFromSchema;
