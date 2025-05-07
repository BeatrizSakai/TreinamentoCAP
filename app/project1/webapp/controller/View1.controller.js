sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("firstapp.project1.controller.View1", {
        onInit() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("RouteView1").attachPatternMatched(this._onRouteMatched, this);
            const oFormModel = new sap.ui.model.json.JSONModel({
                cpf: "",
                nome: "",
                idade: ""
              });
              this.getView().setModel(oFormModel, "formModel");
        },
        _onRouteMatched: function () {
          const oTable = this.byId("pessoasTable");
          if (oTable) {
              oTable.getBinding("items").refresh();
          }
      },
        onPessoaPress: function (oEvent) {
          const oItem = oEvent.getSource();
          const oContext = oItem.getBindingContext();
          const cpf = oContext.getProperty("cpf");
      
          this.getOwnerComponent().getRouter().navTo("View2", { cpf });
      },      
      onSalvarPessoa: async function () {
        const oFormData = this.getView().getModel("formModel").getData();
        const oFormModel = this.getView().getModel("formModel");
      
        // Limpa estados
        ["cpf", "nome", "idade"].forEach((field) => {
          oFormModel.setProperty(`/${field}State`, "None");
          oFormModel.setProperty(`/${field}Text`, "");
        });
      
        let isValid = true;
      
        // Validação de CPF
        if (!/^\d{11}$/.test(oFormData.cpf)) {
          oFormModel.setProperty("/cpfState", "Error");
          oFormModel.setProperty("/cpfText", "CPF deve conter 11 dígitos numéricos.");
          isValid = false;
        }
      
        // Validação de nome
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(oFormData.nome) || oFormData.nome.length < 3) {
          oFormModel.setProperty("/nomeState", "Error");
          oFormModel.setProperty("/nomeText", "Nome deve ter pelo menos 3 letras, sem números.");
          isValid = false;
        }
      
        // Validação de idade
        const idade = parseInt(oFormData.idade);
        if (!idade || idade < 1) {
          oFormModel.setProperty("/idadeState", "Error");
          oFormModel.setProperty("/idadeText", "Idade deve ser maior que zero.");
          isValid = false;
        }
      
        if (!isValid) {
          sap.m.MessageBox.warning("Corrija os erros antes de salvar.");
          return;
        }
      
        try {
          const oModel = this.getView().getModel();
          const oBinding = oModel.bindList("/pessoa");
          const oContext = oBinding.create({
            cpf: oFormData.cpf,
            nome: oFormData.nome,
            idade
          });
      
          await oContext.created();
      
          sap.m.MessageToast.show("Pessoa criada com sucesso!");
          oFormModel.setData({ cpf: "", nome: "", idade: "" });
          this.byId("pessoasTable").getBinding("items").refresh();
      
        } catch (err) {
          sap.m.MessageBox.error("Erro ao salvar pessoa. Verifique os dados ou tente novamente.");
        }
      }
          
      ,
      
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
