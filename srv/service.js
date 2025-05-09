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
    const { cpf } = req.data;

    // Lê o registro atual do banco
    const pessoaAtual = await SELECT.from('pessoa').where({ cpf }).limit(1);
    const pessoa = pessoaAtual[0];

    // Aplica os dados modificados por cima do original
    const dadosFinais = { ...pessoa, ...req.data };

    const { nome, idade } = dadosFinais;

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome) || nome.length < 3) {
      req.error({
        code: 'INVALID_NAME',
        message: 'Nome inválido. Use pelo menos 3 letras, sem números.',
        target: 'nome',
        status: 400
      });
    }

    if (!idade || idade < 1) {
      req.error({
        code: 'INVALID_AGE',
        message: 'Idade deve ser maior que zero.',
        target: 'idade',
        status: 400
      });
    }

    if (req.errors?.length > 0) {
      return req.reject(400, 'Erros de validação encontrados.');
    }
  });

  this.on('READ', 'pessoa', async (req) => {
      const db = await cds.connect.to('db');
      return await db.run(req.query);
  });
});