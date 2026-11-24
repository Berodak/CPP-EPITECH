/* ============ CONTENU C++ : MODULES 0 à 5 ============ */
const MODULES=[];
const TERMS={};

/* Bac à sable : un mini-projet C++ façon Epitech à explorer */
TERMS.sandbox={user:'etudiant',host:'epitech',motd:'<span class="hl">Bac à sable Unix.</span> <span class="dim">Epitech, c\'est Linux + terminal. Entraîne-toi. Commence par :</span> cat LISEZMOI.txt',
fs:{
'/home/etudiant/LISEZMOI.txt':'Bienvenue sur ta machine (comme un dump Epitech) !\nUn projet C++ typique est range comme ca :\n  ls              liste les fichiers\n  cd src          entre dans un dossier\n  cat main.cpp    affiche un fichier\n  cd ..           remonte\n  cat Makefile    le fichier qui compile le projet\nExplore le dossier my_project. help = toutes les commandes.',
'/home/etudiant/my_project/Makefile':'NAME\t= my_program\nSRC\t= src/main.cpp src/compute.cpp\nCXX\t= g++\nCXXFLAGS = -Wall -Wextra -Werror -std=c++17\n\nall: $(NAME)\n\n$(NAME):\n\t$(CXX) $(CXXFLAGS) $(SRC) -o $(NAME)\n\nclean:\n\trm -f *.o\n\nfclean: clean\n\trm -f $(NAME)\n\nre: fclean all',
'/home/etudiant/my_project/src/main.cpp':'#include <iostream>\n#include "compute.hpp"\n\nint main()\n{\n    std::cout << "Resultat : " << addition(2, 3) << std::endl;\n    return 0;\n}',
'/home/etudiant/my_project/src/compute.cpp':'#include "compute.hpp"\n\nint addition(int a, int b)\n{\n    return a + b;\n}',
'/home/etudiant/my_project/include/compute.hpp':'#ifndef COMPUTE_HPP_\n#define COMPUTE_HPP_\n\nint addition(int a, int b);\n\n#endif /* COMPUTE_HPP_ */',
'/home/etudiant/.norme.txt':'Petit rappel de la norme Epitech :\n- 25 lignes maximum par fonction\n- 80 colonnes maximum par ligne\n- pas plus de 5 fonctions par fichier\nLe verificateur officiel s\'appelle la "coding style".'
}};

