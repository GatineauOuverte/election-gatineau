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

  setTimeout($scope.refresh,1000);
  // $scope.refresh();

}


  //   <div class="panel panel-default"><div class="panel-heading">
  //     <h4 class="panel-title">
  //       <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
  //         Collapsible Group Item #1
  //       </a>
  //     </h4>
  //   </div>
  //   <div id="collapseOne" class="panel-collapse collapse in">
  //     <div class="panel-body">
  //       Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
  //     </div>
  //   </div>
  // </div>
