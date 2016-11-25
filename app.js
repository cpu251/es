console.log('作者：KUMA\n这是一个用来计算偶像梦幻祭演唱会组队数值的网页，运用了Bootstrap3, Jquery3, AngularJs来做的~~KUMA');

var ver = 1611251108;
var app = angular.module('esApp', []);
app.controller('esCtrl', function($scope) {
  $('body').css('display', '');

  $scope.parseInt = function(val){
    return parseInt(val);
  }

  $scope.temporary_team = temporary_team;
  $scope.selectedTemporaryTeam = $scope.temporary_team[0];

  if(window.localStorage.getItem('ver') != null && window.localStorage.getItem('ver') < ver){
    window.localStorage.removeItem('character');
    window.localStorage.removeItem('teams');
    window.localStorage.removeItem('readUpdate');
  }

  if(window.localStorage.getItem('readUpdate') != null){
    $scope.readUpdate = window.localStorage.getItem('readUpdate');
  }else{
    $scope.readUpdate = 'false';
  }

  $scope.readUpdateFun = function(){
    $scope.readUpdate = 'true';
    window.localStorage.setItem('ver', ver);
    window.localStorage.setItem('readUpdate', 'true');
  }

  $scope.originalCharacter = character;
  $scope.character = angular.copy($scope.originalCharacter);
  if(window.localStorage.getItem('character') != null){
    $scope.character = $scope.character.concat(angular.fromJson(window.localStorage.getItem('character')));
  }
  $scope.characterEdit = [];
  $scope.$watch("character", function(n, o){
    if(n == o || $scope.character == $scope.originalCharacter){
      return;
    }
    window.localStorage.setItem('ver', ver);
    var tempCharacter = angular.copy($scope.character);
    tempCharacter.splice(0, $scope.originalCharacter.length);
    $scope.characterJson = angular.toJson(tempCharacter);
    window.localStorage.setItem('character', $scope.characterJson);
  },true);

  $scope.originalTeams = team;
  $scope.teams = angular.copy($scope.originalTeams);
  if(window.localStorage.getItem('teams') != null){
    $scope.teams = angular.fromJson(window.localStorage.getItem('teams'));
  }
  $scope.teamEdit = [];
  $scope.$watch("teams", function(n, o){
    if(n == o || $scope.teams == $scope.originalTeams){
      return;
    }
    $scope.teamShow = false;
    for(t in $scope.teams){
      for(m in $scope.teams[t].member){
        if($scope.teams[t].member[m] == ''){
          $scope.teams[t].member.splice(m, 1);
        }
      }
    }
    window.localStorage.setItem('ver', ver);
    $scope.teamsJson = angular.toJson($scope.teams);
    window.localStorage.setItem('teams', $scope.teamsJson);
  },true);

  $scope.ability = [
    {
      ability: 'da',
      name: '舞蹈(红)'
    },
    {
      ability: 'vo',
      name: '声乐(蓝)'
    },
    {
      ability: 'pf',
      name: '表演(黄)'
    },
  ]
  $scope.star = [5, 4, 3];
  $scope.level = {
    5:[80,75,70,65,60],
    4:[70,65,60,55,50],
    3:[60,55,50,45,40],
  };
  $scope.times = {
    3:{
      40: 2,
      45: 2.5,
      50: 3,
      55: 3.5,
      60: 4,
    },
    4:{
      50: 2,
      55: 2.5,
      60: 3,
      65: 3.5,
      70: 4,
    },
    5:{
      60: 2,
      65: 2.5,
      70: 3,
      75: 3.5,
      80: 4,
    },
  };
  $scope.timesClass = function(card){
    var val = '';
    if(card.times && typeof($scope.times[card.star]) != 'undefined' && typeof($scope.times[card.star][card.level]) != 'undefined'){
      val = 'text-danger';
    }
    return val;
  }
  $scope.timesVal = function(card, ab){
    var val = 1;
    if(card.times && typeof($scope.times[card.star]) != 'undefined' && typeof($scope.times[card.star][card.level]) != 'undefined'){
      val = $scope.times[card.star][card.level];
    }
    return parseInt(ab * val);
  }
  var cards = window.localStorage.getItem('cards');
  if(cards == null){
    $scope.cards = [{
      star: 5,
      level: 80,
      name: '',
      character: '南云铁虎',
      da: '',
      vo: '',
      pf: '',
      times: false,
    }];
    $scope.cardsJson = angular.toJson($scope.cards);
  }else{
    $scope.cardsJson = cards;
    $scope.cards = angular.fromJson($scope.cardsJson);
  }
  $scope.$watch("cards", function(n, o){
    if(n == o){
      return;
    }
    $scope.cardsJson = angular.toJson($scope.cards);
    window.localStorage.setItem('cards', $scope.cardsJson);
  },true);
  $scope.loadCards = function(){
    $scope.cardsJson = angular.toJson($scope.cards);
    window.localStorage.setItem('cards', $scope.cardsJson);
  }
  $scope.loadCardsJson = function(){
    $scope.cards = angular.fromJson($scope.cardsJson);
    $scope.teamShow = false;
    $scope.configCharacterShow = false;
    $scope.configTeamShow = false;
    $('#cardsModal').modal('hide');
  }
  $scope.removeCardsJson = function(){
    $scope.cards = [{
      star: 5,
      level: 80,
      name: '',
      character: '南云铁虎',
      da: '',
      vo: '',
      pf: '',
      times: false,
    }];
    $scope.cardsJson = angular.toJson($scope.cards);
    $scope.teamShow = false;
    $scope.configCharacterShow = false;
    $scope.configTeamShow = false;
    $('#cardsModal').modal('hide');
    $('#removeCardsModal').modal('hide');
  }
  $scope.levelChange = function(index){
    if($.inArray($scope.cards[index].level, $scope.level[$scope.cards[index].star]) == -1){
      $scope.cards[index].level = $scope.level[$scope.cards[index].star][0];
    }
  }
  $scope.times_radio = function(index, times){
    $scope.cards[index].times = times;
  }
  $scope.cardAdd = function(index){
    $scope.cards.splice(index + 1, 0, {
      star: 5,
      level: 80,
      name: '',
      character: '南云铁虎',
      da: '',
      vo: '',
      pf: '',
      times: false,
    });
  }
  $scope.cardRemove = function(index){
    $scope.cards.splice(index, 1);
  }
  $scope.cardUp = function(index){
    var tempcard = $scope.cards[index];
    $scope.cards[index] = $scope.cards[index - 1];
    $scope.cards[index - 1] = tempcard;
  }
  $scope.cardDown = function(index){
    var tempcard = $scope.cards[index];
    $scope.cards[index] = $scope.cards[index + 1];
    $scope.cards[index + 1] = tempcard;
  }

  $scope.configCharacterShow = false;
  $scope.configCharacter = function(flag){
    $scope.teamShow = false;
    $scope.configTeamShow = false;
    $scope.configCharacterShow = flag;
  }
  $scope.addCharacter = function(){
    $scope.characterEdit[$scope.character.length] = true;
    $scope.character.push('');
  }
  $scope.editCharacter = function(index){
    $scope.characterEdit[index] = true;
  }
  $scope.confirmCharacter = function(index){
    $scope.character[index] = $('input[name="character[' + index + ']"').val();
    $scope.characterEdit[index] = false;
  }
  $scope.delCharacter = function(index){
    $scope.character.splice(index, 1);
  }
  $scope.loadCharacter = function(){
    var tempCharacter = angular.copy($scope.character);
    tempCharacter.splice(0, $scope.originalCharacter.length);
    $scope.characterJson = angular.toJson(tempCharacter);
    window.localStorage.setItem('character', $scope.characterJson);
  }
  $scope.loadCharacterJson = function(){
    var tempCharacter = angular.copy($scope.originalCharacter);
    tempCharacter = tempCharacter.concat(angular.fromJson($scope.characterJson));
    $scope.character = tempCharacter;
    window.localStorage.setItem('ver', ver);
    $scope.teamShow = false;
    /*$scope.configCharacterShow = false;
     $scope.configTeamShow = false;*/
    $('#characterModal').modal('hide');
  }
  $scope.removeCharacterJson = function(){
    $scope.character = angular.copy($scope.originalCharacter);
    window.localStorage.removeItem('character');
    if(window.localStorage.getItem('teams') == null){
      window.localStorage.removeItem('ver');
    }
    $scope.teamShow = false;
    /*$scope.configCharacterShow = false;
     $scope.configTeamShow = false;*/
    $('#characterModal').modal('hide');
    $('#removeCharacterModal').modal('hide');
  }

  $scope.configTeamShow = false;
  $scope.configTeam = function(flag){
    $scope.teamShow = false;
    $scope.configCharacterShow = false;
    $scope.configTeamShow = flag;
  }
  $scope.teamClass = function(index){
    if($scope.teams[index].ability == 'da'){
      return 'danger';
    }else if($scope.teams[index].ability == 'vo'){
      return 'info';
    }else if($scope.teams[index].ability == 'pf'){
      return 'warning';
    }
  }
  $scope.addTeam = function(){
    $scope.teamEdit[$scope.teams.length] = true;
    $scope.teams.push({
      name: '',
      ability: 'da',
      value: '',
      member: [$scope.character[0]],
      del: true,
    });
  }
  $scope.editTeam = function(index){
    $scope.teamEdit[index] = true;
  }
  $scope.confirmTeam = function(index){
    if($scope.teams[index].value==''){
      $scope.teams[index].value = 0;
    }
    $scope.teamEdit[index] = false;
  }
  $scope.delTeam = function(index){
    $scope.teams.splice(index, 1);
  }
  $scope.loadTeams = function(){
    $scope.teamsJson = angular.toJson($scope.teams);
    window.localStorage.setItem('teams', $scope.teamsJson);
  }
  $scope.loadTeamsJson = function(){
    $scope.teams = angular.fromJson($scope.teamsJson);
    window.localStorage.setItem('ver', ver);
    $scope.teamShow = false;
    /*$scope.configCharacterShow = false;
     $scope.configTeamShow = false;*/
    $('#teamsModal').modal('hide');
  }
  $scope.removeTeamsJson = function(){
    $scope.teams = angular.copy($scope.originalTeams);
    window.localStorage.removeItem('teams');
    if(window.localStorage.getItem('character') == null){
      window.localStorage.removeItem('ver');
    }
    $scope.teamShow = false;
    /*$scope.configCharacterShow = false;
     $scope.configTeamShow = false;*/
    $('#teamsModal').modal('hide');
    $('#removeTeamsModal').modal('hide');
  }

  $scope.teamShow = false;
  $scope.hideTeam = function(){
    $scope.teamShow = false;
  }

  $scope.da_max_team = [], $scope.vo_max_team = [], $scope.pf_max_team = [], $scope.da_max_team_2 = [], $scope.vo_max_team_2 = [], $scope.pf_max_team_2 = [];
  $scope.buildTeam = function(){
    if($scope.cards.length < 15){
      $scope.errorText = '请至少添加15张卡片KUMA';
      $('#errorModal').modal('show');
      return false;
    }
    for(var c in $scope.cards){
      if($scope.cards[c].da == ''){
        $scope.cards[c].da = 0;
      }
      if($scope.cards[c].vo == ''){
        $scope.cards[c].vo = 0;
      }
      if($scope.cards[c].pf == ''){
        $scope.cards[c].pf = 0;
      }
    }
    $scope.da_card = [], $scope.vo_card = [], $scope.pf_card = [];
    $scope.cards_sort();
    $scope.da_team = [], $scope.vo_team = [], $scope.pf_team = [];
    $scope.teams_sort();

    $scope.da_max_team = $scope.max_team($scope.da_team, $scope.da_card, 'da');
    $scope.vo_max_team = $scope.max_team($scope.vo_team, $scope.vo_card, 'vo');
    $scope.pf_max_team = $scope.max_team($scope.pf_team, $scope.pf_card, 'pf');
    $scope.da_max_team_2 = $scope.max_team($scope.da_team, $scope.da_card, 'da_2');
    $scope.vo_max_team_2 = $scope.max_team($scope.vo_team, $scope.vo_card, 'vo_2');
    $scope.pf_max_team_2 = $scope.max_team($scope.pf_team, $scope.pf_card, 'pf_2');
    $scope.teamShow = true;
    $scope.configCharacterShow = false;
    $scope.configTeamShow = false;
  }

  $scope.cardColor = function(card){
    if(card.da >= card.vo && card.da >= card.pf){
      return 'danger';
    }else if(card.vo >= card.da && card.vo >= card.pf){
      return 'info';
    }else if(card.pf >= card.da && card.pf >= card.vo){
      return 'warning';
    }
  }

  $scope.cards_sort = function(){
    $scope.da_card = $scope.da_card.concat($scope.cards);
    $scope.da_card.sort(function (a, b) {
      var a_da = a.da, b_da = b.da;
      if(a.times && typeof($scope.times[a.star]) != 'undefined' && typeof($scope.times[a.star][a.level]) != 'undefined'){
        a_da *= $scope.times[a.star][a.level];
      }
      if(b.times && typeof($scope.times[b.star]) != 'undefined' && typeof($scope.times[b.star][b.level]) != 'undefined'){
        b_da *= $scope.times[a.star][a.level];
      }
      return b_da - a_da;
    });
    $scope.vo_card = $scope.vo_card.concat($scope.cards);
    $scope.vo_card.sort(function (a, b) {
      var a_vo = a.vo, b_vo = b.vo;
      if(a.times && typeof($scope.times[a.star]) != 'undefined' && typeof($scope.times[a.star][a.level]) != 'undefined'){
        a_vo *= $scope.times[a.star][a.level];
      }
      if(b.times && typeof($scope.times[b.star]) != 'undefined' && typeof($scope.times[b.star][b.level]) != 'undefined'){
        b_vo *= $scope.times[a.star][a.level];
      }
      return b_vo - a_vo;
    });
    $scope.pf_card = $scope.pf_card.concat($scope.cards);
    $scope.pf_card.sort(function (a, b) {
      var a_pf = a.pf, b_pf = b.pf;
      if(a.times && typeof($scope.times[a.star]) != 'undefined' && typeof($scope.times[a.star][a.level]) != 'undefined'){
        a_pf *= $scope.times[a.star][a.level];
      }
      if(b.times && typeof($scope.times[b.star]) != 'undefined' && typeof($scope.times[b.star][b.level]) != 'undefined'){
        b_pf *= $scope.times[a.star][a.level];
      }
      return b_pf - a_pf;
    });
  }

  $scope.teams_sort = function(){
    var tempTeams = angular.copy($scope.teams);
    if($scope.selectedTemporaryTeam.member.length > 0){
      tempTeams.push($scope.selectedTemporaryTeam);
    }
    for (i in tempTeams) {
      if(tempTeams[i].member.length > 0){
        if (tempTeams[i].ability == 'da') {
          $scope.da_team.push(tempTeams[i]);
        } else if (tempTeams[i].ability == 'vo') {
          $scope.vo_team.push(tempTeams[i]);
        } else if (tempTeams[i].ability == 'pf') {
          $scope.pf_team.push(tempTeams[i]);
        }
      }
    }
    $scope.da_team = team_concat($scope.da_team);
    $scope.vo_team = team_concat($scope.vo_team);
    $scope.pf_team = team_concat($scope.pf_team);
    function team_concat(team) {
      var temp_team = [];
      for (var t1 in team) {
        if(team[t1].leader == null){
          team[t1].leader = team[t1].member;
        }
        if(team[t1].key == null){
          team[t1].key = [t1];
        }
      }
      for (var t1 in team) {
        for (var t2 in team) {
          if (t1 < t2) {
            var flag = false;
            var leader = [];
            for (var m = 0; m < team[t1].leader.length; m++) {
              if ($.inArray(team[t1].leader[m], team[t2].leader) > -1) {
                leader.push(team[t1].leader[m]);
                flag = true;
              }
            }
            var key = [];
            key = key.concat(team[t1].key, team[t2].key);
            key = $.uniqueSort(key);
            key.sort();
            if(key.length < team[t1].key.length + team[t2].key.length){
              flag = false;
            }else if(flag){
              for(var t3 in team){
                if(key.length == team[t3].key.length){
                  var num = 0;
                  for(var k in key){
                    if(key[k] == team[t3].key[k]){
                      num++;
                    }
                  }
                  if(num == key.length){
                    flag = false;
                  }
                }
              }
              for(var t3 in temp_team){
                if(key.length == temp_team[t3].key.length){
                  var num = 0;
                  for(var k in key){
                    if(key[k] == temp_team[t3].key[k]){
                      num++;
                    }
                  }
                  if(num == key.length){
                    flag = false;
                  }
                }
              }
            }
            if (flag) {
              var temp_member = [];
              temp_member = temp_member.concat(leader, team[t1].member, team[t2].member);
              temp_member = $.uniqueSort(temp_member);
              if (temp_member.length <= 5) {
                var name = team[t1].name + '+' + team[t2].name;
                temp_team.push({
                  name: name,
                  ability: team[t1].ability,
                  value: team[t1].value + team[t2].value,
                  member: temp_member,
                  del: false,
                  leader: leader,
                  key: key,
                });
              }
            }
          }
        }
      }
      if(temp_team.length > 0){
        team = team.concat(temp_team);
        team = team_concat(team);
      }
      return team;
    }
  }

  $scope.max_team = function(team, card, ability) {
    var temp_team = {
      card: [],
      key: [],
      team: [
        {
          name: 'no_team',
          da: 0,
          vo: 0,
          pf: 0,
          all: 0,
          value: 0,
          member: [],
          card: [],
        },
        {
          name: 'no_team',
          da: 0,
          vo: 0,
          pf: 0,
          all: 0,
          value: 0,
          member: [],
          card: [],
        },
        {
          name: 'no_team',
          da: 0,
          vo: 0,
          pf: 0,
          all: 0,
          value: 0,
          member: [],
          card: [],
        },
      ],
      da: 0,
      vo: 0,
      pf: 0,
      all: 0,
    };
    var all_team = [];
    for (var t1 = 0; t1 <= team.length; t1++) {
      if (t1 < team.length) {
        var k1 = t1;
      } else {
        var k1 = 'no_team';
      }
      if (all_team[k1] == null) {
        all_team[k1] = [];
      }
      for (var t2 = 0; t2 <= team.length; t2++) {
        if (t2 < team.length) {
          var k2 = t2;
        } else {
          var k2 = 'no_team';
        }
        if (all_team[k1][k2] == null) {
          all_team[k1][k2] = [];
        }
        for (var t3 = 0; t3 <= team.length; t3++) {
          if (t3 < team.length) {
            var k3 = t3;
          } else {
            var k3 = 'no_team';
          }
          if (all_team[k1][k2][k3] == null) {
            all_team[k1][k2][k3] = {};
          }
        }
      }
    }

    for (t1 in all_team) {
      for (t2 in all_team[t1]) {
        for (t3 in all_team[t1][t2]) {
          all_team[t1][t2][t3] = $scope.member(card, team, t1, t2, t3);
        }
      }
    }

    var num = 0;
    for (t1 in all_team) {
      for (t2 in all_team[t1]) {
        for (t3 in all_team[t1][t2]) {
          if(ability == 'da' && temp_team.da < all_team[t1][t2][t3].da){
            temp_team = all_team[t1][t2][t3];
          }else if(ability == 'vo' && temp_team.vo < all_team[t1][t2][t3].vo){
            temp_team = all_team[t1][t2][t3];
          }else if(ability == 'pf' && temp_team.pf < all_team[t1][t2][t3].pf){
            temp_team = all_team[t1][t2][t3];
          }else if(ability == 'all' && temp_team.all < all_team[t1][t2][t3].all){
            temp_team = all_team[t1][t2][t3];
          }else if(ability == 'da_2'){
            var temp_max_2da = 0, max_2da = 0;
            for(var tt1 in temp_team.team){
              for(var tt2 in temp_team.team){
                if(tt1 < tt2){
                  var da = temp_team.team[tt1].da + temp_team.team[tt2].da;
                  temp_max_2da = temp_max_2da < da ? da : temp_max_2da;
                }
              }
            }
            for(var tt1 in all_team[t1][t2][t3].team){
              for(var tt2 in all_team[t1][t2][t3].team){
                if(tt1 < tt2){
                  var da = all_team[t1][t2][t3].team[tt1].da + all_team[t1][t2][t3].team[tt2].da;
                  max_2da = max_2da < da ? da : max_2da;
                }
              }
            }
            if(temp_max_2da < max_2da || (temp_max_2da == max_2da && temp_team.da < all_team[t1][t2][t3].da)){
              temp_team = all_team[t1][t2][t3];
            }
          }else if(ability == 'vo_2'){
            var temp_max_2vo = 0, max_2vo = 0;
            for(var tt1 in temp_team.team){
              for(var tt2 in temp_team.team){
                if(tt1 < tt2){
                  var vo = temp_team.team[tt1].vo + temp_team.team[tt2].vo;
                  temp_max_2vo = temp_max_2vo < vo ? vo : temp_max_2vo;
                }
              }
            }
            for(var tt1 in all_team[t1][t2][t3].team){
              for(var tt2 in all_team[t1][t2][t3].team){
                if(tt1 < tt2){
                  var vo = all_team[t1][t2][t3].team[tt1].vo + all_team[t1][t2][t3].team[tt2].vo;
                  max_2vo = max_2vo < vo ? vo : max_2vo;
                }
              }
            }
            if(temp_max_2vo < max_2vo || (temp_max_2vo == max_2vo && temp_team.vo < all_team[t1][t2][t3].vo)){
              temp_team = all_team[t1][t2][t3];
            }
          }else if(ability == 'pf_2'){
            var temp_max_2pf = 0, max_2pf = 0;
            for(var tt1 in temp_team.team){
              for(var tt2 in temp_team.team){
                if(tt1 < tt2){
                  var pf = temp_team.team[tt1].pf + temp_team.team[tt2].pf;
                  temp_max_2pf = temp_max_2pf < pf ? pf : temp_max_2pf;
                }
              }
            }
            for(var tt1 in all_team[t1][t2][t3].team){
              for(var tt2 in all_team[t1][t2][t3].team){
                if(tt1 < tt2){
                  var pf = all_team[t1][t2][t3].team[tt1].pf + all_team[t1][t2][t3].team[tt2].pf;
                  max_2pf = max_2pf < pf ? pf : max_2pf;
                }
              }
            }
            if(temp_max_2pf < max_2pf || (temp_max_2pf == max_2pf && temp_team.pf < all_team[t1][t2][t3].pf)){
              temp_team = all_team[t1][t2][t3];
            }
          }
        }
      }
    }

    var ab = 'da';
    if(ability == 'da' || ability == 'da_2') {
      ab = 'da';
    }else if(ability == 'vo' || ability == 'vo_2'){
      ab = 'vo';
    }else if(ability == 'pf' || ability == 'pf_2'){
      ab = 'pf';
    }else if(ability == 'all'){
      ab = 'all';
    }
    temp_team.team.sort(function (a, b) {
      if(b[ab] - a[ab] > 0){
        var a_key = 0, b_key = 0;
        for(var i in temp_team.team){
          if(temp_team.team[i] == a){
            a_key = i;
          }else if(temp_team.team[i] == b){
            b_key = i;
          }
        }
        var tempcard = [];
        tempcard = tempcard.concat(temp_team.card);
        temp_team.card.sort(function (c, d) {
          var c_key = 0, d_key = 0;
          for(var j in tempcard){
            if(tempcard[j] == c){
              c_key = j;
            }else if(tempcard[j] == d){
              d_key = j;
            }
          }
          var new_c_key = c_key, new_d_key = d_key;
          if(c_key >= a_key * 5 && c_key < a_key * 5 + 5){
            new_c_key = c_key - 0 + 5;
          }
          if(c_key >= b_key * 5 && c_key < b_key * 5 + 5){
            new_c_key = c_key - 5;
          }
          if(d_key >= a_key * 5 && d_key < a_key * 5 + 5){
            new_d_key = d_key - 0 + 5;
          }
          if(d_key >= b_key * 5 && d_key < b_key * 5 + 5){
            new_d_key = d_key - 5;
          }
          return new_c_key - new_d_key;
        });
        var tempkey = [];
        tempkey = tempkey.concat(temp_team.key);
        temp_team.key.sort(function (c, d) {
          var c_key = 0, d_key = 0;
          for(var j in tempkey){
            if(tempkey[j] == c){
              c_key = j;
            }else if(tempkey[j] == d){
              d_key = j;
            }
          }
          var new_c_key = c_key, new_d_key = d_key;
          if(c_key >= a_key * 5 && c_key < a_key * 5 + 5){
            new_c_key = c_key - 0 + 5;
          }
          if(c_key >= b_key * 5 && c_key < b_key * 5 + 5){
            new_c_key = c_key - 5;
          }
          if(d_key >= a_key * 5 && d_key < a_key * 5 + 5){
            new_d_key = d_key - 0 + 5;
          }
          if(d_key >= b_key * 5 && d_key < b_key * 5 + 5){
            new_d_key = d_key - 5;
          }
          return new_c_key - new_d_key;
        });
      }
      return b[ab] - a[ab];
    });

    return temp_team;
  }

  $scope.member = function(card, team, t1, t2, t3){
    var temp_team = {
      card: [],
      key: [],
      team: [
        {
          name: t1 != 'no_team' ? team[t1].name : 'no_team',
          da: 0,
          vo: 0,
          pf: 0,
          all: 0,
          value: 0,
          member: [],
          card: [],
        },
        {
          name: t2 != 'no_team' ? team[t2].name : 'no_team',
          da: 0,
          vo: 0,
          pf: 0,
          all: 0,
          value: 0,
          member: [],
          card: [],
        },
        {
          name: t3 != 'no_team' ? team[t3].name : 'no_team',
          da: 0,
          vo: 0,
          pf: 0,
          all: 0,
          value: 0,
          member: [],
          card: [],
        },
      ],
      da: 0,
      vo: 0,
      pf: 0,
      all: 0,
    };

    var num = 0;
    $.each([t1, t2, t3], function(team_key, team_value){
      num = num%5 == 0 ? num : num + 5 - num%5;
      if(team_value != 'no_team'){
        for(m in team[team_value].member){
          var character = team[team_value].member[m];
          for(var i = 0, j = 0, max = 1, flag = false; j < max && i < card.length; flag && ((temp_team.key[num + Number(m)] = i) || true) && j++, i++){
            if($.inArray(i, temp_team.key) == -1 && $.inArray(card[i].character, temp_team.team[team_key].member) == -1 && card[i].character == character){
              flag = true;
              temp_team.team[team_key].member.push(card[i].character);
              temp_team.card[num + Number(m)] = card[i];
            }else{
              flag = false;
            }
          }
        }
      }
      num += 5;
    });

    num = 0;
    $.each([t1, t2, t3], function(team_key, team_value){
      num = num%5 == 0 ? num : num + 5 - num%5;
      if(team_value == 'no_team'){
        for(var i = 0, j = 0, max = 5, flag = false; j < max && i < card.length; flag && ((temp_team.key[num + j] = i) || true) && j++, i++){
          if($.inArray(i, temp_team.key) == -1 && $.inArray(card[i].character, temp_team.team[team_key].member) == -1){
            flag = true;
            temp_team.team[team_key].member.push(card[i].character);
            temp_team.card[num + j] = card[i];
          }else{
            flag = false;
          }
        }
      }else{
        var member_length = 0;
        for(var i = 0; i < 5; i++){
          if(temp_team.card[num + i] != null){
            member_length++;
          }
        }
        if(member_length < team[team_value].member.length){
          for(var i = 0; i < 5; i++){
            temp_team.card[num + i] = null;
            temp_team.key[num + i] = null;
          }
          temp_team.team[team_key].member = [];
          temp_team.team[team_key].name = 'no_team';
          for(var i = 0, j = 0, max = 5, flag = false; j < max && i < card.length; flag && ((temp_team.key[num + j] = i) || true) && j++, i++){
            if($.inArray(i, temp_team.key) == -1 && $.inArray(card[i].character, temp_team.team[team_key].member) == -1){
              flag = true;
              temp_team.team[team_key].member.push(card[i].character);
              temp_team.card[num + j] = card[i];
            }else{
              flag = false;
            }
          }
        }else if(member_length < 5){
          var start = num + member_length;
          for(var i = 0, j = 0, max = 5 - member_length, flag = false; j < max && i < card.length; flag && ((temp_team.key[start + j] = i) || true) && j++, i++){
            if($.inArray(i, temp_team.key) == -1 && $.inArray(card[i].character, temp_team.team[team_key].member) == -1){
              flag = true;
              temp_team.team[team_key].member.push(card[i].character);
              temp_team.card[start + j] = card[i];
            }else{
              flag = false;
            }
          }
        }
      }
      num += 5;
    });

    num = 0;
    $.each([t1, t2, t3], function(team_key, team_value){
      var da = 0, vo = 0, pf = 0, all = 0;
      for(var i = 0; i < 5; i++){
        if(temp_team.card[num + i] != null){
          if(temp_team.card[num + i].times && typeof($scope.times[temp_team.card[num + i].star]) != 'undefined' && typeof($scope.times[temp_team.card[num + i].star][temp_team.card[num + i].level]) != 'undefined'){
            da += parseInt(temp_team.card[num + i].da * $scope.times[temp_team.card[num + i].star][temp_team.card[num + i].level]);
            vo += parseInt(temp_team.card[num + i].vo * $scope.times[temp_team.card[num + i].star][temp_team.card[num + i].level]);
            pf += parseInt(temp_team.card[num + i].pf * $scope.times[temp_team.card[num + i].star][temp_team.card[num + i].level]);
          }else{
            da += temp_team.card[num + i].da;
            vo += temp_team.card[num + i].vo;
            pf += temp_team.card[num + i].pf;
          }
        }
        temp_team.team[team_key].card[i] = temp_team.card[num + i];
      }
      if(temp_team.team[team_key].name != 'no_team'){
        temp_team.team[team_key].value = team[team_value].value;
        if(team[team_value].ability == 'da'){
          da = parseInt(da * (1 + Number((team[team_value].value / 100).toFixed(2))));
        }else if(team[team_value].ability == 'vo'){
          vo = parseInt(vo * (1 + Number((team[team_value].value / 100).toFixed(2))));
        }else if(team[team_value].ability == 'pf'){
          pf = parseInt(pf * (1 + Number((team[team_value].value / 100).toFixed(2))));
        }
      }
      temp_team.team[team_key].da = da;
      temp_team.team[team_key].vo = vo;
      temp_team.team[team_key].pf = pf;
      temp_team.team[team_key].all = da + vo + pf;
      temp_team.da += da;
      temp_team.vo += vo;
      temp_team.pf += pf;
      temp_team.all += da + vo + pf;
      num += 5;
    });

    return temp_team;
  }
});

