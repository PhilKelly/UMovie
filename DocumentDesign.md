**Team 03**
=======
Lancer l'application � partir de index.html

Page Actor
----------

**Urls**: 

 - team03/index.html#actors
 - team03/index.html#/actors/:id

**Explications**: L'onglet Actor redirige vers la recherche d'un acteur. Il suffit alors d'entrer dans la recherche les mots cl�s concernant l'acteur recherch� et d'appuyer soit sur la loupe ou sur "Enter".
                  Lorsque la liste des acteurs trouvés est affich�e, il suffit de cliquer sur celui qui nous int�resse. La page de recherche est alors remplac�e par celle qui permet de voir les informations de l'acteur ainsi qu'une liste de ses films.
                  La recherche dans cette page est munie d'un module d'auto-complétion. (L'auto-complétion fonctionne, mais pour une raison que l'on ignore les choix ne s'affichent pas).


Page Movie
----------

**Urls:**

 - team03/index.html#movie
 - team03/index.html#movie/:id
 - team03/index.html#movie/addToWatchlist/:id

**Explication:** L'onglet Movie redirige vers la recherche d'un film. Il suffit alors d'entrer dans la recherche les mots cl� concernant le titre du film recherch� et d'appuyer soit sur la loupe ou sur "Enter".
                 Lorsque la liste des films trouv�s est affich�e, il suffit de cliquer sur celui qui nous int�resse. La page de recherche est alors remplac�e par celle qui permet de voir les informations du film ainsi qu'une option pour ajouter le pr�sent film � une watchlist existante.
                 En cliquant sur le lien pour afficher une watchlist, on arrive sur une page ou toutes les watchlists sont affich�es et ou on a qu'a cliquer sur le boutton associ� �la watchlist voulue pour ajouter le film dans celle-ci.
                 La recherche dans cette page est munie d'un module d'auto-complétion. (L'auto-complétion fonctionne, mais pour une raison que l'on ignore les choix ne s'affichent pas).

Page TvShow
-----------

**Urls:** 

 - team03/index.html#tvshows
 - team03/index.html#/tvshows/:id
 
**Explications:** L'onglet Tv Show redirige vers la recherche d'une s�rie t�l�. Il suffit alors d'entrer dans la recherche les mots cl� concernant la s�rie recherch�e et d'appuyer soit sur la loupe ou "Enter".
                  Lorsque la liste des s�ries t�l� trouv�es est affich�e, il suffit de cliquer sur celle qui nous int�resse. La page de recherche est alors remplac�e par celle qui permet de voir les informations de la s�rie ainsi qu'une liste de ses �pisodes.
                  La recherche dans cette page est munie d'un module d'auto-complétion. (L'auto-complétion fonctionne, mais pour une raison que l'on ignore les choix ne s'affichent pas).

Page Watchlist
--------------

**Urls:** 

 - team03/index.html#/watchlists
 - team03/index.html#/watchlist/:watchlistId/movies
 - team03/index.html#/watchlist/:watchlistId/addMovies

**Explications:** Lorsque l'on clique sur l'onglet Watchlist, nous sommes redirig�s vers la liste des watchlists du serveur (Pas regroup�es en terme d'utilisateur). Pour créer une watchlist, il suffit d'entrer
                  un nom dans le label "Name" et d'appuyer sur "Create Watchlist". Les watchlists peuvent �tre supprim�es en appuyant sur le bouton "Delete Watchlist" qui se trouve sur la ligne de la watchlist � supprimer.
                  Pour modifier le nom d'une watchlist, il suffit de changer le nom de celle-ci dans son propre label et d'appuyer sur "Enter" quand le nom est bien rentr�.
                  Par la suite, il est possible de consulter les films d'une watchlist en appuyant sur "Show movies".
                  Dans show movies, il est possible d'ajouter un film en appuyant sur "Add movies to this watchlist". Il suffit alors de rechercher le film desir� et d'appuyer sur "Add this movie to watchlist" pour le film recherch�.
                  Il est aussi possible de cliquer sur le nom du film pour avoir sa description et d'ajouter autant de fois que d�sir� les films de cette recherche. Lorsque l'ajout est termin�, il suffit de cliquer sur "Return to watchlist".
                  De retour � la liste des films de la watchlist, il est possible d'appuyer sur "Remove from watchlist" pour enlever un film de la watchlist.


Page User/My Profile
--------------

**Urls:**

 - team03/index.html#/users/:id'
 - team03/index.html#/users/:id/watchlists
 - team03/index.html#/users/:id/following
 - team03/index.html#/users/:id/search

**Explications:** Lorsque l'on clique sur le nom de l'utilisateur en haut � droite, nous avons la posibilit� de s�lectionner My Profile. Cette action nous redirige vers le profile de l'utilisateur courant de l'application.
                  La liste des watchlists de l'utilisateur est automatiquement affich�e. En cliquant sur delete, la watchlist correspondante est supprim�e seulement lorsque l'utilisateur est sur son propre profile.
                  Il est toujours possible de revenir � cet liste en cliquant sur Watchlists (en dessous des informations du profil).
                  En cliquant sur Friends, l'utilisateur a acc�s � sa liste d'amis. Lorsque l'utilisateur est sur son propre profile, il a  la possibilit� de supprimer des amis de sa liste.
                  L'onglet Find User permet la recherche d'autres utilisateur. Il suffit d'inscrire le nom d'utilisateur recherch�, d'appuyer sur la loupe et s�lectionner un utilisateur.
                  Nous somme alors redirig� vers le profile de l'utilisateur s�lectionn�. M�me si les onglet sont pr�sent, il n'est par contre pas possible de supprimer des watchlists ou des firends de la liste d'un autre utilisateur.
                  Si l'utilisateur courant n'est pas amis avec l'utilisateur affich� � l'�cran, un bouton Follow lui est offert pour le suivre. Si non, un bouton UnFollow appara�t lorsque c'est un ami pr�sent dans notre liste. ùL'avatar affiché dans la barre de navigation et dans le profile provient de Gravatar.
				  
Fonctionnalité recherche globale
--------------
 - Partout
 
**Explications:** Lorsque l'on saisie du texte dans la recherche globale et que l'on clique soit sur la loupe soit sur "enter", les résultats de recherche s'affichent pour chaque catégorie: Movies, Actors, 
				  Users et TvShows. Il est alors possible de cliquer sur chaque movie, actor, user ou tv-show pour être redirigé vers sa page personnalisée. Il est aussi possible, directement dans la page de 
				  résultat de la recherche globale, de "follow" et "unfollow" un autre user. De plus, il est possible d'ajouter un movie ou un tvShow à une watchlist.
				  
				  