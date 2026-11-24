/* ============ CONTENU C++ : MODULES 6 à 10 + PAGES ============ */

/* ---------- MODULE 6 : TABLEAUX, STRING, VECTOR ---------- */
MODULES.push({id:'m6',titre:'Tableaux, string et vector',cat:'Les outils',badge:'Collectionneur',
desc:'Stocker plusieurs valeurs : tableaux, chaînes de caractères et le très pratique std::vector.',
intro:'<p>Une seule variable ne suffit pas quand on a 100 notes ou une liste de joueurs. On a besoin de conteneurs : tableaux, strings, et surtout le vector, star du C++ moderne.</p>',
lessons:[
{id:'m6l1',titre:'Les chaînes : std::string',duree:'16 min',
contenu:`
<p>Tu connais déjà <code>std::string</code> pour le texte. C'est bien plus pratique que les chaînes « à la C » (<code>char[]</code>).</p>
<pre>#include &lt;string&gt;
std::string nom = "Epitech";
std::cout &lt;&lt; nom.length();      // 7  (le nombre de caractères)
std::cout &lt;&lt; nom[0];            // E  (premier caractère, l'indice commence à 0)
nom += " Cotonou";              // on ajoute du texte
std::cout &lt;&lt; nom;              // Epitech Cotonou</pre>
<div class="box kid"><b>L'indice commence à ZÉRO</b><p>Le premier caractère est à l'indice <b>0</b>, pas 1. Dans "Epitech", <code>nom[0]</code> = 'E', <code>nom[1]</code> = 'p'. C'est une source de bugs classique : le dernier caractère est à l'indice <code>length() - 1</code>.</p></div>
<h2>Parcourir une chaîne</h2>
<pre>std::string mot = "abc";
for (int i = 0; i &lt; mot.length(); i++) {
    std::cout &lt;&lt; mot[i] &lt;&lt; "-";
}
// Affiche : a-b-c-</pre>
<p>Quelques méthodes utiles : <code>.length()</code> ou <code>.size()</code> (longueur), <code>.empty()</code> (vide ?), <code>.substr(debut, n)</code> (extraire un morceau).</p>
`,
quiz:[
{q:'Dans std::string s = "Chat", que vaut s[0] ?',o:['C','h','t','1'],a:0},
{q:'Comment connaître la longueur d\'une string s ?',o:['s.long()','s.length() ou s.size()','len(s)','s.count'],a:1},
{q:'Le premier caractère d\'une string est à l\'indice...',o:['1','0','-1','length()'],a:1},
{q:'Comment ajouter " !" à la fin de s ?',o:['s + " !"','s += " !"','s.add(" !")','push(s)'],a:1,w:'s += " !" modifie s en lui ajoutant le texte.'}]},

{id:'m6l2',titre:'Le std::vector',duree:'20 min',
contenu:`
<p>Un <b>vector</b> est une liste qui grandit toute seule. C'est le conteneur le plus utilisé en C++ moderne : bien plus pratique que les tableaux classiques de taille fixe.</p>
<div class="box kid"><b>Image simple</b><p>Un tableau classique, c'est une boîte à œufs avec un nombre de places fixé à l'avance. Un <b>vector</b>, c'est un sac élastique : tu ajoutes autant d'éléments que tu veux, il s'agrandit tout seul.</p></div>
<pre>#include &lt;vector&gt;

std::vector&lt;int&gt; notes;     // un vector d'entiers, vide au départ
notes.push_back(15);         // on ajoute 15 au bout
notes.push_back(12);
notes.push_back(18);

std::cout &lt;&lt; notes.size();   // 3  (combien d'éléments)
std::cout &lt;&lt; notes[0];       // 15 (le premier, indice 0)</pre>
<h2>Les opérations essentielles</h2>
<div class="tablewrap"><table><tr><th>Opération</th><th>Effet</th></tr>
<tr><td class="mono">v.push_back(x)</td><td>ajoute x à la fin</td></tr>
<tr><td class="mono">v.size()</td><td>nombre d'éléments</td></tr>
<tr><td class="mono">v[i]</td><td>l'élément à l'indice i (commence à 0)</td></tr>
<tr><td class="mono">v.empty()</td><td>true si le vector est vide</td></tr></table></div>
<h2>Parcourir un vector</h2>
<pre>for (int i = 0; i &lt; v.size(); i++) {
    std::cout &lt;&lt; v[i] &lt;&lt; " ";
}
// ou, version moderne (for-each) :
for (int x : v) {
    std::cout &lt;&lt; x &lt;&lt; " ";
}</pre>
<p>La deuxième forme se lit « pour chaque x dans v ». Élégante et sûre, tu la verras beaucoup.</p>
`,
quiz:[
{q:'Qu\'ajoute v.push_back(7) à un vector v ?',o:['rien','7 à la fin','7 au début','remplace tout par 7'],a:1},
{q:'Comment connaître le nombre d\'éléments d\'un vector v ?',o:['v.count','v.size()','v.length','len(v)'],a:1},
{q:'Avantage du vector sur un tableau classique ?',o:['il va plus vite toujours','il grandit tout seul (taille dynamique)','il est plus court à écrire','aucun'],a:1},
{q:'« for (int x : v) » se lit...',o:['pour i de 0 à v','pour chaque x dans v','tant que x','si x dans v'],a:1}],
chal:{titre:'Le sac de carrés',xp:40,niveau:'moyen',enonce:`<p>Qu'affiche ce programme ?</p><pre>#include &lt;iostream&gt;
#include &lt;vector&gt;

int main()
{
    std::vector&lt;int&gt; v;
    for (int i = 0; i &lt; 4; i++) {
        v.push_back(i * i);
    }
    std::cout &lt;&lt; v.size() &lt;&lt; " " &lt;&lt; v[3] &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'4 9',hints:['La boucle ajoute 0*0, 1*1, 2*2, 3*3 → le vector contient 0, 1, 4, 9.','v.size() = 4 éléments. v[3] est le 4e (indice 3) = 3*3 = 9. Réponse : « 4 9 ».'],bravo:'Tu manipules le conteneur le plus utile du C++.'}}
]});

/* ---------- MODULE 7 : POO 1 ---------- */
MODULES.push({id:'m7',titre:'La POO : classes et objets',cat:'Le cœur du Tek2',badge:'Esprit objet',
desc:'Le grand saut de la 2e année : regrouper données et fonctions dans des objets.',
intro:'<p>Voici LE sujet central de ta deuxième année. La programmation orientée objet change ta façon de penser le code. On commence par la brique de base : la classe.</p>',
lessons:[
{id:'m7l1',titre:'Classe, objet, encapsulation',duree:'22 min',
contenu:`
<div class="box kid"><b>L'image fondatrice</b><p>Une <b>classe</b> est un <b>plan de construction</b> (le plan d'une voiture). Un <b>objet</b> est un exemplaire fabriqué à partir du plan (ta voiture, celle du voisin). Un seul plan, autant d'objets qu'on veut. Chaque objet a ses propres données (ta voiture a son niveau d'essence à elle).</p></div>
<h2>Données + fonctions ensemble</h2>
<p>En C, les données (struct) et les fonctions étaient séparées. En C++, une classe <b>réunit</b> les <b>attributs</b> (les données) et les <b>méthodes</b> (les fonctions qui agissent dessus).</p>
<pre>class Compteur {
private:
    int n;              // attribut (donnée) — caché

public:
    Compteur() { n = 0; }     // constructeur : prépare l'objet
    void inc() { n++; }        // méthode
    int get() const { return n; }
};

int main()
{
    Compteur c;         // on fabrique un objet à partir du plan
    c.inc();
    c.inc();
    std::cout &lt;&lt; c.get();   // 2
}</pre>
<h2>public / private : l'encapsulation</h2>
<p>Le mot <code>private</code> cache des éléments : on ne peut pas y toucher directement depuis l'extérieur. <code>public</code> les expose. Ici, on ne peut pas faire <code>c.n = 999;</code> (n est privé) ; on doit passer par les méthodes <code>inc()</code> et <code>get()</code>.</p>
<div class="box kid"><b>Pourquoi cacher ?</b><p>C'est l'<b>encapsulation</b>. Comme un distributeur de billets : tu ne touches pas directement aux billets à l'intérieur, tu passes par des boutons (les méthodes) qui garantissent que tout se passe bien. Ça protège les données contre les erreurs.</p></div>
<h2>Le constructeur</h2>
<p>La méthode qui porte le nom de la classe (<code>Compteur()</code>) est le <b>constructeur</b> : elle s'exécute automatiquement à la création de l'objet, pour le mettre dans un état de départ correct (ici, <code>n = 0</code>).</p>
<div class="box pro"><b>Vocabulaire à retenir</b><p><b>Classe</b> = le plan. <b>Objet</b> (ou instance) = un exemplaire. <b>Attribut</b> = une donnée de l'objet. <b>Méthode</b> = une fonction de l'objet. <b>Encapsulation</b> = cacher les données (private) et n'exposer que des méthodes sûres (public).</p></div>
`,
quiz:[
{q:'Une classe, c\'est...',o:['un objet','un plan de construction d\'objets','une variable','une boucle'],a:1},
{q:'Les données d\'un objet s\'appellent ses...',o:['méthodes','attributs','pointeurs','classes'],a:1},
{q:'À quoi sert « private » ?',o:['à accélérer','à cacher des éléments de l\'extérieur (encapsulation)','à supprimer','à afficher'],a:1},
{q:'Le constructeur d\'une classe...',o:['s\'exécute à la création de l\'objet pour l\'initialiser','détruit l\'objet','est optionnel et jamais appelé','affiche l\'objet'],a:0}],
chal:{titre:'Le compteur',xp:45,niveau:'moyen',enonce:`<p>Qu'affiche ce programme ?</p><pre>#include &lt;iostream&gt;

class Compteur {
private:
    int n;
public:
    Compteur() : n(0) {}
    void inc() { n++; }
    int get() const { return n; }
};

int main()
{
    Compteur c;
    c.inc();
    c.inc();
    c.inc();
    std::cout &lt;&lt; c.get() &lt;&lt; std::endl;
    return 0;
}</pre>`,flag:'3',hints:['Le constructeur met n à 0. Chaque inc() ajoute 1.','inc() est appelé 3 fois : n passe de 0 à 3. get() renvoie 3.'],bravo:'Tu as écrit (dans ta tête) ton premier objet. Le cœur du Tek2 est à ta portée.'}},

{id:'m7l2',titre:'Constructeur, destructeur, this',duree:'18 min',
contenu:`
<p>Un objet a une <b>vie</b> : il naît (constructeur), vit, puis meurt (destructeur).</p>
<h2>Le destructeur : le ménage</h2>
<p>Le <b>destructeur</b> (<code>~NomDeClasse()</code>) s'exécute automatiquement quand l'objet disparaît (fin de son bloc, ou <code>delete</code>). Il sert à libérer ce que l'objet avait réservé (mémoire, fichier ouvert...).</p>
<pre>class Fichier {
public:
    Fichier()  { std::cout &lt;&lt; "ouvre "; }   // constructeur
    ~Fichier() { std::cout &lt;&lt; "ferme "; }   // destructeur
};

int main()
{
    Fichier f;        // affiche "ouvre "
    std::cout &lt;&lt; "travaille ";
}                     // fin du bloc : f meurt → affiche "ferme "
// Sortie : ouvre travaille ferme</pre>
<div class="box kid"><b>Image simple</b><p>Le constructeur, c'est entrer dans une salle et allumer la lumière. Le destructeur, c'est l'éteindre en sortant. Le C++ le fait pour toi, automatiquement, dès que l'objet sort de sa portée.</p></div>
<h2>Attributs et liste d'initialisation</h2>
<p>On initialise souvent les attributs avec la syntaxe <code>: attribut(valeur)</code> juste après le constructeur — c'est la façon propre et attendue à Epitech :</p>
<pre>class Point {
private:
    int x;
    int y;
public:
    Point(int a, int b) : x(a), y(b) {}   // x prend a, y prend b
};</pre>
<div class="box pro"><b>Le mot-clé this</b><p>À l'intérieur d'une méthode, <code>this</code> est un pointeur vers l'objet courant (« moi-même »). <code>this-&gt;x</code> désigne l'attribut x de cet objet. Utile quand un paramètre porte le même nom qu'un attribut.</p></div>
`,
quiz:[
{q:'Le destructeur s\'écrit...',o:['destroy()','~NomDeClasse()','delete()','end()'],a:1},
{q:'Quand le destructeur s\'exécute-t-il ?',o:['à la création','quand l\'objet disparaît (fin de bloc ou delete)','jamais','au début du programme'],a:1},
{q:'Point(int a, int b) : x(a), y(b) {} — cette syntaxe...',o:['est une erreur','initialise les attributs x et y','détruit l\'objet','affiche le point'],a:1},
{q:'Dans une méthode, « this » désigne...',o:['la classe','un pointeur vers l\'objet courant','le constructeur','rien'],a:1}],
chal:{titre:'La vie d\'un objet',xp:45,niveau:'moyen',enonce:`<p>Attention à l'ordre de naissance et de mort des objets (l'héritage joue). Qu'affiche ce programme ?</p><pre>#include &lt;iostream&gt;

class A {
public:
    A() { std::cout &lt;&lt; "A"; }
    ~A() { std::cout &lt;&lt; "~A"; }
};

class B : public A {
public:
    B() { std::cout &lt;&lt; "B"; }
    ~B() { std::cout &lt;&lt; "~B"; }
};

int main()
{
    B b;
    std::cout &lt;&lt; "|";
    return 0;
}</pre>`,flag:'AB|~B~A',hints:['À la construction d\'un B : d\'abord le parent A se construit ("A"), puis B ("B").','Puis "|". À la destruction, c\'est l\'inverse : B meurt avant son parent A → "~B" puis "~A". Résultat : AB|~B~A'],bravo:'Tu as compris l\'ordre construction/destruction avec l\'héritage. Un grand classique des exams Epitech.'}}
]});

/* ---------- MODULE 8 : POO 2 ---------- */
MODULES.push({id:'m8',titre:'Héritage et polymorphisme',cat:'Le cœur du Tek2',badge:'Maître objet',
desc:'Réutiliser et spécialiser du code (héritage), et le graal du Tek2 : le polymorphisme.',
intro:'<p>C\'est le niveau au-dessus, et c\'est exactement ce que testent les projets NanoTekSpice et Arcade. Une fois le polymorphisme compris, tu tiens le cœur de la POO.</p>',
lessons:[
{id:'m8l1',titre:'L\'héritage',duree:'18 min',
contenu:`
<div class="box kid"><b>Image simple</b><p>L'héritage, c'est la famille. Un <b>Chien</b> <i>est un</i> <b>Animal</b> : il hérite de tout ce que savent faire les animaux (manger, dormir), et ajoute ses propres talents (aboyer). On n'a pas à tout réécrire : on part de la classe parent et on la spécialise.</p></div>
<h2>Syntaxe</h2>
<pre>class Animal {
public:
    void manger() { std::cout &lt;&lt; "miam "; }
};

class Chien : public Animal {   // Chien hérite d'Animal
public:
    void aboyer() { std::cout &lt;&lt; "waf "; }
};

int main()
{
    Chien rex;
    rex.manger();   // hérité d'Animal → "miam "
    rex.aboyer();   // propre à Chien → "waf "
}</pre>
<p><code>class Chien : public Animal</code> se lit « Chien hérite publiquement d'Animal ». La classe <b>parent</b> (Animal) s'appelle aussi classe de base ; la classe <b>enfant</b> (Chien), classe dérivée.</p>
<div class="box pro"><b>« est un » : le bon test</b><p>On n'utilise l'héritage que quand la relation « <b>est un</b> » a du sens : un Chien EST un Animal, un Carré EST une Forme. Si tu voulais dire « a un » (une Voiture A un moteur), ce n'est pas de l'héritage mais de la composition (un attribut).</p></div>
`,
quiz:[
{q:'« class Chien : public Animal » signifie...',o:['Chien contient Animal','Chien hérite d\'Animal','Animal hérite de Chien','erreur'],a:1},
{q:'Quand utilise-t-on l\'héritage ?',o:['quand la relation « est un » a du sens','toujours','jamais','pour aller plus vite'],a:0},
{q:'La classe dont on hérite s\'appelle la classe...',o:['enfant','parent (ou de base)','vide','finale'],a:1},
{q:'Un Chien qui hérite d\'Animal peut utiliser manger() d\'Animal ?',o:['oui, il en hérite','non','seulement s\'il le réécrit','seulement avec un pointeur'],a:0}]},

{id:'m8l2',titre:'Le polymorphisme (virtual)',duree:'22 min',
contenu:`
<p>Le mot fait peur, l'idée est belle : un même appel peut se comporter différemment selon le vrai type de l'objet. C'est <b>le</b> super-pouvoir de la POO.</p>
<div class="box kid"><b>Image simple</b><p>Tu dis à chaque animal « crie ! ». Le chien aboie, le chat miaule, la vache meugle. <b>Un seul ordre</b> (« crie »), <b>plein de comportements</b> selon l'animal. Ça, c'est le polymorphisme : ton code dit <code>animal-&gt;cri()</code> sans savoir lequel c'est, et le bon cri sort.</p></div>
<h2>virtual + override</h2>
<pre>class Animal {
public:
    virtual std::string cri() const { return "..."; }   // virtual !
};

class Chien : public Animal {
public:
    std::string cri() const override { return "Waf"; }  // redéfinit
};

int main()
{
    Animal *a = new Chien();      // un Animal* qui pointe sur un Chien
    std::cout &lt;&lt; a-&gt;cri();        // "Waf" grâce à virtual !
    delete a;
}</pre>
<p>Le mot-clé <code>virtual</code> dit : « au moment de l'appel, regarde le <b>vrai</b> type de l'objet et appelle SA version ». Sans <code>virtual</code>, c'est la version d'Animal qui sortirait (<code>...</code>). <code>override</code> indique clairement qu'on redéfinit une méthode du parent.</p>
<div class="box warn"><b>La règle d'or : destructeur virtuel</b><p>Dès qu'une classe a des méthodes <code>virtual</code> et qu'on manipule ses objets par pointeur, son destructeur DOIT être <code>virtual</code> aussi. Sinon, <code>delete</code> n'appelle pas le bon destructeur → fuite mémoire. Epitech y tient beaucoup.</p></div>
<h2>Classe abstraite : le contrat (= interface)</h2>
<p>Une méthode <code>virtual ... = 0;</code> est <b>purement virtuelle</b> : elle n'a pas de corps, elle oblige les enfants à la définir. Une classe qui en contient est <b>abstraite</b> : on ne peut pas la créer directement, elle sert de <b>contrat</b>.</p>
<pre>class IComponent {
public:
    virtual int compute() = 0;     // tout composant DOIT fournir compute()
    virtual ~IComponent() {}
};</pre>
<div class="box pro"><b>Pourquoi c'est LE sujet du Tek2</b><p>Le projet <b>NanoTekSpice</b> (simulateur de circuits) et le projet <b>Arcade</b> (jeux et bibliothèques graphiques interchangeables) reposent entièrement là-dessus : on définit une interface commune, et chaque composant ou chaque jeu l'implémente à sa façon. Ton programme les manipule tous à travers l'interface, sans connaître les détails. Maîtrise ça, et ces projets deviennent logiques.</p></div>
`,
quiz:[
{q:'Le mot-clé « virtual » permet...',o:['d\'aller plus vite','d\'appeler la version du VRAI type de l\'objet (polymorphisme)','de cacher une méthode','de supprimer un objet'],a:1},
{q:'Une méthode « virtual int f() = 0; » est...',o:['normale','purement virtuelle : les enfants DOIVENT la définir','privée','une erreur'],a:1},
{q:'Une classe abstraite...',o:['ne peut pas être instanciée directement, elle sert de contrat','va plus vite','n\'a pas de nom','n\'existe pas en C++'],a:0},
{q:'Si une classe a des méthodes virtual, son destructeur doit être...',o:['privé','virtual aussi','supprimé','static'],a:1}],
chal:{titre:'Le bon cri',xp:50,niveau:'moyen',enonce:`<p>Grâce au polymorphisme, que va afficher ce programme ?</p><pre>#include &lt;iostream&gt;
#include &lt;string&gt;

class Animal {
public:
    virtual std::string cri() const { return "..."; }
    virtual ~Animal() {}
};

class Chien : public Animal {
public:
    std::string cri() const override { return "Waf"; }
};

int main()
{
    Animal *a = new Chien();
    std::cout &lt;&lt; a-&gt;cri() &lt;&lt; std::endl;
    delete a;
    return 0;
}</pre>`,flag:'Waf',hints:['a est un Animal* mais pointe sur un vrai Chien. cri() est virtual.','virtual = on appelle la version du vrai type (Chien) → "Waf".'],bravo:'Tu tiens le polymorphisme, le cœur de NanoTekSpice et Arcade. Énorme.'}}
]});

/* ---------- MODULE 9 : LES OUTILS ---------- */
MODULES.push({id:'m9',titre:'Les outils du Tek2',cat:'Passer à l\'action',badge:'Boîte à outils',
desc:'Makefile, gdb, valgrind, la norme et git : le quotidien d\'un étudiant Epitech.',
intro:'<p>Savoir coder ne suffit pas : il faut compiler proprement, chasser les bugs et gérer son code. Voici les outils que tu utiliseras tous les jours.</p>',
lessons:[
{id:'m9l1',titre:'Le Makefile',duree:'18 min',
contenu:`
<p>Taper <code>g++ src/a.cpp src/b.cpp src/c.cpp -o prog</code> à chaque fois est pénible. Le <b>Makefile</b> automatise la compilation : tu tapes juste <code>make</code>.</p>
<div class="box kid"><b>Image simple</b><p>Le Makefile, c'est une recette de compilation : « voici mes fichiers, voici comment les assembler, voici le nom du plat final ». Tu écris la recette une fois, puis <code>make</code> la suit pour toi.</p></div>
<pre>NAME    = my_program
SRC     = src/main.cpp src/compute.cpp
CXX     = g++
CXXFLAGS = -Wall -Wextra -Werror -std=c++17

all: $(NAME)

$(NAME):
	$(CXX) $(CXXFLAGS) $(SRC) -o $(NAME)

clean:
	rm -f *.o

fclean: clean
	rm -f $(NAME)

re: fclean all</pre>
<p>Les cibles (règles) classiques, imposées par Epitech :</p>
<ul>
<li><code>make</code> (ou <code>make all</code>) : compile le programme.</li>
<li><code>make clean</code> : supprime les fichiers intermédiaires (.o).</li>
<li><code>make fclean</code> : clean + supprime l'exécutable.</li>
<li><code>make re</code> : fclean puis all (tout recompiler de zéro).</li>
</ul>
<div class="box warn"><b>Le piège des tabulations</b><p>Dans un Makefile, les commandes sous une règle doivent être indentées avec une <b>vraie tabulation</b>, pas des espaces. L'erreur « missing separator » veut dire : tu as mis des espaces au lieu d'une tabulation.</p></div>
`,
quiz:[
{q:'À quoi sert un Makefile ?',o:['à dessiner','à automatiser la compilation (make)','à exécuter le programme','à écrire du texte'],a:1},
{q:'Que fait « make fclean » (convention Epitech) ?',o:['compile','supprime les .o ET l\'exécutable','lance le programme','rien'],a:1},
{q:'Les commandes d\'une règle Makefile doivent être indentées avec...',o:['des espaces','une vraie tabulation','rien','un point-virgule'],a:1},
{q:'Que fait « make re » ?',o:['rien','fclean puis all : tout recompiler de zéro','renomme','répare'],a:1}]},

{id:'m9l2',titre:'Chasser les bugs : gdb et valgrind',duree:'18 min',
contenu:`
<p>Ton programme compile mais plante, ou donne un mauvais résultat ? Deux outils vont te sauver.</p>
<h2>gdb : le débogueur</h2>
<p><b>gdb</b> te laisse exécuter ton programme <b>pas à pas</b>, mettre des pauses (« breakpoints »), et regarder la valeur des variables à tout moment. Quand ça plante, <code>gdb</code> te dit à quelle ligne.</p>
<pre>$ g++ -g main.cpp -o prog   # -g ajoute les infos de debug
$ gdb ./prog
(gdb) break main            # pause au début de main
(gdb) run                   # lance
(gdb) next                  # ligne suivante
(gdb) print x               # affiche la valeur de x</pre>
<h2>valgrind : le détecteur de fuites mémoire</h2>
<p>En C++, quand tu fais <code>new</code>, tu dois faire <code>delete</code>. Si tu oublies, la mémoire « fuit ». <b>valgrind</b> traque ces fuites et les accès mémoire interdits.</p>
<pre>$ valgrind ./prog
...
==1234== HEAP SUMMARY:
==1234==   definitely lost: 40 bytes in 1 blocks   &lt;- une fuite !
</pre>
<div class="box warn"><b>À Epitech, valgrind doit être « clean »</b><p>Un projet qui fuit de la mémoire ou fait des accès interdits est pénalisé, même s'il « marche ». La règle : chaque <code>new</code> a son <code>delete</code>, chaque ressource ouverte est fermée. Le destructeur est ton meilleur ami pour ça.</p></div>
<div class="box kid"><b>Le segfault</b><p>« Segmentation fault » = ton programme a touché une zone mémoire interdite (souvent un pointeur nullptr ou un indice de tableau hors limites). gdb te dit où, valgrind te dit pourquoi.</p></div>
`,
quiz:[
{q:'gdb sert à...',o:['compiler','exécuter pas à pas et inspecter un programme pour trouver les bugs','dessiner','écrire du code'],a:1},
{q:'valgrind détecte surtout...',o:['les fautes d\'orthographe','les fuites mémoire et accès interdits','la lenteur du clavier','les erreurs de norme'],a:1},
{q:'Un « segmentation fault » vient souvent de...',o:['un pointeur nullptr ou un indice hors limites','un commentaire','une majuscule','un espace'],a:0},
{q:'En C++, à chaque « new » doit correspondre...',o:['un cout','un delete','un return','un include'],a:1}]},

{id:'m9l3',titre:'La norme et git',duree:'15 min',
contenu:`
<h2>La norme (coding style)</h2>
<p>On l'a vu : Epitech impose une façon d'écrire le code, vérifiée par un outil officiel. Les règles les plus fréquentes :</p>
<ul>
<li><b>25 lignes maximum</b> par fonction.</li>
<li><b>80 colonnes maximum</b> par ligne.</li>
<li>Au plus <b>5 fonctions</b> par fichier.</li>
<li>Une ligne vide entre les fonctions, des noms clairs, une indentation régulière.</li>
<li>Des fichiers d'en-tête (<code>.hpp</code>) protégés par des « include guards » (<code>#ifndef ... #define ... #endif</code>).</li>
</ul>
<div class="box pro"><b>Astuce</b><p>Lance le vérificateur de norme avant chaque rendu. Du code juste mais hors-norme perd des points bêtement. Écrire proprement dès le début coûte moins cher que corriger à la fin.</p></div>
<h2>git : sauvegarder et rendre ton travail</h2>
<p>À Epitech, tu rends tes projets via <b>git</b>. C'est un carnet d'historique de ton code : tu enregistres des versions (« commits »), tu peux revenir en arrière, et tu envoies le tout sur le serveur (« push »).</p>
<pre>$ git add .                       # prépare tous les fichiers modifiés
$ git commit -m "ajoute le parser"  # enregistre une version avec un message
$ git push                          # envoie sur le serveur (c'est le rendu !)</pre>
<div class="box warn"><b>Ce qui est évalué, c'est ce qui est sur le serveur</b><p>Un projet parfait sur ton ordi mais jamais <code>push</code> = note zéro. Prends l'habitude de commit souvent (à chaque étape qui marche) et de push avant chaque deadline. Ne commit jamais les fichiers compilés (le <code>.gitignore</code> sert à les exclure).</p></div>
<h2>Les commandes git vitales</h2>
<div class="tablewrap"><table><tr><td class="mono">git status</td><td>ce qui a changé</td></tr>
<tr><td class="mono">git add .</td><td>préparer les changements</td></tr>
<tr><td class="mono">git commit -m "..."</td><td>enregistrer une version</td></tr>
<tr><td class="mono">git push</td><td>envoyer sur le serveur</td></tr>
<tr><td class="mono">git pull</td><td>récupérer la dernière version</td></tr></table></div>
`,
quiz:[
{q:'Combien de lignes maximum par fonction (norme Epitech) ?',o:['10','25','100','illimité'],a:1},
{q:'À Epitech, on rend ses projets via...',o:['e-mail','git (git push)','clé USB','un formulaire'],a:1},
{q:'Un projet parfait sur ton ordi mais jamais « push »...',o:['a la moyenne','vaut zéro : seul le serveur est évalué','est accepté','est noté plus tard'],a:1},
{q:'À quoi sert un « include guard » (#ifndef...) ?',o:['à colorer le code','à éviter qu\'un fichier .hpp soit inclus plusieurs fois','à compiler plus vite uniquement','à rien'],a:1}]}
]});

/* ---------- MODULE 10 : PROJETS TEK2 & PLAN ---------- */
MODULES.push({id:'m10',titre:'Les projets du Tek2 & ton plan',cat:'Passer à l\'action',badge:'Prêt pour la 2e année',
desc:'Un aperçu des vrais projets de deuxième année et ta feuille de route pour arriver prêt.',
intro:'<p>Voici à quoi ressemble concrètement ta deuxième année, et comment transformer ces bases en réussite. Coche ton plan au fur et à mesure.</p>',
lessons:[
{id:'m10l1',titre:'Les grands projets de 2e année',duree:'15 min',
contenu:`
<p>Les projets varient selon les années, mais voici les classiques du Tek2. Tous reposent sur ce que tu viens d'apprendre.</p>
<h2>Le module POO (orienté objet)</h2>
<ul>
<li><b>NanoTekSpice</b> : un <b>simulateur de circuits logiques</b> (portes ET, OU, additionneurs...). C'est souvent le premier projet objet de l'année. Il t'oblige à créer une interface commune de « composant » et à la faire implémenter par chaque type de porte — du polymorphisme pur.</li>
<li><b>Arcade</b> : une <b>borne de jeux rétro</b> (Snake, Pacman...) où les bibliothèques graphiques (SDL, ncurses...) et les jeux sont des modules <b>interchangeables à chaud</b>, chargés au lancement. Un sommet d'architecture objet, en équipe.</li>
</ul>
<h2>Le module programmation concurrente</h2>
<ul>
<li><b>Plazza</b> : une <b>pizzeria</b> qui gère plusieurs commandes en parallèle. Tu découvres les <b>threads</b> (faire plusieurs choses en même temps) et la communication entre processus.</li>
<li><b>Panoramix</b> : threads et verrous (mutex).</li>
</ul>
<h2>Le grand projet réseau</h2>
<ul>
<li><b>Zappy</b> : le gros projet de l'année — un jeu en réseau avec serveur, client graphique et intelligence artificielle. Réseau, mémoire, IA, graphismes : tout y passe, en équipe.</li>
</ul>
<h2>Et aussi</h2>
<p>Un module <b>fonctionnel</b> (Haskell : Wolfram, ImageCompressor), des projets <b>système</b> bas niveau (ton propre <code>malloc</code>, des outils comme <code>strace</code>/<code>ftrace</code>, du désassemblage), et des <b>maths</b>.</p>
<div class="box kid"><b>Ne panique pas</b><p>Ça paraît énorme vu d'ici, mais chaque projet se construit sur les briques de cette plateforme : variables, fonctions, pointeurs, classes, héritage, polymorphisme. Tu les as (presque) toutes. Le reste s'apprend projet par projet, avec ton équipe.</p></div>
`,
quiz:[
{q:'NanoTekSpice est un...',o:['site web','simulateur de circuits logiques (projet POO)','jeu mobile','tableur'],a:1},
{q:'Dans le projet Arcade, les jeux et bibliothèques graphiques sont...',o:['fixes','des modules interchangeables chargés au lancement','inutiles','écrits en Python'],a:1},
{q:'Plazza (la pizzeria) fait découvrir...',o:['le web','la programmation concurrente (threads, processus)','la crypto','le design'],a:1},
{q:'Zappy est...',o:['un petit exercice','le gros projet réseau de l\'année (serveur, client, IA)','un Makefile','une classe'],a:1}]},

{id:'m10l2',titre:'Ta feuille de route',duree:'10 min',
contenu:`
<p>Voici comment arriver prêt. Coche les étapes (c'est enregistré).</p>
<div class="roadmap">
<div class="month"><b>Étape 1 — Les fondations (cette plateforme)</b>
<div data-widget="checklist" data-id="p1" data-items="Terminer tous les modules ici|Refaire les défis sans indice|Savoir compiler avec g++ et lire une erreur|Comprendre pointeurs ET références (le plus important)"></div></div>
<div class="month"><b>Étape 2 — S'entraîner en vrai</b>
<div data-widget="checklist" data-id="p2" data-items="Installer un environnement Linux (ou une VM) avec g++, make, gdb, valgrind|Refaire chaque défi en le TAPANT et en le compilant pour de vrai|Faire des exercices sur une plateforme en ligne (voir ci-dessous)|Écrire un petit projet perso : une classe + un Makefile propre"></div></div>
<div class="month"><b>Étape 3 — Monter vers la POO des projets</b>
<div data-widget="checklist" data-id="p3" data-items="Faire une mini-hiérarchie de classes (ex : Forme -> Cercle, Carre) avec du polymorphisme|S'assurer que valgrind est clean (chaque new a son delete)|Respecter la norme Epitech dès le premier jet|S'entraîner à git : commit souvent, push avant chaque deadline"></div></div>
</div>
<h2>Où t'entraîner (gratuit)</h2>
<div class="tablewrap"><table><tr><th>Pour...</th><th>Va sur...</th></tr>
<tr><td>Pratiquer le C++ par petits exercices</td><td><a href="https://www.learncpp.com">learncpp.com</a> (le cours de référence, en anglais)</td></tr>
<tr><td>Des défis de code progressifs</td><td><a href="https://www.codingame.com">CodinGame</a> (en jouant)</td></tr>
<tr><td>S'exercer aux algos</td><td><a href="https://leetcode.com">LeetCode</a> (niveau Easy pour commencer)</td></tr>
<tr><td>La doc officielle</td><td><a href="https://cppreference.com">cppreference.com</a></td></tr></table></div>
<div class="box kid"><b>Le mot de la fin</b><p>Tu n'as pas besoin d'être un génie — juste d'être régulier et de ne pas lâcher quand tu bloques. C'est exactement l'esprit de la Piscine. Reviens ici réviser une base quand tu veux. Dernière réponse à valider, pour la route : <b class="mono" style="color:var(--accent)">CPP{pret_pour_le_tek2}</b></p></div>
`,
quiz:[
{q:'La compétence la plus importante à solidifier avant le Tek2 ?',o:['les couleurs','pointeurs et références','rien','le web'],a:1},
{q:'Avant de rendre un projet Epitech, il faut vérifier que valgrind est...',o:['lent','clean (pas de fuite mémoire)','coloré','absent'],a:1},
{q:'Bon réflexe git pendant un projet ?',o:['push une seule fois à la fin','commit souvent et push avant chaque deadline','ne jamais commit','supprimer le .git'],a:1},
{q:'Le vrai secret de la réussite à Epitech ?',o:['être un génie','la régularité et la persévérance','la chance','un bon ordinateur'],a:1}],
chal:{titre:'Prêt pour la deuxième année',xp:30,niveau:'facile',enonce:'<p>La dernière réponse à valider est cachée dans le dernier encadré du cours (« Le mot de la fin »). Trouve-la, et considère-toi prêt pour le Tek2.</p>',flag:'CPP{pret_pour_le_tek2}',hints:['Relis le tout dernier encadré bleu du cours.'],bravo:'Parcours des fondations C++ terminé. Maintenant, tape du code, compile, et fonce. Bon Tek2 !'}}
]});

/* ---------- PAGES ---------- */
const ARSENAL=`<div class="crumb"><a href="#accueil">QG</a> / Mémo</div><h1>Le mémo C++</h1>
<p class="muted">Tout ce qu'il faut sous les yeux pour la Piscine : syntaxe, compilation, norme.</p>
<h2>Compiler & lancer</h2>
<div class="tablewrap"><table><tr><th>Commande</th><th>Rôle</th></tr>
<tr><td class="mono">g++ main.cpp -o prog</td><td>compiler vers l'exécutable « prog »</td></tr>
<tr><td class="mono">g++ -Wall -Wextra -Werror ...</td><td>les options Epitech (warnings = erreurs)</td></tr>
<tr><td class="mono">g++ -g ...</td><td>ajoute les infos de debug (pour gdb)</td></tr>
<tr><td class="mono">./prog</td><td>exécuter</td></tr>
<tr><td class="mono">make / make re / make fclean</td><td>compiler / tout recompiler / nettoyer</td></tr>
<tr><td class="mono">gdb ./prog &nbsp;·&nbsp; valgrind ./prog</td><td>déboguer &nbsp;·&nbsp; chasser les fuites mémoire</td></tr></table></div>
<h2>Les bases en un coup d'œil</h2>
<pre>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

int main()
{
    int n = 5;                        // entier
    double x = 2.5;                   // virgule
    char c = 'A';                     // un caractère (apostrophes)
    std::string s = "texte";          // texte (guillemets)
    bool ok = true;                   // vrai/faux

    std::cout &lt;&lt; s &lt;&lt; n &lt;&lt; std::endl;  // afficher
    std::cin  &gt;&gt; n;                   // lire

    if (n &gt; 0) { } else { }           // condition
    for (int i = 0; i &lt; n; i++) { }   // boucle compteur
    while (n &gt; 0) { n--; }            // boucle tant que
    return 0;
}</pre>
<h2>Pointeurs & références</h2>
<div class="tablewrap"><table><tr><td class="mono">&amp;x</td><td>adresse de x</td><td class="mono">int *p = &amp;x;</td><td>p pointe sur x</td></tr>
<tr><td class="mono">*p</td><td>la valeur à l'adresse p</td><td class="mono">int &amp;r = x;</td><td>r est un surnom de x</td></tr></table></div>
<h2>Une classe type</h2>
<pre>class Point {
private:
    int _x;
    int _y;
public:
    Point(int x, int y) : _x(x), _y(y) {}   // constructeur
    ~Point() {}                              // destructeur
    int getX() const { return _x; }          // méthode
};</pre>
<h2>Héritage & polymorphisme</h2>
<pre>class Base {
public:
    virtual int compute() = 0;   // méthode pure → classe abstraite
    virtual ~Base() {}           // destructeur virtuel OBLIGATOIRE
};
class Derivee : public Base {
public:
    int compute() override { return 42; }
};</pre>
<h2>La norme Epitech (l'essentiel)</h2>
<p>25 lignes max/fonction · 80 colonnes max/ligne · 5 fonctions max/fichier · include guards dans les .hpp · valgrind clean · chaque <code>new</code> a son <code>delete</code>.</p>`;

const PLAN=`<div class="crumb"><a href="#accueil">QG</a> / Plan</div><h1>Ton plan vers le Tek2</h1>
<p>La deuxième année d'Epitech tourne autour de la <b>programmation orientée objet</b> en C++ : des projets comme <b>NanoTekSpice</b> (simulateur de circuits), <b>Arcade</b> (borne de jeux modulaire), <b>Plazza</b> (programmation concurrente) et le grand projet réseau <b>Zappy</b>. Tout repose sur les bases ci-dessous.</p>
<div class="box kid"><b>Comment utiliser ce plan</b><p>Coche les étapes au fur et à mesure (c'est enregistré). Ne saute pas les pointeurs ni la POO : c'est là-dessus que tout se joue.</p></div>
<h2>Feuille de route</h2>
<div class="roadmap">
<div class="month"><b>Étape 1 — Fondations</b><div data-widget="checklist" data-id="r1" data-items="Finir les 11 modules de cette plateforme|Refaire les défis sans indice|Compiler/lancer un programme avec g++|Lire et corriger une erreur de compilation"></div></div>
<div class="month"><b>Étape 2 — Pratique réelle</b><div data-widget="checklist" data-id="r2" data-items="Monter un Linux avec g++, make, gdb, valgrind|Retaper chaque défi et le compiler pour de vrai|Exercices sur learncpp.com / CodinGame|Un mini-projet perso avec Makefile propre"></div></div>
<div class="month"><b>Étape 3 — Niveau POO</b><div data-widget="checklist" data-id="r3" data-items="Une hiérarchie de classes avec polymorphisme (Forme -> Cercle, Carre)|valgrind clean sur tous tes programmes|Respecter la norme dès le 1er jet|git : commit souvent, push avant chaque deadline"></div></div>
</div>
<h2>Les ressources, par usage</h2>
<div class="tablewrap"><table><tr><th>Pour...</th><th>Va sur...</th></tr>
<tr><td>Le cours C++ de référence</td><td><a href="https://www.learncpp.com">learncpp.com</a></td></tr>
<tr><td>S'entraîner en s'amusant</td><td><a href="https://www.codingame.com">CodinGame</a></td></tr>
<tr><td>Algorithmes (niveau Easy)</td><td><a href="https://leetcode.com">LeetCode</a></td></tr>
<tr><td>La documentation officielle</td><td><a href="https://cppreference.com">cppreference.com</a></td></tr></table></div>
<p class="muted">Rappel Epitech : on ne copie jamais le code d'un autre. S'inspirer d'explications, oui ; copier, c'est -42.</p>`;

const GLOSS=[
['compilateur (g++)','Traduit ton code C++ en programme exécutable par la machine.'],
['exécutable','Le programme final produit par la compilation (ex : a.out). On le lance avec ./a.out'],
['main()','La fonction principale : l\'exécution commence toujours là.'],
['#include','Importe un outil ou une bibliothèque (ex : <iostream> pour afficher).'],
['std::cout','Affiche du texte à l\'écran (<< pousse vers l\'écran).'],
['std::cin','Lit ce que l\'utilisateur tape au clavier (>> met dans une variable).'],
['variable','Une boîte nommée en mémoire qui contient une valeur.'],
['type','Ce que contient une variable : int, double, char, bool, std::string.'],
['int / double','Nombre entier / nombre à virgule.'],
['char / string','Un seul caractère (\'A\') / du texte ("abc").'],
['bool','Vrai (true) ou faux (false).'],
['opérateur %','Le modulo : le reste d\'une division entière (7 % 2 = 1).'],
['if / else','Exécute du code selon qu\'une condition est vraie ou fausse.'],
['== vs =','== compare, = affecte (met une valeur). Ne pas confondre !'],
['boucle (for, while)','Répète un bloc de code.'],
['fonction','Une mini-machine : reçoit des paramètres, renvoie un résultat (return).'],
['void','Type de retour d\'une fonction qui ne renvoie rien.'],
['portée (scope)','Zone { } où une variable existe ; dehors, elle disparaît.'],
['pointeur','Une variable qui contient l\'ADRESSE d\'une autre variable. Déclaré avec *.'],
['&x','L\'adresse de la variable x.'],
['*p','La valeur rangée à l\'adresse contenue dans p.'],
['nullptr','Pointeur qui ne pointe sur rien. Lire *nullptr fait planter (segfault).'],
['référence (&)','Un surnom pour une variable existante. Modifier le surnom modifie l\'original.'],
['std::vector','Une liste qui grandit toute seule (push_back, size, []).'],
['classe','Le plan de construction d\'objets (attributs + méthodes).'],
['objet (instance)','Un exemplaire fabriqué à partir d\'une classe.'],
['attribut','Une donnée appartenant à un objet.'],
['méthode','Une fonction appartenant à une classe/objet.'],
['encapsulation','Cacher les données (private) et n\'exposer que des méthodes sûres (public).'],
['constructeur','Méthode exécutée à la création d\'un objet pour l\'initialiser.'],
['destructeur (~)','Méthode exécutée quand l\'objet disparaît (libère les ressources).'],
['this','Pointeur vers l\'objet courant à l\'intérieur d\'une méthode.'],
['héritage','Une classe enfant reprend et spécialise une classe parent (« est un »).'],
['virtual','Permet au bon comportement de sortir selon le vrai type : le polymorphisme.'],
['override','Indique qu\'une méthode redéfinit celle du parent.'],
['classe abstraite','Classe avec une méthode = 0 ; sert de contrat (interface), non instanciable.'],
['polymorphisme','Un même appel, des comportements différents selon le type réel de l\'objet.'],
['Makefile','Fichier qui automatise la compilation. On tape « make ».'],
['new / delete','Réserver / libérer de la mémoire. Chaque new doit avoir son delete.'],
['segfault','Segmentation fault : accès à une zone mémoire interdite (souvent un pointeur fautif).'],
['gdb','Débogueur : exécute pas à pas et inspecte les variables.'],
['valgrind','Détecte les fuites mémoire et les accès interdits.'],
['norme (coding style)','Les règles d\'écriture imposées par Epitech, vérifiées par un outil.'],
['git','Gère l\'historique du code. commit = enregistrer, push = envoyer (le rendu !).'],
['Piscine','Période intense d\'exercices pour apprendre en autonomie, « dans le grand bain ».'],
];