/* ---------- MODULE 0 ---------- */
MODULES.push({id:'m0',titre:'Démarrage',cat:'Les bases',badge:'Entrée en piscine',
desc:'Pourquoi le C++, ce qu\'est la Piscine Epitech, et comment apprendre pour réussir le Tek2.',
intro:'<p>Avant d\'écrire du code, on pose le décor : à quoi sert le C++, comment Epitech t\'évalue, et la méthode pour progresser sans te décourager.</p>',
lessons:[
{id:'m0l1',titre:'Le C++ et toi',duree:'10 min',
contenu:`
<p>Tu as déjà fait du C en première année. Le <b>C++</b> est son grand frère : il garde toute la puissance du C et ajoute une façon d'organiser le code qui change tout — la <b>programmation orientée objet</b> (POO). C'est LE thème central de ta deuxième année.</p>
<div class="box kid"><b>Image simple</b><p>En C, tu construis une maison brique par brique, tout à la main. En C++, tu as en plus des <b>pièces préfabriquées</b> (des « objets ») que tu assembles. Pour de gros projets, c'est beaucoup plus clair et plus rapide.</p></div>
<h2>Pourquoi le C++ est partout</h2>
<ul>
<li><b>Jeux vidéo</b> : la plupart des gros moteurs (Unreal...) sont en C++.</li>
<li><b>Logiciels rapides</b> : navigateurs, logiciels de montage, finance, robotique.</li>
<li><b>Systèmes embarqués</b> : là où chaque milliseconde compte.</li>
</ul>
<p>Le C++ est <b>rapide</b> parce qu'il est compilé et proche de la machine, mais il te laisse aussi écrire du code <b>organisé</b> et réutilisable. C'est ce double visage qui en fait un langage roi.</p>
<div class="box pro"><b>Ce que tu vas construire cette année</b><p>À Epitech, en deuxième année, tu feras des projets comme un <b>simulateur de circuits logiques</b> (NanoTekSpice), une <b>borne d'arcade</b> avec des jeux et des bibliothèques interchangeables (Arcade), ou encore une <b>pizzeria</b> qui gère plusieurs tâches en même temps (Plazza). Tous reposent sur les bases que tu apprends ici.</p></div>
<p>Cadeau de bienvenue, ton premier « drapeau » à valider dans le défi : <b class="mono" style="color:var(--accent)">CPP{bienvenue_a_la_piscine}</b>.</p>
`,
quiz:[
{q:'Qu\'ajoute surtout le C++ par rapport au C ?',o:['rien','la programmation orientée objet (les objets)','des couleurs','Internet'],a:1},
{q:'Pourquoi le C++ est-il rapide ?',o:['il est compilé et proche de la machine','il est écrit en français','il utilise le cloud','il est interprété'],a:0},
{q:'Le thème central de ta deuxième année à Epitech, c\'est...',o:['le web','la programmation orientée objet','le tableur','le réseau uniquement'],a:1},
{q:'Lequel est un vrai projet de 2e année Epitech ?',o:['NanoTekSpice (simulateur de circuits)','un site WordPress','un jeu sur téléphone','une base Excel'],a:0}],
chal:{titre:'Premier drapeau',xp:20,niveau:'très facile',enonce:'<p>Comme dans un CTF, chaque défi te demande une <b>réponse exacte</b>. Celui-ci est un échauffement : le « drapeau » de bienvenue est écrit dans le cours ci-dessus. Recopie-le dans la case.</p>',flag:'CPP{bienvenue_a_la_piscine}',hints:['Relis la dernière phrase du cours, juste avant le quiz.'],bravo:'Tu es officiellement en piscine.'}},

{id:'m0l2',titre:'Epitech, la Piscine et la norme',duree:'12 min',
contenu:`
<p>À Epitech, on n'apprend pas en écoutant un prof : on apprend en <b>faisant</b>. La deuxième année s'ouvre souvent par une <b>Piscine C++</b> (ou « pool ») : plusieurs jours intenses d'exercices pour découvrir la programmation orientée objet à travers le C++.</p>
<div class="box kid"><b>C'est quoi « la Piscine » ?</b><p>Une période courte et intense où tu enchaînes des exercices du matin au soir. On t'y jette « dans le grand bain » : tu cherches, tu bloques, tu demandes à tes camarades, tu finis par comprendre. C'est dur, mais c'est là qu'on progresse le plus vite.</p></div>
<h2>Les règles du jeu Epitech</h2>
<ul>
<li><b>L'autonomie</b> : pas de cours magistral. Le sujet, le manuel (<code>man</code>), Internet et tes camarades sont tes profs.</li>
<li><b>La rigueur</b> : un programme qui « marche presque » ne marche pas. Il doit compiler sans erreur et faire exactement ce que le sujet demande.</li>
<li><b>La norme (coding style)</b> : Epitech impose une façon d'écrire le code, vérifiée par un outil. Exemples classiques : <b>25 lignes maximum par fonction</b>, <b>80 colonnes maximum par ligne</b>, pas plus de 5 fonctions par fichier. Du code qui viole la norme est pénalisé, même s'il fonctionne.</li>
<li><b>Jamais de triche</b> : copier le code d'un autre est sévèrement sanctionné. S'inspirer d'explications, oui ; copier, non.</li>
</ul>
<div class="box warn"><b>À retenir</b><p>Le but de la Piscine n'est pas de tout réussir, mais de <b>t'habituer à chercher seul et à ne pas abandonner</b>. Celui qui bloque, cherche, et finit par trouver apprend dix fois plus que celui qui copie.</p></div>
`,
quiz:[
{q:'Comment apprend-on surtout à Epitech ?',o:['en écoutant des cours magistraux','en faisant des projets et en cherchant soi-même','en regardant des vidéos','par cœur'],a:1},
{q:'La « norme » Epitech, c\'est...',o:['la vitesse du programme','des règles sur la façon d\'écrire le code, vérifiées par un outil','le nom d\'un projet','une note sur 20'],a:1},
{q:'Une limite classique de la norme Epitech ?',o:['25 lignes max par fonction','1000 lignes par fonction','pas de commentaires','pas de boucles'],a:0},
{q:'Un programme qui « marche presque » à Epitech...',o:['suffit','ne suffit pas : il doit compiler et faire exactement ce qui est demandé','donne la moyenne','est accepté si c\'est joli'],a:1}]},

{id:'m0l3',titre:'La méthode pour réussir',duree:'12 min',
contenu:`
<p>Le C++ fait peur au début (surtout les pointeurs et les objets). Voici comment l'apprendre sans te noyer.</p>
<ol>
<li><b>Un peu chaque jour.</b> 1 heure par jour vaut mieux que 8 h le dimanche. Le cerveau a besoin de dormir sur ce qu'il apprend.</li>
<li><b>Tape le code toi-même.</b> Ne te contente pas de lire : écris, compile, provoque des erreurs exprès. Chaque erreur comprise est une leçon gravée.</li>
<li><b>Lis les messages du compilateur.</b> <code>g++</code> te dit souvent exactement ce qui ne va pas, à quelle ligne. 80 % des blocages se résolvent en lisant l'erreur.</li>
<li><b>Décompose.</b> Un gros programme = plein de petites fonctions simples. Fais marcher une brique, puis la suivante.</li>
<li><b>Dessine.</b> Pour les pointeurs et les objets, un schéma sur papier (des boîtes et des flèches) vaut mille mots.</li>
<li><b>Bloque, puis demande.</b> Cherche 20 minutes seul, c'est normal. Ensuite, un indice, un camarade, le manuel.</li>
</ol>
<div class="box kid"><b>Le secret</b><p>Personne ne naît « bon en C++ ». Les meilleurs ont juste <b>bloqué et recommencé des centaines de fois</b>. Chaque bug que tu écrases te rend plus fort. C'est exactement l'état d'esprit de la Piscine.</p></div>
<div class="box pro"><b>Comment utiliser cette plateforme</b><p>Chaque leçon : un cours, un quiz, puis un <b>défi</b> où tu dois deviner la sortie d'un vrai programme C++ (vérifié au compilateur). Tu gagnes de l'XP et tu montes en rang. Le bouton « Demander au Prof » (en bas à droite) te met sur la piste sans te donner la réponse.</p></div>
`,
quiz:[
{q:'Meilleur rythme pour apprendre le C++ ?',o:['8 h le dimanche','un peu chaque jour','une fois par mois','la veille de l\'exam'],a:1},
{q:'Que faire quand g++ affiche une erreur ?',o:['l\'ignorer','la lire attentivement : elle dit souvent quoi et où','tout effacer','changer d\'ordinateur'],a:1},
{q:'Pour comprendre les pointeurs et les objets, il est utile de...',o:['dessiner des boîtes et des flèches','les éviter','apprendre par cœur','copier un camarade'],a:0},
{q:'Tu bloques depuis 20 minutes. La bonne réaction ?',o:['abandonner','prendre un indice, demander, lire le manuel','copier la solution','passer à autre chose définitivement'],a:1}]}
]});

