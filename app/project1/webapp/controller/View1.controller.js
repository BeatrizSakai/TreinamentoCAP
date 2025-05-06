sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("firstapp.project1.controller.View1", {
        onInit() {
            const oFormModel = new sap.ui.model.json.JSONModel({
                cpf: "",
                nome: "",
                idade: ""
              });
              this.getView().setModel(oFormModel, "formModel");
        },
        onSalvarPessoa: async function () {
            try {
              const oFormData = this.getView().getModel("formModel").getData();
              const oModel = this.getView().getModel();
          
              const oBinding = oModel.bindList("/pessoa");
          
              const oContext = oBinding.create({
                cpf: oFormData.cpf,
                nome: oFormData.nome,
                idade: parseInt(oFormData.idade)
              });
          
              await oContext.created();
          
              sap.m.MessageToast.show("Pessoa criada com sucesso!");
          
              this.getView().getModel("formModel").setData({
                cpf: "", nome: "", idade: ""
              });
          
              this.byId("pessoasTable").getBinding("items").refresh();
          
            } catch (error) {
                // Caso o erro tenha detalhes de validação
                if (error.cause && error.cause.details && error.cause.details.length > 0) {
                  const messages = error.cause.details.map((e) => e.message).join("\n");
                  sap.m.MessageBox.error("Erros de validação:\n" + messages);
                } else if (error.message) {
                  sap.m.MessageBox.error("Erro:\n" + error.message);
                } else {
                  sap.m.MessageBox.error("Erro desconhecido ao salvar.");
                }
              }
              
        },
        delete: async function (oEvent) {
            const oItem = oEvent.getSource().getBindingContext(); // contexto do item na tabela
            const oModel = this.getView().getModel(); // OData V4
        
            // Diálogo de confirmação
            const dialog = new sap.m.Dialog({
                title: "Confirmação de Exclusão",
                type: "Message",
                content: new sap.m.Text({ text: "Tem certeza que deseja excluir esta pessoa?" }),
                beginButton: new sap.m.Button({
                    text: "Sim",
                    type: "Emphasized",
                    press: async () => {
                        dialog.close();
                        try {
                            await oItem.delete(); // deleta via OData V4
                            sap.m.MessageToast.show("Pessoa excluída com sucesso.");
                            this.byId("pessoasTable").getBinding("items").refresh();
                        } catch (error) {
                            sap.m.MessageBox.error("Erro ao excluir:\n" + error.message);
                        }
                    }
                }),
                endButton: new sap.m.Button({
                    text: "Cancelar",
                    press: () => dialog.close()
                }),
                afterClose: () => dialog.destroy()
            });
        
            dialog.open();
        }      
    });
});
