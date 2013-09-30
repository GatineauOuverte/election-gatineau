
$( document ).ready( function() {
  // on first load, click refresh
  $( "#refreshBtn" ).click()
});

function animRefresh(){
  $( "#refreshBtn" ).find('i').removeClass('icon-repeat').addClass('icon-refresh icon-spin')
}
function freezeRefresh(){
  $( "#refreshBtn" ).find('i').removeClass('icon-refresh icon-spin').addClass('icon-repeat')
}

// passed through YQL for CORS
jsonURL = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fdonnees.electionsmunicipales.gouv.qc.ca%2F81017.json'&format=json"

$( "#refreshBtn" ).bind( "click", function() {
  animRefresh()
  $.getJSON( jsonURL, function( data ) {
    freezeRefresh();

    postes = data.query.results.json.ville.postes;
    $content = buildResult(postes);
    $( "#output" ).fadeOut( "fast", function(){
      $( this ).empty()
      .append( $content )
      .fadeIn( "slow" );            
    });
  });
});

function buildResult(postes){
  console.log('postes',postes);
  var $accordion = $('<div class="panel-group" id="accordion">');
  var $content = $( "<ul />" );
  $.each( postes, function( index, item ) {
    var $postes = $( "<li />", { "text" : item.type_poste+' '+item.id +' ('+item.nom+')'} );
    $candidats  = $( "<ul />" );

    $.each( item.candidats, function( index, candidat ) {
        var $candidat = $( "<li />", { "text" : candidat.prenom+' '+candidat.nom +' ('+candidat.parti+')'} );

        $candidat.appendTo( $candidats );

    });
    $candidats.appendTo($postes)
    $postes.appendTo( $content );
  });

  return $content;

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


}