/* ---------- MODULE 1 : COMPILER ---------- */
MODULES.push({id:'m1',titre:'Compiler et exécuter',cat:'Les bases',badge:'Premier programme',
desc:'Le terminal, g++, ton premier programme C++, et comment lire les erreurs.',
intro:'<p>Un programme C++ n\'est pas lu directement par l\'ordinateur : il faut d\'abord le <b>compiler</b> (le traduire en langage machine). On apprend ce geste, le plus fondamental de tous.</p>',
lessons:[
{id:'m1l1',titre:'Le terminal, ton atelier',duree:'15 min',
contenu:`
<p>À Epitech, tout se passe sous <b>Linux</b> et dans le <b>terminal</b> : tu pilotes l'ordinateur en tapant des commandes. Ça paraît austère, puis ça devient une super-puissance.</p>
<h2>Les commandes vitales</h2>
<div class="tablewrap"><table><tr><th>Commande</th><th>Rôle</th></tr>
<tr><td class="mono">pwd</td><td>où suis-je ? (dossier courant)</td></tr>
<tr><td class="mono">ls</td><td>lister les fichiers ici</td></tr>
<tr><td class="mono">cd dossier</td><td>entrer dans un dossier (<code>cd ..</code> pour remonter)</td></tr>
<tr><td class="mono">cat fichier</td><td>afficher le contenu d'un fichier</td></tr>
<tr><td class="mono">g++ ...</td><td>compiler un programme C++</td></tr>
<tr><td class="mono">./programme</td><td>exécuter un programme compilé</td></tr></table></div>
<p>Entraîne-toi dans ce terminal : explore le projet avec <code>ls</code>, <code>cd my_project</code>, <code>cat Makefile</code>.</p>
<div data-term="sandbox"></div>
<div class="box pro"><b>Astuces qui font gagner un temps fou</b><p>Flèche <b>↑</b> = rappelle la dernière commande. Touche <b>Tab</b> = complète un nom de fichier. <b>Ctrl+L</b> = efface l'écran. Les Epitech les utilisent sans arrêt.</p></div>
`,
quiz:[
{q:'Quelle commande affiche le contenu d\'un fichier ?',o:['ls','cat','cd','pwd'],a:1},
{q:'Pour exécuter un programme compilé nommé « a.out » ?',o:['run a.out','./a.out','cat a.out','cd a.out'],a:1},
{q:'cd .. sert à...',o:['effacer','remonter d\'un dossier','compiler','lister'],a:1},
{q:'La touche Tab dans le terminal...',o:['complète un nom de fichier','ferme le terminal','lance le programme','efface tout'],a:0}]},

{id:'m1l2',titre:'Ton premier programme',duree:'18 min',
contenu:`
<p>Voici le programme le plus célèbre du monde, en C++ :</p>
<pre>#include &lt;iostream&gt;

int main()
{
    std::cout &lt;&lt; "Bonjour Tek2" &lt;&lt; std::endl;
    return 0;
}</pre>
<h2>Décortiquons-le, ligne par ligne</h2>
<ul>
<li><code>#include &lt;iostream&gt;</code> : on importe l'outil pour afficher du texte (iostream = « input/output stream », les entrées/sorties).</li>
<li><code>int main()</code> : <b>la fonction principale</b>. L'exécution commence TOUJOURS ici. Tout programme en a une.</li>
<li><code>{ ... }</code> : les accolades délimitent le corps de la fonction.</li>
<li><code>std::cout &lt;&lt; "..."</code> : <code>cout</code> (« character out ») affiche du texte. Les <code>&lt;&lt;</code> poussent ce qui est à droite vers l'écran.</li>
<li><code>std::endl</code> : passe à la ligne (« end line »).</li>
<li><code>return 0;</code> : le programme se termine bien (0 = « tout s'est bien passé »).</li>
<li>Chaque instruction finit par un <b>point-virgule</b> <code>;</code>. L'oublier est l'erreur n°1 du débutant.</li>
</ul>
<h2>Compiler et lancer</h2>
<pre>$ g++ main.cpp -o programme
$ ./programme
Bonjour Tek2</pre>
<p><code>g++ main.cpp -o programme</code> traduit ton code en un fichier exécutable appelé <code>programme</code>. Sans l'option <code>-o</code>, g++ crée par défaut un fichier nommé <b>a.out</b>.</p>
<div class="box kid"><b>Image simple</b><p>Ton code <code>.cpp</code> est une recette écrite en français. Le compilateur <code>g++</code> est le traducteur qui la transforme en « gestes machine » que le processeur sait exécuter. <code>./programme</code> lance la recette.</p></div>
<div class="box pro"><b>Les options d'Epitech</b><p>À Epitech, on compile avec <code>-Wall -Wextra -Werror</code> : ça active tous les avertissements et transforme le moindre avertissement en erreur bloquante. Dur, mais ça force à écrire du code propre.</p></div>
`,
quiz:[
{q:'Par où commence TOUJOURS l\'exécution d\'un programme C++ ?',o:['la première ligne du fichier','la fonction main()','le #include','la dernière ligne'],a:1},
{q:'À quoi sert std::cout ?',o:['à lire le clavier','à afficher du texte à l\'écran','à compiler','à additionner'],a:1},
{q:'Quel fichier g++ crée-t-il par défaut, sans l\'option -o ?',o:['main.exe','a.out','programme','out.cpp'],a:1},
{q:'Quelle est l\'erreur n°1 du débutant ?',o:['oublier le point-virgule ;','écrire en majuscules','mettre des espaces','utiliser main()'],a:0}],
chal:{titre:'La première sortie',xp:30,niveau:'facile',enonce:`<p>Compile et exécute ce programme dans ta tête. <b>Qu'affiche-t-il à l'écran ?</b> (Recopie exactement le texte affiché, sans les guillemets.)</p><pre>#include &lt;iostream&gt;

int main()
{
    std::cout &lt;&lt; "Bonjour Tek2" &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'Bonjour Tek2',hints:['cout << "..." affiche le texte entre guillemets, tel quel.','La réponse est exactement : Bonjour Tek2'],bravo:'Tu sais lire la sortie d\'un programme.'}},

{id:'m1l3',titre:'Lire les erreurs de compilation',duree:'15 min',
contenu:`
<p>Tu vas voir des milliers d'erreurs de compilation dans ta vie. Bonne nouvelle : le compilateur t'explique presque toujours quoi corriger.</p>
<h2>Anatomie d'une erreur</h2>
<pre>main.cpp: In function 'int main()':
main.cpp:5:30: error: expected ';' before '}' token
    5 |     std::cout &lt;&lt; "Salut"
      |                              ^</pre>
<p>On lit : fichier <code>main.cpp</code>, <b>ligne 5</b>, <code>error: expected ';'</code> → « il manque un point-virgule ». Le petit <code>^</code> pointe l'endroit. La plupart des erreurs se lisent comme ça : <b>fichier : ligne : message</b>.</p>
<h2>Les erreurs classiques du débutant</h2>
<div class="tablewrap"><table><tr><th>Message (en gros)</th><th>Ça veut dire</th></tr>
<tr><td class="mono">expected ';'</td><td>il manque un point-virgule</td></tr>
<tr><td class="mono">'x' was not declared</td><td>tu utilises une variable (ou un nom) que tu n'as pas créée, ou faute de frappe</td></tr>
<tr><td class="mono">no match for 'operator&lt;&lt;'</td><td>tu essaies d'afficher quelque chose que cout ne sait pas afficher directement</td></tr>
<tr><td class="mono">undefined reference to 'main'</td><td>pas de fonction main(), ou mal écrite</td></tr>
<tr><td class="mono">expected '}' at end</td><td>une accolade ouverte jamais fermée</td></tr></table></div>
<div class="box kid"><b>Le bon réflexe</b><p>Lis TOUJOURS la <b>première</b> erreur en premier : souvent, une seule faute (une accolade oubliée) provoque une cascade de 20 erreurs. Corrige la première, recompile, et la moitié disparaît.</p></div>
<div class="box warn"><b>Erreur ≠ avertissement</b><p>Une <b>error</b> empêche de compiler. Un <b>warning</b> compile quand même mais signale un danger. À Epitech (<code>-Werror</code>), les warnings deviennent des erreurs : il faut les corriger tous.</p></div>
`,
quiz:[
{q:'Dans « main.cpp:5:30: error », que signifie le 5 ?',o:['le numéro de l\'erreur','la ligne du fichier','le nombre d\'erreurs','la colonne'],a:1},
{q:'« expected ; » veut dire...',o:['il manque un point-virgule','le fichier est vide','trop de lignes','pas de main'],a:0},
{q:'Quelle erreur lire en premier ?',o:['la dernière','la première (elle cause souvent les autres)','la plus longue','au hasard'],a:1},
{q:'Avec -Werror (Epitech), un warning...',o:['est ignoré','devient une erreur bloquante','accélère le programme','disparaît'],a:1}]}
]});

/* ---------- MODULE 2 : VARIABLES ---------- */
MODULES.push({id:'m2',titre:'Variables et types',cat:'Les bases',badge:'Gardien des données',
desc:'Stocker des données (int, double, char, bool, string), les afficher et les lire.',
intro:'<p>Un programme manipule des données. Pour les garder en mémoire, on utilise des <b>variables</b>. Chaque variable a un <b>type</b> qui dit ce qu\'elle contient.</p>',
lessons:[
{id:'m2l1',titre:'Les variables et leurs types',duree:'18 min',
contenu:`
<div class="box kid"><b>Image simple</b><p>Une variable, c'est une <b>boîte étiquetée</b> dans la mémoire. L'étiquette est son nom, et dedans tu ranges une valeur. Le <b>type</b> dit quelle sorte de boîte c'est : une boîte à nombres entiers, à texte, à vrai/faux...</p></div>
<h2>Les types de base</h2>
<div class="tablewrap"><table><tr><th>Type</th><th>Contient</th><th>Exemple</th></tr>
<tr><td class="mono">int</td><td>un nombre entier</td><td class="mono">int age = 19;</td></tr>
<tr><td class="mono">double</td><td>un nombre à virgule</td><td class="mono">double prix = 4.5;</td></tr>
<tr><td class="mono">char</td><td>un seul caractère</td><td class="mono">char lettre = 'A';</td></tr>
<tr><td class="mono">bool</td><td>vrai ou faux</td><td class="mono">bool ok = true;</td></tr>
<tr><td class="mono">std::string</td><td>du texte</td><td class="mono">std::string nom = "Koffi";</td></tr></table></div>
<p>En C++, on <b>déclare</b> une variable en écrivant son type puis son nom : <code>int age = 19;</code>. Le type ne change jamais après : une boîte à entiers reste une boîte à entiers.</p>
<pre>#include &lt;iostream&gt;
#include &lt;string&gt;

int main()
{
    int age = 19;
    std::string nom = "Koffi";
    std::cout &lt;&lt; nom &lt;&lt; " a " &lt;&lt; age &lt;&lt; " ans" &lt;&lt; std::endl;
    return 0;
}
// Affiche : Koffi a 19 ans</pre>
<div class="box warn"><b>Attention au char</b><p>Un <code>char</code> s'écrit avec des <b>apostrophes simples</b> : <code>'A'</code>. Une chaîne de texte (string) avec des <b>guillemets doubles</b> : <code>"A"</code>. Confondre les deux est une erreur fréquente.</p></div>
`,
quiz:[
{q:'Quel type pour stocker un nombre entier ?',o:['double','int','char','string'],a:1},
{q:'Quel type pour un nombre à virgule comme 4.5 ?',o:['int','double','bool','char'],a:1},
{q:'Comment écrit-on un seul caractère comme A ?',o:['avec des apostrophes simples','avec des guillemets doubles','sans rien','avec des crochets'],a:0,w:"Un char s'écrit 'A' (apostrophes). \"A\" serait une chaîne."},
{q:'std::string sert à stocker...',o:['un entier','du texte','vrai/faux','un seul caractère'],a:1}]},

{id:'m2l2',titre:'Afficher, lire et calculer',duree:'18 min',
contenu:`
<p>On affiche avec <code>std::cout</code>, on lit le clavier avec <code>std::cin</code>, et on calcule avec les opérateurs habituels.</p>
<h2>Lire une valeur</h2>
<pre>int age;
std::cout &lt;&lt; "Ton age ? ";
std::cin &gt;&gt; age;               // cin met ce que tu tapes dans age
std::cout &lt;&lt; "Dans 10 ans : " &lt;&lt; age + 10 &lt;&lt; std::endl;</pre>
<p>Retiens : <code>cout &lt;&lt;</code> (les chevrons vont <b>vers l'écran</b>), <code>cin &gt;&gt;</code> (les chevrons viennent <b>vers ta variable</b>).</p>
<h2>Les opérateurs</h2>
<div class="tablewrap"><table><tr><th>Opérateur</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td class="mono">+ - * /</td><td>addition, soustraction, multiplication, division</td><td class="mono">7 * 2 = 14</td></tr>
<tr><td class="mono">%</td><td>le <b>reste</b> d'une division (modulo)</td><td class="mono">7 % 2 = 1</td></tr></table></div>
<div class="box warn"><b>Le piège de la division entière</b><p>Entre deux entiers, <code>/</code> donne un résultat <b>entier</b> : <code>7 / 2</code> vaut <b>3</b> (pas 3.5 !), et <code>7 % 2</code> vaut <b>1</b> (le reste). Pour avoir 3.5, il faut au moins un nombre à virgule : <code>7.0 / 2</code>.</p></div>
<pre>#include &lt;iostream&gt;
int main()
{
    int a = 7, b = 2;
    std::cout &lt;&lt; a / b &lt;&lt; " " &lt;&lt; a % b &lt;&lt; std::endl;
    return 0;
}
// a/b = quotient entier, a%b = reste</pre>
<div class="box kid"><b>Le modulo, très utile</b><p><code>%</code> sert partout : savoir si un nombre est pair (<code>n % 2 == 0</code>), faire « boucler » un compteur, etc. Retiens-le bien.</p></div>
`,
quiz:[
{q:'Pour LIRE ce que l\'utilisateur tape au clavier ?',o:['std::cout','std::cin','std::endl','return'],a:1},
{q:'Combien vaut 7 / 2 entre deux entiers en C++ ?',o:['3.5','3','4','1'],a:1,w:'La division entière jette la virgule : 3.'},
{q:'Que donne 7 % 2 ?',o:['3','1','0','3.5'],a:1,w:'% = le reste. 7 = 3*2 + 1, reste 1.'},
{q:'Comment obtenir 3.5 à partir de 7 et 2 ?',o:['7 / 2','7 % 2','7.0 / 2','7 // 2'],a:2}],
chal:{titre:'Division et reste',xp:30,niveau:'facile',enonce:`<p>Qu'affiche ce programme ? (Recopie la ligne affichée, exactement, espace compris.)</p><pre>#include &lt;iostream&gt;
int main()
{
    int a = 7, b = 2;
    std::cout &lt;&lt; a / b &lt;&lt; " " &lt;&lt; a % b &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'3 1',hints:['a / b est une division ENTIÈRE : 7/2 donne 3.','a % b est le reste : 7%2 donne 1. Il y a un espace entre les deux : « 3 1 ».'],bravo:'Division entière et modulo : maîtrisés.'}}
]});

/* ---------- MODULE 3 : CONDITIONS & BOUCLES ---------- */
MODULES.push({id:'m3',titre:'Conditions et boucles',cat:'Les bases',badge:'Maître du flux',
desc:'Prendre des décisions (if/else, switch) et répéter des actions (while, for).',
intro:'<p>Un programme intéressant fait des choix et répète des actions. C\'est le rôle des conditions et des boucles : le « cerveau » qui décide, et les « jambes » qui répètent.</p>',
lessons:[
{id:'m3l1',titre:'Les conditions : if, else, switch',duree:'18 min',
contenu:`
<p>Une <b>condition</b> exécute du code seulement si quelque chose est vrai.</p>
<pre>int note = 12;
if (note &gt;= 10) {
    std::cout &lt;&lt; "Admis" &lt;&lt; std::endl;
} else {
    std::cout &lt;&lt; "Recale" &lt;&lt; std::endl;
}</pre>
<h2>Les opérateurs de comparaison</h2>
<div class="tablewrap"><table><tr><td class="mono">==</td><td>égal à</td><td class="mono">!=</td><td>différent de</td></tr>
<tr><td class="mono">&lt; &gt;</td><td>plus petit / plus grand</td><td class="mono">&lt;= &gt;=</td><td>plus petit/grand ou égal</td></tr></table></div>
<div class="box warn"><b>Le piège mortel : = vs ==</b><p><code>=</code> <b>affecte</b> une valeur (met dedans). <code>==</code> <b>compare</b>. Écrire <code>if (x = 5)</code> au lieu de <code>if (x == 5)</code> est un bug classique : ça met 5 dans x au lieu de comparer ! Heureusement, <code>-Wall</code> le signale.</p></div>
<h2>Combiner des conditions</h2>
<p><code>&amp;&amp;</code> = ET (les deux doivent être vrais), <code>||</code> = OU (au moins un), <code>!</code> = NON (inverse).</p>
<pre>if (age &gt;= 18 &amp;&amp; a_permis) { /* peut conduire */ }</pre>
<h2>switch : choisir parmi plusieurs cas</h2>
<pre>switch (choix) {
    case 1: std::cout &lt;&lt; "Un"; break;
    case 2: std::cout &lt;&lt; "Deux"; break;
    default: std::cout &lt;&lt; "Autre";
}</pre>
<p>N'oublie pas le <code>break;</code> à la fin de chaque cas, sinon l'exécution « déborde » sur le cas suivant.</p>
`,
quiz:[
{q:'Quel opérateur COMPARE deux valeurs ?',o:['=','==','!','&&'],a:1},
{q:'if (x = 5) au lieu de if (x == 5)...',o:['est correct','met 5 dans x au lieu de comparer : un bug','compile pas du tout','compare bien'],a:1},
{q:'&& signifie...',o:['OU','ET (les deux vrais)','NON','égal'],a:1},
{q:'Dans un switch, qu\'oublie-t-on souvent ?',o:['les guillemets','le break; à la fin de chaque cas','le point-virgule','le type'],a:1}]},

{id:'m3l2',titre:'Les boucles : while et for',duree:'20 min',
contenu:`
<p>Une <b>boucle</b> répète un bloc de code. Deux formes principales.</p>
<h2>while : « tant que »</h2>
<pre>int i = 0;
while (i &lt; 3) {
    std::cout &lt;&lt; i &lt;&lt; " ";
    i++;            // i = i + 1
}
// Affiche : 0 1 2</pre>
<p>Tant que la condition est vraie, on répète. <b>Attention</b> : si tu oublies de faire avancer <code>i</code>, la boucle tourne pour toujours (boucle infinie) !</p>
<h2>for : la boucle compteur</h2>
<pre>for (int i = 0; i &lt; 3; i++) {
    std::cout &lt;&lt; i &lt;&lt; " ";
}
// Affiche aussi : 0 1 2</pre>
<p>Le <code>for</code> regroupe trois choses sur une ligne : <b>départ</b> (<code>int i = 0</code>), <b>condition</b> (<code>i &lt; 3</code>), <b>avancée</b> (<code>i++</code>). C'est la boucle préférée quand on sait combien de fois répéter.</p>
<div class="box kid"><b>Image simple</b><p>Un <code>for</code>, c'est comme monter un escalier : tu pars d'une marche (i=0), tu continues tant que tu n'es pas en haut (i&lt;3), et tu montes d'une marche à chaque fois (i++).</p></div>
<h2>Accumuler une valeur</h2>
<pre>int somme = 0;
for (int i = 1; i &lt;= 5; i++) {
    somme += i;        // somme = somme + i
}
std::cout &lt;&lt; somme;    // 1+2+3+4+5
</pre>
<div class="box pro"><b>Les raccourcis</b><p><code>i++</code> = <code>i += 1</code> = <code>i = i + 1</code>. De même <code>somme += i</code> = <code>somme = somme + i</code>. Tu les verras partout.</p></div>
`,
quiz:[
{q:'Qu\'affiche for (int i = 0; i < 3; i++) cout << i ?',o:['0 1 2','1 2 3','0 1 2 3','3'],a:0},
{q:'Que risque une boucle while dont la condition reste toujours vraie ?',o:['rien','une boucle infinie','une erreur de compilation','elle s\'arrête seule'],a:1},
{q:'Dans for (int i=0; i<3; i++), que fait « i++ » ?',o:['le départ','la condition','l\'avancée (i augmente de 1)','rien'],a:2},
{q:'somme += i veut dire...',o:['somme = i','somme = somme + i','somme = somme * i','i = i + 1'],a:1}],
chal:{titre:'La somme',xp:35,niveau:'facile',enonce:`<p>Qu'affiche ce programme ?</p><pre>#include &lt;iostream&gt;
int main()
{
    int somme = 0;
    for (int i = 1; i &lt;= 5; i++) {
        somme += i;
    }
    std::cout &lt;&lt; somme &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'15',hints:['La boucle ajoute 1, puis 2, puis 3, 4, 5 à somme.','1+2+3+4+5 = 15.'],bravo:'Tu sais dérouler une boucle dans ta tête.'}}
]});

/* ---------- MODULE 4 : FONCTIONS ---------- */
MODULES.push({id:'m4',titre:'Les fonctions',cat:'Les bases',badge:'Architecte',
desc:'Découper ton code en briques réutilisables : paramètres, valeur de retour, portée.',
intro:'<p>Une fonction est une mini-machine : tu lui donnes des entrées, elle te rend un résultat. C\'est l\'outil pour ne pas réécrire dix fois la même chose, et une obligation à Epitech (25 lignes max par fonction !).</p>',
lessons:[
{id:'m4l1',titre:'Définir et appeler une fonction',duree:'18 min',
contenu:`
<div class="box kid"><b>Image simple</b><p>Une fonction, c'est un <b>robot cuisinier</b>. Tu lui donnes des ingrédients (les <b>paramètres</b>), il fait son travail, et il te rend un plat (la <b>valeur de retour</b>). Une fois construit, tu l'utilises autant de fois que tu veux.</p></div>
<h2>Anatomie d'une fonction</h2>
<pre>int carre(int x)     // type de retour | nom | paramètre(s)
{
    return x * x;    // ce qu'elle renvoie
}

int main()
{
    std::cout &lt;&lt; carre(5);   // appel : affiche 25
    return 0;
}</pre>
<ul>
<li><code>int</code> (devant le nom) = le <b>type de ce que la fonction renvoie</b>.</li>
<li><code>carre</code> = son nom.</li>
<li><code>(int x)</code> = le ou les <b>paramètres</b> qu'elle reçoit.</li>
<li><code>return</code> = renvoie le résultat et termine la fonction.</li>
</ul>
<h2>Une fonction qui ne renvoie rien : void</h2>
<p>Si une fonction fait une action sans rien rendre (juste afficher, par exemple), son type de retour est <code>void</code> (« vide ») :</p>
<pre>void saluer(std::string nom)
{
    std::cout &lt;&lt; "Salut " &lt;&lt; nom &lt;&lt; std::endl;
}</pre>
<div class="box pro"><b>Pourquoi c'est central à Epitech</b><p>La norme impose <b>25 lignes maximum par fonction</b>. Résultat : tu es obligé de découper ton programme en petites fonctions claires, chacune avec un seul rôle. C'est une excellente habitude — le code devient lisible et réutilisable.</p></div>
`,
quiz:[
{q:'Dans « int carre(int x) », que représente le premier int ?',o:['le nom','le type de ce que la fonction renvoie','un paramètre','une erreur'],a:1},
{q:'return sert à...',o:['afficher','renvoyer un résultat et terminer la fonction','créer une boucle','compiler'],a:1},
{q:'Une fonction qui ne renvoie rien a le type...',o:['int','void','return','none'],a:1},
{q:'Pourquoi découper en petites fonctions à Epitech ?',o:['la norme impose 25 lignes max par fonction','c\'est plus joli','pour ralentir','sans raison'],a:0}],
chal:{titre:'Somme de carrés',xp:35,niveau:'facile',enonce:`<p>Qu'affiche ce programme ?</p><pre>#include &lt;iostream&gt;

int carre(int x)
{
    return x * x;
}

int main()
{
    std::cout &lt;&lt; carre(3) + carre(4) &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'25',hints:['carre(3) vaut 3*3 = 9. carre(4) vaut 4*4 = 16.','9 + 16 = 25.'],bravo:'Tu suis le fil d\'un appel de fonction.'}},

{id:'m4l2',titre:'Portée et passage de paramètres',duree:'15 min',
contenu:`
<p>Deux idées qui évitent beaucoup de bugs.</p>
<h2>La portée (scope) d'une variable</h2>
<p>Une variable n'existe que dans le bloc <code>{ }</code> où elle est déclarée. En sortant, elle disparaît.</p>
<pre>int main()
{
    int x = 5;
    {
        int y = 10;   // y n'existe que dans ces accolades
    }
    // ici, y n'existe plus ! Utiliser y donnerait une erreur.
}</pre>
<div class="box kid"><b>Image simple</b><p>Une variable, c'est comme une note écrite au tableau d'une salle : dès que tu sors de la salle (le bloc <code>{ }</code>), la note est effacée. Les paramètres d'une fonction n'existent que pendant qu'elle tourne.</p></div>
<h2>Passage par valeur : la fonction reçoit une COPIE</h2>
<p>Par défaut, quand tu passes une variable à une fonction, celle-ci reçoit une <b>copie</b>. Modifier la copie ne change pas l'original.</p>
<pre>void gache(int n) { n = 0; }   // modifie seulement la copie

int main()
{
    int score = 100;
    gache(score);
    std::cout &lt;&lt; score;   // affiche 100, pas 0 !
}</pre>
<div class="box pro"><b>Et si je VEUX modifier l'original ?</b><p>Il faut passer la variable par <b>référence</b> ou par <b>pointeur</b> — c'est tout le sujet du module suivant. Retiens pour l'instant : par défaut, une fonction travaille sur une copie.</p></div>
`,
quiz:[
{q:'Une variable déclarée dans un bloc { }...',o:['existe partout','n\'existe que dans ce bloc','ne disparaît jamais','est globale'],a:1},
{q:'Par défaut, une fonction reçoit ses paramètres...',o:['par copie','par magie','toujours modifiables','par référence'],a:0},
{q:'void gache(int n){ n=0; } appelée sur score=100. Après, score vaut...',o:['0','100','n','erreur'],a:1,w:'La fonction a modifié une copie, pas l\'original.'},
{q:'Pour modifier l\'original dans une fonction, il faut...',o:['une boucle','une référence ou un pointeur','un void','un return'],a:1}]}
]});

/* ---------- MODULE 5 : POINTEURS ---------- */
MODULES.push({id:'m5',titre:'Pointeurs et références',cat:'Le cœur du C++',badge:'Dompteur de pointeurs',
desc:'La terreur des débutants, expliquée simplement : adresses, *, &, références. Indispensable au Tek2.',
intro:'<p>Les pointeurs font peur, puis deviennent limpides avec la bonne image. Ils sont partout en C et C++, et les maîtriser te met devant 90 % des débutants.</p>',
lessons:[
{id:'m5l1',titre:'Adresses et pointeurs',duree:'22 min',
contenu:`
<div class="box kid"><b>L'image qui débloque tout</b><p>La mémoire de l'ordinateur est une immense <b>rue de maisons</b>, chacune avec une <b>adresse</b>. Une variable habite une maison et contient une valeur. Un <b>pointeur</b>, ce n'est pas la valeur : c'est un <b>bout de papier où tu as noté l'adresse</b> d'une maison. Avec l'adresse, tu peux aller voir — et modifier — ce qu'il y a dedans.</p></div>
<h2>Les deux symboles à ne pas confondre</h2>
<div class="tablewrap"><table><tr><th>Symbole</th><th>Nom</th><th>Ce qu'il fait</th></tr>
<tr><td class="mono">&amp;x</td><td>« adresse de »</td><td>donne l'adresse de la variable x (où elle habite)</td></tr>
<tr><td class="mono">*p</td><td>« contenu de »</td><td>va à l'adresse notée dans p et lit/écrit la valeur</td></tr></table></div>
<pre>int x = 42;
int *p = &amp;x;    // p note l'adresse de x

std::cout &lt;&lt; x;    // 42  (la valeur)
std::cout &lt;&lt; &amp;x;   // ex: 0x7ffd...  (l'adresse où x habite)
std::cout &lt;&lt; p;    // la même adresse (p la contient)
std::cout &lt;&lt; *p;   // 42  (* suit l'adresse et lit la valeur)

*p = 100;          // écrit 100 À l'adresse de x...
std::cout &lt;&lt; x;    // ...donc x vaut maintenant 100 !</pre>
<div class="box warn"><b>Le point clé</b><p>Modifier <code>*p</code>, c'est modifier <b>la vraie variable x</b>, parce que p connaît son adresse. C'est exactement ce qui manquait au module précédent pour qu'une fonction change l'original.</p></div>
<h2>nullptr : le pointeur qui ne pointe sur rien</h2>
<p>Un pointeur peut ne viser aucune maison : on le met à <code>nullptr</code>. Lire <code>*p</code> quand p est nullptr fait planter le programme (le fameux « segfault »). Toujours vérifier avant !</p>
<pre>int *p = nullptr;
if (p != nullptr) { std::cout &lt;&lt; *p; }   // sûr</pre>
`,
quiz:[
{q:'Que donne &x ?',o:['la valeur de x','l\'adresse de x','le double de x','rien'],a:1},
{q:'Si p contient l\'adresse de x, que lit *p ?',o:['l\'adresse','la valeur rangée à cette adresse (celle de x)','nullptr','une erreur'],a:1},
{q:'Après *p = 100; (où p pointe sur x), x vaut...',o:['42','100','0','l\'adresse'],a:1},
{q:'Lire *p quand p vaut nullptr...',o:['affiche 0','fait planter le programme (segfault)','est sans danger','renvoie l\'adresse'],a:1}],
chal:{titre:'L\'échange',xp:40,niveau:'moyen',enonce:`<p>Cette fonction échange deux valeurs grâce aux pointeurs. Qu'affiche le programme ?</p><pre>#include &lt;iostream&gt;

void echange(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

int main()
{
    int x = 1, y = 9;
    echange(&amp;x, &amp;y);
    std::cout &lt;&lt; x &lt;&lt; " " &lt;&lt; y &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'9 1',hints:['echange reçoit les ADRESSES de x et y, donc il modifie les vraies variables.','Il met la valeur de y dans x et celle de x dans y : ils sont échangés. Résultat : « 9 1 ».'],bravo:'Tu as compris pourquoi les pointeurs permettent de modifier l\'original. C\'est une étape que beaucoup ratent.'}},

{id:'m5l2',titre:'Les références : plus simples',duree:'15 min',
contenu:`
<p>Le C++ offre une alternative souvent plus douce que les pointeurs : la <b>référence</b>.</p>
<div class="box kid"><b>Image simple</b><p>Une référence, c'est un <b>surnom</b> pour une variable existante. « Dédé » et « André » désignent la même personne : agir sur l'un agit sur l'autre. Pas d'adresse à manipuler, pas d'étoile : c'est juste un autre nom pour la même case mémoire.</p></div>
<h2>Syntaxe : le & à la déclaration</h2>
<pre>int x = 5;
int &amp;surnom = x;   // surnom est un autre nom pour x
surnom = 20;        // revient à écrire x = 20
std::cout &lt;&lt; x;     // affiche 20</pre>
<h2>Modifier l'original dans une fonction — version facile</h2>
<p>Souviens-toi : par défaut une fonction reçoit une copie. Avec une référence (<code>&amp;</code> dans le paramètre), elle travaille directement sur l'original, sans pointeurs :</p>
<pre>void doubler(int &amp;n)   // n est une référence vers l'original
{
    n = n * 2;
}

int main()
{
    int score = 50;
    doubler(score);
    std::cout &lt;&lt; score;   // affiche 100 !
}</pre>
<div class="box pro"><b>Pointeur ou référence ?</b><p>Une <b>référence</b> est plus simple et ne peut pas être « vide » : on l'utilise par défaut pour passer un objet à une fonction sans le copier. Un <b>pointeur</b> est plus souple (il peut valoir nullptr, changer de cible) : on l'utilise quand on a besoin de cette souplesse. Tu verras les deux sans arrêt au Tek2.</p></div>
<div class="box warn"><b>Passer un gros objet : par référence !</b><p>Copier un grand <code>std::string</code> ou un gros objet à chaque appel coûte cher. On le passe alors par référence constante : <code>void afficher(const std::string &amp;texte)</code>. Le <code>const</code> promet qu'on ne le modifiera pas. C'est une habitude très attendue à Epitech.</p></div>
`,
quiz:[
{q:'Une référence, c\'est...',o:['une copie','un autre nom (surnom) pour une variable existante','une adresse','un nullptr'],a:1},
{q:'int &s = x; puis s = 20; Que vaut x ?',o:['5','20','l\'adresse','0'],a:1},
{q:'Pour qu\'une fonction modifie l\'original SANS pointeur, on passe le paramètre...',o:['par copie','par référence (&)','par void','par return'],a:1},
{q:'Pourquoi passer un gros objet par référence constante (const &) ?',o:['pour le copier','pour éviter une copie coûteuse tout en promettant de ne pas le modifier','pour le supprimer','pour aller moins vite'],a:1}]}
]});
