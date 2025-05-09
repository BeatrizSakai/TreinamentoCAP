namespace FirstApp;
using { cuid } from '@sap/cds/common';

@odata.draft.enabled
entity pessoa : cuid {
  cpf: String(11);
  nome: String(100);
  idade: Integer;
};