var character = [
  '南云铁虎',
  '紫之创',
  '真白友也',
  '葵日向',
  '高峰翠',
  '姬宫桃李',
  '仙石忍',
  '葵裕太',
  '天满光',
  '朱樱司',
  '明星昴流',
  '冰鹰北斗',
  '游木真',
  '神崎飒马',
  '乙狩阿多尼斯',
  '大神晃牙',
  '朔间凛月',
  '衣更真绪',
  '伏见弓弦',
  '鸣上岚',
  '莲巳敬人',
  '天祥院英智',
  '羽风薰',
  '濑名泉',
  '守泽千秋',
  '鬼龙红郎',
  '日日树涉',
  '深海奏汰',
  '朔间零',
  '仁兔成鸣',
  '月永雷欧',
];

var team = [
  {
    name: 'Trickstar',
    ability: 'da',
    value: 13,
    member: ['明星昴流', '冰鹰北斗', '游木真', '衣更真绪'],
    del: false,
  },
  {
    name: '流星队',
    ability: 'vo',
    value: 18,
    member: ['南云铁虎', '高峰翠', '仙石忍', '深海奏汰', '守泽千秋'],
    del: false,
  },
  {
    name: 'Fine',
    ability: 'pf',
    value: 13,
    member: ['天祥院英智', '日日树涉', '伏见弓弦', '姬宫桃李'],
    del: false,
  },
  {
    name: 'Undead',
    ability: 'da',
    value: 13,
    member: ['朔间零', '大神晃牙', '羽风薰', '乙狩阿多尼斯'],
    del: false,
  },
  {
    name: 'Ra*bits',
    ability: 'vo',
    value: 13,
    member: ['紫之创', '天满光', '真白友也', '仁兔成鸣'],
    del: false,
  },
  {
    name: 'Knights',
    ability: 'pf',
    value: 18,
    member: ['濑名泉', '朔间凛月', '鸣上岚', '朱樱司', '月永雷欧'],
    del: false,
  },
  {
    name: '红月',
    ability: 'da',
    value: 10,
    member: ['神崎飒马', '鬼龙红郎', '莲巳敬人'],
    del: false,
  },
  {
    name: '2Wink',
    ability: 'vo',
    value: 5,
    member: ['葵日向', '葵裕太'],
    del: false,
  },
  {
    name: '弓道部',
    ability: 'da',
    value: 13,
    member: ['伏见弓弦', '朱樱司', '莲巳敬人', '月永雷欧'],
    del: false,
  },
  {
    name: '篮球部',
    ability: 'vo',
    value: 13,
    member: ['明星昴流', '衣更真绪', '守泽千秋', '高峰翠'],
    del: false,
  },
  {
    name: '演剧部',
    ability: 'pf',
    value: 10,
    member: ['冰鹰北斗', '日日树涉', '真白友也'],
    del: false,
  },
  {
    name: '轻音部',
    ability: 'da',
    value: 13,
    member: ['朔间零', '大神晃牙', '葵日向', '葵裕太'],
    del: false,
  },
  {
    name: '红茶部',
    ability: 'vo',
    value: 10,
    member: ['天祥院英智', '朔间凛月', '紫之创'],
    del: false,
  },
  {
    name: '网球部',
    ability: 'pf',
    value: 10,
    member: ['游木真', '姬宫桃李', '濑名泉', '仁兔成鸣'],
    del: false,
  },
  {
    name: '空手道部',
    ability: 'da',
    value: 5,
    member: ['南云铁虎', '鬼龙红郎'],
    del: false,
  },
  {
    name: '田径部',
    ability: 'vo',
    value: 10,
    member: ['乙狩阿多尼斯', '鸣上岚', '天满光'],
    del: false,
  },
  {
    name: '海洋生物部',
    ability: 'pf',
    value: 10,
    member: ['羽风薰', '深海奏汰', '神崎飒马'],
    del: false,
  },
  {
    name: '广播委员会',
    ability: 'da',
    value: 10,
    member: ['仙石忍', '仁兔成鸣', '游木真'],
    del: false,
  },
  {
    name: '学生会执行部',
    ability: 'vo',
    value: 13,
    member: ['姬宫桃李', '衣更真绪', '天祥院英智', '莲巳敬人'],
    del: false,
  },
  {
    name: '忍者同好会',
    ability: 'pf',
    value: 2,
    member: ['仙石忍'],
    del: false,
  },
  {
    name: '名门子弟',
    ability: 'da',
    value: 10,
    member: ['天祥院英智', '朱樱司', '姬宫桃李'],
    del: false,
  },
  {
    name: '智慧眼镜',
    ability: 'vo',
    value: 5,
    member: ['莲巳敬人', '游木真'],
    del: false,
  },
  {
    name: '擅长缝纫',
    ability: 'pf',
    value: 5,
    member: ['鬼龙红郎', '紫之创'],
    del: false,
  },
  {
    name: '模特经验者',
    ability: 'da',
    value: 10,
    member: ['游木真', '鸣上岚', '濑名泉'],
    del: false,
  },
  {
    name: '花粉症',
    ability: 'vo',
    value: 5,
    member: ['衣更真绪', '大神晃牙'],
    del: false,
  },
  {
    name: '左撇子',
    ability: 'pf',
    value: 10,
    member: ['葵裕太', '朔间凛月', '天祥院英智'],
    del: false,
  },
  {
    name: '最喜欢妹妹',
    ability: 'da',
    value: 5,
    member: ['月永雷欧', '鬼龙红郎'],
    del: false,
  },
  {
    name: '朔间兄弟',
    ability: 'vo',
    value: 5,
    member: ['朔间零', '朔间凛月'],
    del: false,
  },
  {
    name: '三奇人',
    ability: 'pf',
    value: 10,
    member: ['朔间零', '日日树涉', '深海奏汰'],
    del: false,
  },
];
var temporary_team = [
  {
    name: '可选择的临时组合技能（根据日服WIKI，不保证国服不改）',
    ability: '',
    value: 0,
    member: [],
    del: false,
  },
  {
    name: '任务完成',
    ability: 'vo',
    value: 10,
    member: ['衣更真绪', '莲巳敬人', '天祥院英智', '姬宫桃李'],
    del: false,
  },
  {
    name: '新春参拜',
    ability: 'da',
    value: 15,
    member: ['明星昴流', '朱樱司', '伏见弓弦', '姬宫桃李'],
    del: false,
  },
  {
    name: '夜暗的魔物乐园',
    ability: 'vo',
    value: 10,
    member: ['羽风薰', '大神晃牙', '乙狩阿多尼斯', '朔间零'],
    del: false,
  },
  {
    name: 'mad·红茶·派对',
    ability: 'pf',
    value: 10,
    member: ['天祥院英智', '朔间凛月', '紫之创', '朱樱司'],
    del: false,
  },
  {
    name: '青春RADIO放送局',
    ability: 'da',
    value: 10,
    member: ['游木真', '仙石忍', '仁兔成鸣', '衣更真绪'],
    del: false,
  },
  {
    name: '花鸟风月',
    ability: 'vo',
    value: 10,
    member: ['月永雷欧', '濑名泉', '朔间凛月', '鸣上岚'],
    del: false,
  },
  {
    name: "Dead Man's",
    ability: 'da',
    value: 10,
    member: ['朔间零', '莲巳敬人', '大神晃牙'],
    del: false,
  },
  {
    name: '春假的野餐',
    ability: 'pf',
    value: 15,
    member: ['大神晃牙', '伏见弓弦', '明星昴流', '姬宫桃李'],
    del: false,
  },
  {
    name: '春色伯利兹',
    ability: 'vo',
    value: 15,
    member: ['仙石忍', '高峰翠', '葵日向', '葵裕太'],
    del: false,
  },
  {
    name: '母亲大海的伙伴',
    ability: 'da',
    value: 15,
    member: ['神崎飒马', '深海奏汰', '羽风薰', '乙狩阿多尼斯'],
    del: false,
  },
];
