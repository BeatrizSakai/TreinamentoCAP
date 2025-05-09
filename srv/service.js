const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

  this.before('CREATE', 'pessoa', async(req) => {
    const { cpf, nome, idade } = req.data;

    if (!/^\d{11}$/.test(cpf)) {
      return req.reject(400, 'CPF inválido. Deve conter 11 dígitos numéricos.');
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome) || nome.length < 3) {
      return req.reject(400, 'Nome inválido. Use pelo menos 3 letras, sem números.');
    }

    if (!idade || idade < 1) {
      return req.reject(400, 'Idade deve ser maior que zero.');
    }
  });
  this.before('UPDATE', 'pessoa', async (req) => {
    const { nome, idade } = req.data;
  
    if (nome === null) {
      return req.error(400, 'Nome não pode ser nulo.');
    }
  
    if (nome != null && nome.trim().length < 3) {
      return req.error(400, 'Nome muito curto. Mínimo 3 caracteres.');
    }
  
    if (idade === null) {
      return req.error(400, 'Idade não pode ser nula.');
    }
  
    if (idade != null && (idade < 0 || idade > 120)) {
      return req.error(400, 'Idade inválida. Deve estar entre 0 e 120.');
    }
  });
  

  this.on('READ', 'pessoa', async (req) => {
      const db = await cds.connect.to('db');
      return await db.run(req.query);
  });
});