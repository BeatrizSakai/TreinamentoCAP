using FirstAppSrv as service from '../../srv/service';

annotate service.pessoa with @(
    UI.HeaderInfo : {
        TypeName : 'Pessoa',
        TypeNamePlural : 'Pessoas',
        Title : { Value : nome },
        Description : { Value : cpf }
    },
    UI.FieldGroup #DadosPessoais : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'CPF',
                Value : cpf
            },
            {
                $Type : 'UI.DataField',
                Label : 'Nome',
                Value : nome
            },
            {
                $Type : 'UI.DataField',
                Label : 'Idade',
                Value : idade
            }
        ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GrupoDadosPessoais',
            Label : '📊 Dados Pessoais',
            Target : '@UI.FieldGroup#DadosPessoais'
        }
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '🆔 CPF',
            Value : cpf
        },
        {
            $Type : 'UI.DataField',
            Label : '👤 Nome',
            Value : nome
        },
        {
            $Type : 'UI.DataField',
            Label : '🎂 Idade',
            Value : idade
        }
    ]
);
