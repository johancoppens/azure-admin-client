## Azure AD Application Creation

Log in op <https://portal.azure.com/>

Ga naar Azure Active Directory beheren > App-registraties > + Nieuwe registratie

Naam: Geef het een naam (bvb azure-admin-client)

Alleen accounts in deze organisatiemap (alleen llnedugolo - één tenant)

Klik Registreren

Voor de configuratie van azure-admin-client heb je nodig:

* Toepassings-id (client-id)
* Map-id (tenant-id)
* Client secret

Kopieer deze om later het config.js bestand te maken (op basis van config.template.js)

Ga naar Certificaten en geheimen in linker menu > + Nieuw clientgeheim

Geef het een naam bvb ms-graph-client-secret, kies de verlooptijd Nooit en klik op Toevoegen

Ga naar API-machtigingen in linker menu > Een machtiging toevoegen > Microsoft Graph

Selecteer daar Toepassingsmachtigingen

Selecteer vervolgens de relevante machtigingen

Voor deze toepassing moeten deze machtigingen geactiveerd zijn:

* User.ReadWrite.All
* Group.ReadWrite.All
* [TODO] Aanvullen

Klik daarna op Beheerderstoestemming verlenen voor lln.edugolo.be, Ja

## Extra stappen om azure-admin-client de toestemming te geven om paswoorden te wijzigen

* Ga naar Azure Active Directory
* Ga naar Rollen en Beheerders
* Zoek naar de rol Wachtwoordbeheerder
* Klik op Toewijzing toevoegen
* Plak hier de clientId van uw toepassing




