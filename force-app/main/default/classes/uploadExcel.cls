/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 07-30-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public without sharing class  uploadExcel {

    @AuraEnabled
    public static List<ExcelMapping__mdt> getExcelMapping() {
        return ExcelMapping__mdt.getall().values();
    }

    @AuraEnabled
    public static void createContacts(List<SObject> contacts) {
        System.debug('Contacts: ' + contacts);
        insert contacts;
        System.debug('Contacts created successfully: ' + contacts.size());
    }
}