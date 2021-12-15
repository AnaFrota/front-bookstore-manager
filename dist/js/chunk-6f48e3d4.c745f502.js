(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f48e3d4"],{"29cd":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-card",{attrs:{rounded:"0"}},[a("v-data-table",{staticClass:"elevation-1 rounded-t",attrs:{headers:e.headers,items:e.livros,"items-per-page":e.pageSize,loading:e.loading,search:e.search,"hide-default-footer":""},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{staticClass:"indigo lighten-3 rounded-t",attrs:{flat:""}},[a("v-toolbar-title",{staticClass:"white--text"},[e._v("Livros")]),a("v-divider",{staticClass:"mx-4 white",attrs:{inset:"",vertical:""}}),a("v-text-field",{staticClass:"white--text",attrs:{"append-icon":"mdi-magnify",label:"Procurar...","single-line":"","hide-details":"",dark:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"indigo accent-1",dark:""}},"v-btn",o,!1),i),[e._v(" Novo Livro ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",{attrs:{width:"410",height:"690"}},[a("v-card-title",{staticClass:"indigo lighten-3"},[a("span",{staticClass:"text-h5 white--text"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-form",{ref:"form"},[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Nome",rules:[e.rules.required,e.rules.counterMin,e.rules.counterMax40],outlined:"",hint:"Digite o nome do livro",counter:"40",color:"indigo accent-1"},model:{value:e.livro.nome,callback:function(t){e.$set(e.livro,"nome",t)},expression:"livro.nome"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Autor",rules:[e.rules.required,e.rules.counterMin,e.rules.counterMax40],outlined:"",hint:"Digite o autor do livro",counter:"40",color:"indigo lighten-3"},model:{value:e.livro.autor,callback:function(t){e.$set(e.livro,"autor",t)},expression:"livro.autor"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-select",{attrs:{items:e.editoras,"item-text":"nome","item-value":"id",rules:[e.rules.required],label:"Escolha uma editora",outlined:"",color:"indigo lighten-3","item-color":"indigo lighten-3"},scopedSlots:e._u([{key:"selection",fn:function(t){return[e._v(" "+e._s(t.item.id)+" - "+e._s(t.item.nome)+" ")]}},{key:"item",fn:function(t){return[e._v(" "+e._s(t.item.id)+" - "+e._s(t.item.nome)+" ")]}}]),model:{value:e.livro.editoraId,callback:function(t){e.$set(e.livro,"editoraId",t)},expression:"livro.editoraId"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:"Lançamento","append-icon":"mdi-calendar",readonly:"",outlined:"",rules:[e.rules.required],hint:"Selecione a data de lançamento",color:"indigo lighten-3"},on:{blur:function(t){e.date=e.parseDate(e.dateFormatted)}},model:{value:e.livro.lancamento,callback:function(t){e.$set(e.livro,"lancamento",t)},expression:"livro.lancamento"}},"v-text-field",o,!1),i))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",scrollable:"",max:e.todayDate,color:"indigo lighten-3"},on:{input:function(t){e.menu=!1}},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Quantidade",outlined:"",hint:"Digite a quantidade do(e) livro(s)",rules:[e.rules.required,e.rules.requiredNumber],color:"indigo lighten-3"},model:{value:e.livro.quantidade,callback:function(t){e.$set(e.livro,"quantidade",t)},expression:"livro.quantidade"}})],1)],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:e.close}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.save}},[e._v(" Salvar ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5"},[e._v("Você realmente deseja excluir esse item?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancelar")]),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("Confirmar")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var i=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{size:"20"},on:{click:function(t){return e.editItem(i)}}},[e._v(" mdi-pencil ")]),a("v-icon",{attrs:{size:"20"},on:{click:function(t){return e.deleteItem(i)}}},[e._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}],null,!0)})],1),a("v-divider"),a("v-card",{attrs:{color:"indigo lighten-3 rounded-b",rounded:"0"}},[a("v-col",{attrs:{cols:"12"}},[a("v-row",[a("v-col",{attrs:{cols:"4",sm:"4"}},[a("v-select",{attrs:{items:e.pageSizes,label:"Itens por Página","item-color":"black",color:"black",dark:"",outlined:""},on:{change:e.handlePageSizeChange},model:{value:e.pageSize,callback:function(t){e.pageSize=t},expression:"pageSize"}})],1),a("v-col",{attrs:{cols:"12",sm:"8"}},[a("v-pagination",{attrs:{length:e.totalPages,"total-visible":"7","next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left",color:"indigo accent-1"},on:{input:e.handlePageChange},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)],1)],1)],1)],1)},o=[],n=a("3835"),r=a("5530"),l=(a("fb6a"),a("ac1f"),a("1276"),a("99af"),a("4d90"),a("3d20")),s=a.n(l),c=a("9249"),d=a("7937"),u={name:"App",data:function(){return{dialog:!1,dialogDelete:!1,loading:!0,menu:!1,search:"",livros:[],editoras:[],totallivros:0,page:1,totalPages:0,pageSize:5,pageSizes:[5,10,15],todayDate:(new Date).toISOString().slice(0,10),date:"",dateFormatted:"",livro:{id:null,nome:"",autor:"",lancamento:"",quantidade:"",editora:{id:"",nome:"",cidade:""},editoraId:""},headers:[{text:"ID",align:"start",sortable:!0,value:"id"},{text:"Nome",value:"nome"},{text:"Autor",value:"autor"},{text:"Editora",value:"editora.nome"},{text:"Lacamento",value:"lancamento"},{text:"Quantidade",value:"quantidade"},{text:"Ações",value:"actions",sortable:!1}],rules:{required:function(e){return!!e||"Campo obrigatório"},counterMin:function(e){return e&&e.length>=3||"No mínimo 3 caracteres"},counterMax40:function(e){return e&&e.length<=40||"No máximo 40 caracteres"},requiredEditora:function(e){return void 0==e||"Escolha uma editora"},requiredNumber:function(e){return!isNaN(e)||"Somente caracteres numéricos"}}}},computed:{formTitle:function(){return this.livro.id?"Editar livro":"Novo livro"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()},date:function(){this.livro.lancamento=this.formatDate(this.date)}},created:function(){this.initialize(),this.findAllEditoras()},methods:{initialize:function(){var e=this;this.loading=!0;var t=this.getRequestParams(this.page,this.pageSize);c["a"].findAll(t).then((function(t){var a=t.data,i=a.totalElements,o=a.content,n=a.totalPages;e.livros=o,e.totallivros=i,e.totalPages=n,e.loading=!1}))},getRequestParams:function(e,t){var a={};return e&&(a["page"]=e-1),t&&(a["size"]=t),a},handlePageChange:function(e){this.page=e,this.initialize()},handlePageSizeChange:function(e){this.pageSize=e,this.page=1,this.initialize()},editItem:function(e){this.livro.id=e.id,this.livro.nome=e.nome,this.livro.autor=e.autor,this.livro.quantidade=e.quantidade,this.livro.lancamento=e.lancamento,this.livro.editora=e.editora,this.livro.editoraId=e.editora.id,this.dialog=!0},deleteItem:function(e){this.livro=Object(r["a"])({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;c["a"].delete(this.livro.id).then((function(){s.a.fire("Livro deletado com sucesso","","success"),e.livro={},e.initialize()})).catch((function(){s.a.fire("Livro não pode ser deletado","Esse livro está vinculado a um aluguel","error")})),this.dialogDelete=!1},close:function(){this.dialog=!1,this.$refs.form.resetValidation(),this.dialog||(this.livro={})},closeDelete:function(){this.dialogDelete=!1},save:function(){var e=this;this.$refs.form.validate()&&(this.livro.id?c["a"].update(this.livro).then((function(){s.a.fire("Livro alterado com sucesso","","success"),e.livro={},e.initialize()})):c["a"].save(this.livro).then((function(){s.a.fire("Livro cadastrado com sucesso","","success"),e.livro={},e.initialize()})),this.livro={},this.close())},findAllEditoras:function(){var e=this;d["a"].findAllNotPaged().then((function(t){e.editoras=t.data}))},formatDate:function(e){if(!e)return null;var t=e.split("-"),a=Object(n["a"])(t,3),i=a[0],o=a[1],r=a[2];return"".concat(r,"-").concat(o,"-").concat(i)},parseDate:function(e){if(!e)return null;var t=e.split("/"),a=Object(n["a"])(t,3),i=a[0],o=a[1],r=a[2];return"".concat(r,"-").concat(i.padStart(2,"0"),"-").concat(o.padStart(2,"0"))}}},v=u,f=a("2877"),m=a("6544"),g=a.n(m),h=a("8336"),p=a("b0af"),b=a("99d9"),x=a("62ad"),k=a("a523"),_=a("8fea"),C=a("2e4b"),D=a("169a"),S=a("ce7e"),w=a("4bd4"),V=a("132d"),z=a("e449"),q=a("891e"),P=a("0fd9"),y=a("b974"),I=a("2fa4"),A=a("8654"),N=a("71d9"),E=a("2a7f"),T=Object(f["a"])(v,i,o,!1,null,null,null);t["default"]=T.exports;g()(T,{VBtn:h["a"],VCard:p["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VCol:x["a"],VContainer:k["a"],VDataTable:_["a"],VDatePicker:C["a"],VDialog:D["a"],VDivider:S["a"],VForm:w["a"],VIcon:V["a"],VMenu:z["a"],VPagination:q["a"],VRow:P["a"],VSelect:y["a"],VSpacer:I["a"],VTextField:A["a"],VToolbar:N["a"],VToolbarTitle:E["b"]})},7937:function(e,t,a){"use strict";var i=a("6a0b");t["a"]={findAll:function(e){return i["a"].get("/editoras",{params:e})},findAllNotPaged:function(){return i["a"].get("/editoras/all")},save:function(e){return i["a"].post("/editoras",e)},update:function(e){return i["a"].put("/editoras",e)},delete:function(e){return i["a"].delete("/editoras/".concat(e))}}},9249:function(e,t,a){"use strict";var i=a("6a0b");t["a"]={findAll:function(e){return i["a"].get("/livros",{params:e})},findAllNotPaged:function(){return i["a"].get("/livros/all")},save:function(e){return i["a"].post("/livros",e)},update:function(e){return i["a"].put("/livros",e)},delete:function(e){return i["a"].delete("/livros/".concat(e))}}}}]);
//# sourceMappingURL=chunk-6f48e3d4.c745f502.js.map