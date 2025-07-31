# 📊 Upload e Leitura de Arquivo Excel (.xlsx) com LWC no Salesforce

Este projeto é baseado no artigo "[Salesforce: Parse Excel (.xlsx) File with LWC](https://medium.com/@maxeuler/salesforce-parse-excel-xlsx-file-with-lwc-78bf44e43c2e)" escrito por [@maxeuler](https://medium.com/@maxeuler), e demonstra como realizar o upload, leitura e inserção de dados a partir de arquivos `.xlsx` utilizando **Lightning Web Components (LWC)**, **Apex** e **Custom Metadata Types**.

## 📌 Objetivo

Permitir que usuários façam upload de arquivos `.xlsx`, visualizem os dados extraídos e insiram registros automaticamente no Salesforce — tudo isso via uma interface amigável construída com LWC e com validações dinâmicas via metadata.

## 🚀 Tecnologias Utilizadas

- Salesforce Platform
- Lightning Web Components (LWC)
- Apex (para persistência de dados e leitura de metadata)
- Custom Metadata Types
- JavaScript
- Bibliotecas:
  - [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) — leitura de arquivos Excel
  - [PapaParse](https://www.papaparse.com/) — parsing de CSV gerado pelo SheetJS

## 📁 Estrutura do Projeto

```
force-app/
└── main/
    └── default/
        └── classes/
        │   ├── uploadExcel.cls
        │   └── uploadExcel.cls-meta.xml
        └── lwc/
        │   └── uploadExcel/
        │       ├── uploadExcel.html
        │       ├── uploadExcel.js
        │       └── uploadExcel.js-meta.xml
        └── objects/
        │   └── ExcelMapping__mdt/
        │       ├── ExcelMapping__mdt.object-meta.xml
        │       └── fields/
        │           └── Fieldtype__c.field-meta.xml
        └── staticresources/
            ├── PapaParse.js
            ├── PapaParse.resource-meta.xml
            ├── sheetjs.resource-meta.xml
            └── sheetjs/
                └── sheetjs/
                    ├── sheetjs.js
                    └── sheetmin.js
```

## 🧠 Como Funciona

1. **Upload do Arquivo:**
   O usuário seleciona um arquivo `.xlsx` via `<lightning-input type="file">`. O componente lê o conteúdo com `FileReader`.

2. **Conversão XLSX → CSV:**
   A biblioteca **SheetJS** converte a primeira aba da planilha para CSV.

3. **Conversão CSV → Objetos JS:**
   O CSV é processado pela **PapaParse**, que gera um array de objetos JavaScript (linhas da planilha).

4. **Mapeamento Dinâmico dos Campos:**
   As colunas da planilha são mapeadas dinamicamente para os campos do Salesforce por meio de **Custom Metadata Types** (`ExcelMapping__mdt`).

5. **Formatação dos Dados:**
   Cada célula da planilha é transformada conforme o tipo de dado definido no campo `Fieldtype__c` da metadata (ex: String, Date).

6. **Inserção de Registros:**
   Após validação, os dados são enviados via Apex para inserção no objeto desejado (ex: `Contact`).

## 🧩 Requisitos Atendidos

- Upload e leitura de arquivos `.xlsx`
- Compatibilidade com múltiplos tipos de dados (via metadata)
- Evita necessidade de conversão manual para `.csv`
- Solução amigável para usuários não técnicos

## 📷 Exemplo

![upload demo](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Xn80tKoBYPdazIQXl8tPqg.gif)

Fonte: [Artigo no Medium](https://medium.com/@maxeuler/salesforce-parse-excel-xlsx-file-with-lwc-78bf44e43c2e)

## 📌 Possibilidades de Expansão

- Suporte a múltiplas abas do Excel
- Validação prévia dos dados
- Interface para revisar registros antes de enviar
- Suporte a relacionamentos entre objetos
- Mensagens de erro por linha em caso de falha na inserção

## 🙏 Créditos

Projeto baseado em:

- Artigo: [Salesforce: Parse Excel (.xlsx) File with LWC](https://medium.com/@maxeuler/salesforce-parse-excel-xlsx-file-with-lwc-78bf44e43c2e)
- Repositório original: [github.com/maxeuler](https://github.com/maxeuler)

## 📄 Licença

Este projeto segue a licença do repositório original (se aplicável). Consulte o [repositório do autor](https://github.com/maxeuler) para mais detalhes.