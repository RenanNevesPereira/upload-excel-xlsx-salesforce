# 📊 Upload e Leitura de Arquivo Excel (.xlsx) com LWC no Salesforce

Este projeto é baseado no artigo "[Salesforce: Parse Excel (.xlsx) File with LWC](https://medium.com/@maxeuler/salesforce-parse-excel-xlsx-file-with-lwc-78bf44e43c2e)" escrito por [@maxeuler](https://medium.com/@maxeuler), e demonstra como realizar o upload e a leitura de arquivos `.xlsx` utilizando **Lightning Web Components (LWC)** no Salesforce.

## 📌 Objetivo

Permitir que usuários façam upload de arquivos `.xlsx` e visualizem os dados extraídos diretamente na interface Salesforce usando LWC, sem necessidade de Apex para o parsing do conteúdo do Excel.

## 🚀 Tecnologias Utilizadas

- Salesforce Platform
- Lightning Web Components (LWC)
- JavaScript
- Biblioteca [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs)

## 📁 Estrutura do Projeto

```
force-app/
└── main/
    └── default/
        └── lwc/
            └── uploadExcel/
                ├── uploadExcel.html
                ├── uploadExcel.js
                └── uploadExcel.js-meta.xml
```

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale a biblioteca SheetJS:

Copie o arquivo `xlsx.full.min.js` da [build oficial do SheetJS](https://github.com/SheetJS/sheetjs) para a pasta `staticresources/` do seu projeto e crie o Static Resource no Salesforce.

3. Importe o projeto em seu ambiente Salesforce usando VS Code + Salesforce CLI ou outro método de sua preferência.

4. Crie uma aba ou adicione o componente `uploadExcel` a uma página Lightning App Builder.

## 🧠 Como Funciona

- O componente lê o arquivo `.xlsx` usando `FileReader`.
- Utiliza o SheetJS para converter o conteúdo para JSON.
- Os dados extraídos são renderizados em uma `<lightning-datatable>`.

## 📷 Exemplo

![upload demo](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Xn80tKoBYPdazIQXl8tPqg.gif)

Fonte: [Artigo no Medium](https://medium.com/@maxeuler/salesforce-parse-excel-xlsx-file-with-lwc-78bf44e43c2e)

## 🧩 Possíveis Melhorias

- Enviar os dados processados para Apex (gravar em objetos personalizados).
- Tratar múltiplas abas de planilhas.
- Validação de formato antes do upload.

## 🙏 Créditos

Projeto baseado em:

- Artigo: [Salesforce: Parse Excel (.xlsx) File with LWC](https://medium.com/@maxeuler/salesforce-parse-excel-xlsx-file-with-lwc-78bf44e43c2e)
- Repositório original: [github.com/maxeuler](https://github.com/maxeuler)

## 📄 Licença

Este projeto segue a licença do repositório original (se aplicável). Consulte o [repositório do autor](https://github.com/maxeuler) para mais detalhes.
