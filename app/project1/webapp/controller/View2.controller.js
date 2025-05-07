sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("firstapp.project1.controller.View2", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("View2").attachPatternMatched(this._onRouteMatched, this);
        },
        onVoltar: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        _onRouteMatched: function (oEvent) {
            const cpf = oEvent.getParameter("arguments").cpf;
            this._cpf = cpf;
        
            const oModel = this.getOwnerComponent().getModel();
            const sPath = `/pessoa('${cpf}')`;
        
            // Faz o binding da View ao registro diretamente (contexto de edição real!)
            this.getView().bindElement({
                path: sPath,
                model: undefined // modelo padrão
            });
        }
        ,
        onSalvarAlteracoes: async function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oContext = oView.getBindingContext();
            const dados = oContext.getObject();
          
            const inputNome = oView.byId("inputNome");
            const inputIdade = oView.byId("inputIdade");
        
          
            let isValid = true;
          
            // Validação Nome
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(dados.nome) || dados.nome.length < 3) {
              inputNome.setValueState("Error");
              inputNome.setValueStateText("Nome deve ter pelo menos 3 letras.");
              isValid = false;
            }
          
            // Validação Idade
            const idade = parseInt(dados.idade);
            if (!idade || idade < 1) {
              inputIdade.setValueState("Error");
              inputIdade.setValueStateText("Idade deve ser maior que zero.");
              isValid = false;
            }
          
            if (!isValid) {
              sap.m.MessageBox.warning("Corrija os erros antes de salvar.");
              return;
            }
          
            try {
              await oModel.submitBatch("$auto");
              sap.m.MessageToast.show("Pessoa atualizada com sucesso!");
            } catch (e) {
              sap.m.MessageBox.error("Erro ao salvar: " + (e?.message || "Erro desconhecido."));
            }
          }
          
          
        
    });
});
