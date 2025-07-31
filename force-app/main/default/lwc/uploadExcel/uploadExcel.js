import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import getMapping from '@salesforce/apex/uploadExcel.getExcelMapping';
import createContacts from '@salesforce/apex/uploadExcel.createContacts';

import PARSER from '@salesforce/resourceUrl/PapaParse';
import sheetjs from '@salesforce/resourceUrl/sheetjs';

let XLS = {};

export default class UploadExcel extends LightningElement {

    @api recordId;
    contacts
    mapping = {};

    connectedCallback() {
        this.loadScripts();
        this.fillMetadataMapping();
        console.log('Record ID:', this.recordId);
    }

    loadScripts() {
        Promise.all([
            loadScript(this, sheetjs + '/sheetjs/sheetmin.js'),
            loadScript(this, PARSER)
        ]).then(() => {
            XLS = XLSX;
        })
    }

    fillMetadataMapping() {
        getMapping().then(res => {
            console.log('Metadata Mapping:', res);
            res.forEach(record =>
                this.mapping[record['MasterLabel']] =  {
                    apiName: record['DeveloperName'],
                    dataType: record['FieldType__c']
                }
            );
        });
    }

    handleUploadFinished(event){
        const uploadedFiles = event.detail.files;
        if(uploadedFiles.length > 0) {
            this.generateCSVFromExcel(uploadedFiles[0])
        }
    }

    generateCSVFromExcel(file) {
        let reader = new FileReader();
        reader.onload = event => {
            let data = event.target.result;
            let workbook = XLS.read(data, {
                type: 'binary'
            });
            let csvData = XLS.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
            this.parseCSV(csvData);
        };
        reader.onerror = error => {
            console.log('Error reading file 1:', error);
        };
        reader.readAsBinaryString(file);
    }

    parseCSV(csvFile) {
        Papa.parse(csvFile, {
            quoteChar: '"',
            delimiter: '',
            header: 'true',
            encoding: 'utf-8',
            complete: results => {
                this.csvParserCompletionHandler(results);
            },
            error: error => {
                console.log('Error reading file 2:', error);
            }
        });
    }

    csvParserCompletionHandler(results) {
        console.log('Results:', results);
        const rows = results.data;
        this.contacts = rows.map(row => this.processRowData(row));
        this.contacts = this.contacts.filter(contact => contact['LastName']);

        this.callServerToCreateContacts();
    }

    processRowData(row) {
        for (const objPair of Object.entries(row)) {
           this.modifyDataProperties(objPair, row);
        }

        row['sobjectType'] = 'Contact';
        row['AccountId'] = this.recordId;

        return row;
    }

    modifyDataProperties([key, value], row) {
        delete row[key];

        const metadata = this.mapping[key.trim()];
        if (!metadata) return;

        const fieldAPIName = metadata['apiName'];
        const dataType = metadata['dataType'];

        if (dataType == 'Date') {
            value =  new Date(value);
        }

        row[fieldAPIName] = value;

        return row;
    }

    callServerToCreateContacts() {
        createContacts({ contacts: this.contacts })
            .then(() => {
                console.log('Contacts created successfully');
            }).catch(error => {
                // handle errors

            });
    }
}