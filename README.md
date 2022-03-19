# ionic-app-project

Indledning:
I vores projekt, har vi i forløbet kreeret en Mobile Web App, ved hjælp af ionic react løsningen. Vi har udarbejdet en Restaurant app, hvor du kan login med egen bruger ved hjælp af firebase, hvor de bruger som logger ind, bliver lagret i firebase’s database. Ideen med hele app’en er at du som bruger kan, se hvilke restauranter der er nær dig. Man kan udforske de lokale restauranter i Århus, som der er blevet tilkoblet ens lokation. Man se restauranternes menuer og anmeldelser og ens egen reviews. For at vi kan få det her til at ske, gør vi også brug af CRUD, hvor du som bruger, kan Oprette, Slette, Hente og Opdatere Reviews. Enhver bruger kan ændre, i sin profil med billede, navn, mail og kode, så kontoen bliver mere personligt anlagt.

Thinking in React:
Vores app er bygget op således at vi køre vores projekt i ionic, hvor vi har struktureret mapperne med componets/Komponenter som hjælper os til hurtigt at konstruere grænsefladen af vores menu, restaurant lister og reviews. Alle vores componets bliver connected til vores sider/pages som er med til at app’en kan kører de forskellige features og filsystemer. Til hver af vores sider er der tilknyttet en css fil, med navnet på den samme fil, dette har gjort det lettere for os at style hele vores apps sider. Den måde vi bruger react, er at vi bruger hooks funktioner i vores kode.
En Hook er en speciel funktion, der lader dig "hooke" ind i React-funktioner. De hooks vi bruger er “useState, useEffect”. “useState” lader en tilføje eller “hooke” en react-tilstand til funktionskomponenter. “useEffect” vil referere til funktionen som vores "effekt, så vi kan ændre tingene i vores editProfilPage fil. Det vi også bruger React til i vores ionic projekt, er at vi kan opbygge vores mobile app i flere platforme, som iOS og android, så vi får et bredt publikum af bruger, der kan bruge app’en. 
De CLI commands vi bruger er fx npm run og npm serve, som bruges til at vi kan køre app’en lokalt i vores lokalhost på computeren. Dette gør at vi også kan køre vores ionic projekt, for at se hjemmesiden i en helhed og hvor langt vi er kodemæssigt. Vi gør brug af React capacitor, som bruges til at vi kan køre app’en både i Andriod & ios.


Design:
Vi har i vores app, gået meget op i vores usability / anvendeligheden, så vi kan se hvor nemt det er for brugeren at bruge produktet. For at vi kan gøre dette muligt, har vi gjort brug af de 10 grundprincipper fra den heuristiske evaluering. Grunden til at vi har brugt denne metode, er fordi man kan bruge en heuristisk evaluering tidlig i ens design proces, så man undgår problemer senere hen i processen.

#1 Visibility of system status:
Her kunne vi godt gøre brug af flere informationer, da der ikke en form for besked på app’en der fx fortæller brugeren om man har lavet reviews eller er logget ind med popup advarsel. 

#2 Match between system and the real world:
Her kunne vi godt gøre brug er et on-borading system, så det bliver lettere for brugeren at se hvad app’en går ud på. Især vigtigt for error-beskeder. 

#3 User control & freedom:
Her kunne det være godt hvis brugeren havde mulighed for at laver om i det handlinger de foretager sig. fx hvis man er igang med at slette et review på en restaurant, skal der være en ”er du sikker?”-besked, da folk har tendens til at lave fejl.

#4 Consistency & standards: 
Brugere skal ikke spekulere på, om forskellige ord, situationer eller handlinger betyder det samme. 

#5 Error prevention: 
Vi har ingen Errors lige nu, men det er vigtigt at huske på i senere perspektiveringer til app’en, at det skal holdes på et minimum, de bedste designs forhindrer omhyggeligt, at der opstår problemer i første omgang.

#6 Recognition rather than recall:
Brugeren skal ikke skulle huske information fra en del af grænsefladen til en anden. Så derfor har vi gjort det meget klart i vores design hvad der er synligt i forhold til menu og bookninger.

#7 Flexibility & efficiency of use:
Vi har lavet vores navigation således at det er hurtigt at finde rundt på app’en gennem vores burgerbar og tilbage knapper, så det tillader brugere at skræddersy hyppige handlinger. 
#8 Aesthetic & minimalist design:
Her har vi holdt at tekst og for mange forstyrrende elementer på et minimum, da grænseflader bør ikke indeholde oplysninger, der er irrelevante eller sjældent nødvendige.

#9 Recognition, diagnose & recover from errors:
Her er det vigtigt at holde vores Errors-advarseler i et almindeligt sprog så det bliver lettere for brugeren at forstå de fejl der sker. 

#10 Help & documentation:
Her ville det også være godt til senere videreudvikling af app’en at gøre brug af on-bording eller step-by-step, så brugeren ikke møder navigationens mæssige udfordringer, og har lettere ved at udfører deres opgaver.


