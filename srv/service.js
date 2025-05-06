const cds = require('@sap/cds');

module.exports = (srv) => {
  srv.before('CREATE', 'pessoa', (req) => {
    const { cpf, nome, idade } = req.data;

    const messages = [];

    if (!/^\d{11}$/.test(cpf)) {
      messages.push('CPF inválido. Deve conter 11 dígitos numéricos.');
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome) || nome.length < 3) {
      messages.push('Nome inválido. Use pelo menos 3 letras, sem números.');
    }

    if (!idade || idade < 1) {
      messages.push('Idade deve ser maior que zero.');
    }

    if (messages.length > 0) {
      // Adiciona múltiplas mensagens sem lançar exceção
      req.errors = messages.map(msg => ({ message: msg }));

      // Interrompe a criação de fato, sem lançar erro abruptamente
      return req.reject({ code: 400, message: 'Falha na validação', details: req.errors });
    }
  });
};
