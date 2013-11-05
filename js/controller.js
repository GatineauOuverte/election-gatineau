function ElectionCtrl($scope,$http) {
  $scope.refreshing=false;
  $scope.data={
    ville : {
      nom:'Gatineau',
      nb_electeur: "0",
      region: "Outaouais"
    },
    maj: "2013-09-27 15:37",
    saisie_termine: "non",
    postes : [ {
      candidats: [],
      id: "194100",
      id_arrondissement: "",
      nb_votes_rejet: "0",
      no: "0",
      nom: "",
      type_poste: "M"
    }]
  }


  var jsonURL = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fdonnees.electionsmunicipales.gouv.qc.ca%2F81017.json'&format=json"

  $scope.refresh = function(){
    $scope.refreshing=true;
    $http.get(jsonURL).then(function (response) {
      // console.log('response',response);
      $scope.data = response.data.query.results.json;
      // console.log('response.data',$scope.data);
    }).finally(function(){
      $scope.refreshing=false;
    });
  };

  // invoke refresh on creation
  $scope.refresh();
  setInterval(function(){
    $scope.refresh();
  },30000);

  // use the external library latinise: should be a module
  $scope.c7nComparator = function(expected, actual){
    console.log('- =?=',expected,actual);
    // default case insensitive comparator, reimplemented for collation (c7n) neutralization
    c7n_actual = (''+actual).latinise().toLowerCase();
    c7n_expected = (''+expected).latinise().toLowerCase();
    //console.log(expected,c7n_expected,'=?=',c7n_actual,actual);
    return (c7n_expected).indexOf(c7n_actual) > -1
  }

  // extract photos from http://www.gatineau.ca/page.asp?p=la_ville/election_municipale_2013/districts_electoraux
  // a=[];Array.prototype.slice.call(document.querySelectorAll('img[width="100"]')).forEach(function(n){src=n.getAttribute('src'); if (src!='silhouette.jpg') a.push(src)})
  var photos=["bureau_marc.jpg", "pedneaud_jobin_maxime.jpg", "lacasse_josee.jpg", "duggan_mike.jpg", "begin_rechard.jpg", "blondin_jocelyn.jpg", "meilleur_christan.jpg", "bonneville_bruno.jpg", "boudrias_louse.jpg", "corbo_adrian.jpg", "laferriere_denise.jpg", "miron_isabelle.jpg", "tessier_cedric.jpg", "fortin_bordeleau_alexandre.jpg", "tasse_denis.jpg", "nadeau_myriam.jpg", "benyelles_nawel.jpg", "carpentier_gilles.jpg", "champagne_daniel.jpg", "ouimet_genevieve.jpg", "goneau_sylvie.jpg", "violy_christian.jpg", "ahmimed_chakib.jpg", "lauzon_stephane.jpg", "lessard_jean.jpg", "noble_jason_s.jpg", "lajeunesse_martin.jpg"]
  var photoById = {"310":"tasse_denis.jpg","631":"begin_rechard.jpg","662":"boudrias_louse.jpg","1059":"ahmimed_chakib.jpg","1094":"ouimet_genevieve.jpg","1203":"duggan_mike.jpg","1328":"miron_isabelle.jpg","1384":"lajeunesse_martin.jpg","1483":"benyelles_nawel.jpg","1630":"champagne_daniel.jpg","1662":"carpentier_gilles.jpg","1890":"lessard_jean.jpg","1956":"violy_christian.jpg","2019":"noble_jason_s.jpg","2370":"tessier_cedric.jpg","2530":"lauzon_stephane.jpg","2624":"nadeau_myriam.jpg","2829":"fortin_bordeleau_alexandre.jpg","3009":"bonneville_bruno.jpg","3104":"corbo_adrian.jpg","3400":"blondin_jocelyn.jpg","3473":"pedneaud_jobin_maxime.jpg","4334":"goneau_sylvie.jpg","4641":"laferriere_denise.jpg","4987":"lacasse_josee.jpg","5026":"champagne_daniel.jpg","5090":"meilleur_christan.jpg","5211":"bureau_marc.jpg"};
  var photoByName = {"Bureau":"bureau_marc.jpg","Pedneaud-Jobin":"pedneaud_jobin_maxime.jpg","Lacasse":"lacasse_josee.jpg","Duggan":"duggan_mike.jpg","Bégin":"begin_rechard.jpg","Blondin":"blondin_jocelyn.jpg","Meilleur":"meilleur_christan.jpg","Bonneville":"bonneville_bruno.jpg","Boudrias":"boudrias_louse.jpg","Corbo":"corbo_adrian.jpg","Laferrière":"laferriere_denise.jpg","Miron":"miron_isabelle.jpg","Champagne":"champagne_daniel.jpg","Tessier":"tessier_cedric.jpg","Fortin-Bordeleau":"fortin_bordeleau_alexandre.jpg","Tassé":"tasse_denis.jpg","Nadeau":"nadeau_myriam.jpg","Benyelles":"benyelles_nawel.jpg","Carpentier":"carpentier_gilles.jpg","Ouimet":"ouimet_genevieve.jpg","Goneau":"goneau_sylvie.jpg","Violy":"violy_christian.jpg","Ahmimed":"ahmimed_chakib.jpg","Lauzon":"lauzon_stephane.jpg","Lessard":"lessard_jean.jpg","Noble":"noble_jason_s.jpg","Lajeunesse":"lajeunesse_martin.jpg"};

  $scope.getPhoto = function(candidat){
    var base = "http://www.gatineau.ca/docs/la_ville/election_municipale_2013/districts_electoraux/";
    var photo=photoById[candidat.id];

    photo = photo || 'silhouette.jpg'
    return base+photo;

  }

}
