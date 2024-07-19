# Requirements

The requirements for Dangerous Goods are strongly based on the Cargo-XML message xSDG that contains all required information for the transport of dangerous goods. The details of the information can be found in the Cargo-XML toolkit and thus will not be fully transcribed in this document.

# Chosen approach
The different data required in the xSDG message are split among objects **Piece, Product, Item** and some dedicated objects: **DgProductRadioactive, DgRadioactiveIsotope and DgDeclaration**. A focus is made on making sure that all legal data required are within ONE Record data model.

As Dangerous Goods cargo require specific data, **ProductDg, ItemDg and PieceDg** objects are added to simplify the data model, they are subtypes of Product, Item and Piece objects.

In details information related to the packaging concept of Dangerous Goods is added on the PieceDg object to fully integrate these requirements.

**DgProductRadioactive and DgRadioactiveIsotope** objects contain specific data related to radioactive products and are linked to ProductDg object.

**DgDeclaration** object is used to contain data related to the existing Dangerous Goods Declaration, it is linked to one or many **PieceDg** objects.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540859-0dc548e5-2bc4-4088-87ce-79252e835cba.png"></p>


# Data model
All Dangerous Goods requirements result in the creation of new subtypes or objects, they are described in details below.
 
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540819-4143145e-5957-493c-96fd-2d2e398f58d4.png"></p>
