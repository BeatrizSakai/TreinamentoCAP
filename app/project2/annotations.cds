using FirstAppSrv as service from '../../srv/service';
using FirstApp from '../../db/src/schema';

annotate service.pessoa with @(
    Capabilities.InsertRestrictions : {
    Insertable : true,
  },
  UI.HeaderInfo : {
    TypeName       : 'Pessoa',
    TypeNamePlural : 'Pessoas',
    Title          : { Value : nome },
    Description    : { Value : cpf }
  },

  UI.Facets : [
    {
      $Type  : 'UI.ReferenceFacet',
      Label  : '📊 Dados Pessoais',
      Target : '@UI.FieldGroup#DadosPessoais'
    }
  ],

  UI.FieldGroup #DadosPessoais : {
    $Type : 'UI.FieldGroupType',
    Data  : [
      { $Type : 'UI.DataField', Label : 'CPF',   Value : cpf },
      { $Type : 'UI.DataField', Label : 'Nome',  Value : nome },
      { $Type : 'UI.DataField', Label : 'Idade', Value : idade }
    ]
  },

  UI.LineItem : [
    { $Type : 'UI.DataField', Label : '🆔 CPF',  Value : cpf },
    { $Type : 'UI.DataField', Label : '👤 Nome',  Value : nome },
    { $Type : 'UI.DataField', Label : '🎂 Idade', Value : idade }
  ],

  UI.Identification : [
    { $Type : 'UI.DataField', Value : cpf,   Label : 'CPF' },
    { $Type : 'UI.DataField', Value : nome,  Label : 'Nome' },
    { $Type : 'UI.DataField', Value : idade, Label : 'Idade' }
  ]
);

annotate service.pessoa with @(
    Capabilities.Insertable : true,
    Capabilities.Updatable  : true,
    Capabilities.Deletable  : true
);