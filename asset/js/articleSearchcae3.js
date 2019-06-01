app.controller("searchController",function($scope,$rootScope,$location,$http,$timeout){
	$rootScope.articleTypes = articleTypes;


	articleCategories['planes']['order'] = '0';
	articleCategories['helicopters']['order'] = '1';
	articleCategories['fpv']['order'] = '2';
	articleCategories['scratch-builds']['order'] = 3;
	articleCategories['multi-rotor']['order'] = 4;
	articleCategories['workbench']['order'] = 5;
	articleCategories['news'] = {safename: 'news',name: 'News', order: 6};
	articleCategories['ft-articles'] = {safename: 'ft-articles',name: 'FT Articles', order: 7};
	console.log(articleCategories);

	$rootScope.articleCategories = articleCategories;
//	console.log(articleCategories);

	//search vars
	$scope.types = [];
	$scope.cats = [];
	$scope.dateFilter = 'all';
	$scope.curPage = 1;
	$scope.perPage = parseInt(localStorage.getItem('perPage')) || 16;
	$scope.perPageOptions = [16, 32, 48, 64, 80, 96];
	$scope.pages = [];
	$scope.count = 0;
	$scope.curStart = 1;
	$scope.curEnd = 8;
	$scope.prepopulated = false;
	$scope.listFormat = 'details';
	$scope.textSearch = [];
	$scope.listSort = false;//'date_high_to_low';
	$scope.searchInitiatedBySort = false;
	$scope.user = false;
	$scope.url = {};

	//display vars
	$scope.textSearchEntry = '';
	$scope.showTextEntries = false;
	$scope.showTypeEntries = false;
	$scope.showCatEntries = false;
	$scope.textDisabled = false;
	$scope.typesDisabled = false;
	$scope.catsDisabled = false;
	$scope.fromInit = false;

	$scope.showPagesStart = false;
	$scope.showPagesEnd = false;

	$scope.selectedCategories = [];
	$scope.loading = false;
	$scope.listSortField = 'date';
	$scope.listSortDirection = 'high_to_low';

	$scope.endDisplayCount = function(){
		endCount = (($scope.curPage-1)*$scope.perPage)+$scope.perPage;
		if ( endCount > $scope.count ){
			return $scope.count;
		} else {
			return endCount;
		}
	}

	$scope.toggleCategory = function(cat){
		var currentSearchParams = $("#searchBox").select2("val");
		var catSearchString = "cat__"+cat.safename;
		var currentCatPos = $scope.selectedCategories.indexOf(catSearchString);
		if ( currentCatPos >= 0 ){
			$scope.selectedCategories.splice(currentCatPos, 1);
			currentSearchParams.splice(currentSearchParams.indexOf(catSearchString),1);
			$scope.cats.splice($scope.cats.indexOf(catSearchString),1);
		} else {
			$scope.selectedCategories.push(catSearchString);
			currentSearchParams.push(catSearchString);
			$scope.cats.push(cat.safename);
		}

		$("#searchBox").select2("val",currentSearchParams)
		$scope.updateSearch(true)
	}

	$scope.inSelectedCategories = function(cat){
		if ( $scope.selectedCategories.indexOf("cat__"+cat.safename) >= 0 ){
			return 'active';
		}
		return '';
	}

	$scope.validateSearchBtns = function(){
		var currentSearchParams = $("#searchBox").select2("val");
		for ( var i in $scope.selectedCategories ){
			cat = $scope.selectedCategories[i];
			if ( currentSearchParams.indexOf(cat) == -1 ){
				$scope.selectedCategories.splice(i,1)
			}
		}
	}

	$scope.populateSearch = function(vals){
		$scope.types = [];
		$scope.cats = [];
		$scope.textSearch = [];
		vals = vals.split(',');
		for ( var i in vals ){
			val = vals[i];
			if ( val.indexOf('cat__') != -1 ){
				$scope.cats.push(val.replace('cat__',''));
			}	else if ( val.indexOf('type__') != -1 ){
				$scope.types.push(val.replace('type__',''));
			} else {
				$scope.textSearch.push(val);
			}
		}
		$scope.updateSearch(true);
	}

	$scope.goToPage = function(page){
		$scope.curPage = page;
		$("#featuredContent").collapse('hide');
		var toolbar = document.getElementById("searchContainer");
		toolbar.scrollIntoView(true);
		$scope.updateSearch(false);
	}

	$scope.addTextSearch = function(){
		if ( $scope.textSearchEntry == '' ){
			return false;
		}

		$scope.textSearch.push($scope.textSearchEntry);
		$scope.textSearchEntry = '';
		$scope.showTextEntries = true;
		if ( $scope.textSearch.length == 5 ){
			$scope.textDisabled = true;
		}
		$scope.updateSearch(true);
	}

	$scope.removeTextSearch = function(index){
		$scope.textSearch.splice(index,1);
		if ( $scope.textSearch.length == 0 ){
			$scope.showTextEntries = false;
		}
		$scope.textDisabled = false;
		$scope.updateSearch(true);
	}

	$scope.addType = function(type){
		if ( $scope.typeChosen(type) ){
			return false;
		}
		$scope.types.push(type);
		$scope.showTypeEntries = true;
		$scope.updateSearch(true);
	}

	$scope.removeType = function(index){
		$scope.types.splice(index,1);
		if ( $scope.types.length == 0 ){
			$scope.showTypeEntries = false;
		}
		$scope.updateSearch(true);
		$scope.typesDisabled = false;
	}

	$scope.typeChosen = function(type){
		if ( $scope.types.indexOf(type) == -1 ){
			return false;
		}
		return true;
	}

	$scope.addCat = function(cat){
		if ( $scope.catChosen(cat) ){
			return false;
		}
		$scope.cats.push(cat);
		$scope.showCatEntries = true;
		$scope.updateSearch(true);
	}

	$scope.initCat = function(cat){
		if ( cat == 'news' || cat == 'podcasts'){
			$scope.types.push(cat);
			var searchStr = 'type__'+cat;
		} else {
			$scope.cats.push(cat);
			var searchStr = 'cat__'+cat;
		}
		$().ready(function(){
			$("#searchBox").select2("val",[searchStr]);
		})


		//update sort
		urlSections = $location.path().replace(/\//g,'').split("&"); //get url sections
		sections = {};
		for ( var i in urlSections ){ //put url sections in object
			section = urlSections[i].split('=');

			sectionTitle = section[0];
			sections[sectionTitle] = section[1];
		}

		//if ( !sections['dateFilter'] && $scope.types.indexOf('podcasts') == -1 ){ //if the date filter is false, overwrite it unless we're in podcasts
		//	$scope.dateFilter = 'published+30+Days';
		//}

		$scope.fromInit = true;
		$scope.updateSearch(false);
	}

	$scope.initUser = function(user){
		$scope.user = user;
		$scope.fromInit = true;
		$scope.updateSearch(true);
	}

	$scope.removeCat = function(index){
		$scope.cats.splice(index,1);
		if ( $scope.cats.length == 0 ){
			$scope.showCatEntries = false;
		}
		$scope.updateSearch(true);
		$scope.catsDisabled = false;
	}

	$scope.catChosen = function(cat){
		if ( $scope.cats.indexOf(cat) == -1 ){
			return false;
		}
		return true;
	}

	$scope.clearAll = function(type){
		$scope[type] = [];

		if ( type == 'types' ){
			$scope.showTypeEntries = false;
		} else if ( type == 'cats' ){
			$scope.showCatEntries = false;
		} else if ( type == 'textSearch' ){
			$scope.showTextEntries = false;
			$scope.textDisabled = false;
		}

		$scope.updateSearch(true);
	}

	$scope.updateListFormat = function(format){
		$scope.listFormat = format;
	}

	$scope.updateListSort = function(){
		localStorage.setItem('perPage', $scope.perPage);
		$scope.listSort = $scope.listSortField + "_"+$scope.listSortDirection;
		$scope.searchInitiatedBySort = true;
		$scope.updateSearch(true);
	}

	$scope.oldUpdateListSort = function(sort){
		if ( sort == 'date' && $scope.listSort.indexOf('date') != -1 ){
			curDirection = $scope.listSort.replace('date_','');
			if ( curDirection.indexOf('high') == 0 ){ //if high is first, as in 'high_to_low'
				direction = 'low_to_high';
			} else {
				direction = 'high_to_low';
			}
			$scope.listSort = 'date_'+direction;
		} else if ( sort == 'views' && $scope.listSort.indexOf('views') != -1 ){
			curDirection = $scope.listSort.replace('views_','');
			if ( curDirection.indexOf('high') == 0 ){ //if high is first, as in 'high_to_low'
				direction = 'low_to_high';
			} else {
				direction = 'high_to_low';
			}
			$scope.listSort = 'views_'+direction;
		} else if ( sort == 'rating' && $scope.listSort.indexOf('rating') != -1 ){
			curDirection = $scope.listSort.replace('rating_','');
			if ( curDirection.indexOf('high') == 0 ){ //if high is first, as in 'high_to_low'
				direction = 'low_to_high';
			} else {
				direction = 'high_to_low';
			}
			$scope.listSort = 'rating_'+direction;
		} else {
			$scope.listSort = sort+"_high_to_low";
		}

		$scope.searchInitiatedBySort = true;


		$scope.updateSearch(true);
	}

	$scope.getStars = function(article){
		return Math.floor(article.average_rating);
	}

	//var randomNum = Math.floor((Math.random()*100)+1);
	$scope.getTemplateUrl = function(){
		return "/angular_templates/list-article-"+$scope.listFormat+".html?id=02042013";
	}

	$scope.gridStyle = function(index){
		styles = {}
		if ( index % 4 == 0 ){
			styles['clear'] = 'both';
			styles['margin-left'] = 0;
		}

		if ( index > 3 ){
				styles['margin-top'] = '2%';
			}

		return styles;
	}

	$scope.decreasePage = function(){
		if ( $scope.curPage == 1 ){
			return;
		}
		$scope.curPage--;
		$("#featuredContent").collapse('hide');
		var toolbar = document.getElementById("searchContainer");
		toolbar.scrollIntoView(true);
		$scope.updateSearch(false);
	}

	$scope.increasePage = function(){
		if ( $scope.curPage == $scope.pages ){
			return;
		}
		$scope.curPage++;
		$("#featuredContent").collapse('hide');
		var toolbar = document.getElementById("searchContainer");
		toolbar.scrollIntoView(true);
		$scope.updateSearch(false);
	}

	$scope.updateSearch = function(to_page_one){

		var updatePath = true;
		//when coming to the page, we need to repopulate the search items if there are any in the url
		if ( !$scope.prepopulated && $location.path() != '/' && $location.path() != '' ){
			var searchBoxVals = [];
			sections = $location.path().replace(/\//g,'').split("&");
			for ( var i in sections ){
				section = sections[i].split('=');
				sectionTitle = section[0];
				var values = section[1].split(",");

				if ( sectionTitle == 'page' ){
					$scope.curPage = values;
					to_page_one = false;
				}

				$scope[sectionTitle] = values;
				$scope.url[sectionTitle] = values;


				for ( var i in values ){
					if ( sectionTitle == 'types'){
						searchBoxVals.push('type__'+values[i]);
					} else if ( sectionTitle == 'cats' ){
						searchBoxVals.push('cat__'+values[i]);
						$scope.selectedCategories.push('cat__'+values[i]);
					} else if ( sectionTitle == 'listSort' ){
						sortString = values[0];
						sortStringSplit = sortString.split('_');
						$scope.listSortField = sortStringSplit[0];
						$scope.listSortDirection = 'high_to_low';
						if ( sortStringSplit[1] == 'low' ){
							$scope.listSortDirection = 'low_to_high';
						}
					} else if ( sectionTitle != 'dateFilter' && sectionTitle != 'page') {
						if ( values[i] != '' ){
							searchBoxVals.push(values[i]);
						}
					}
				}

				if ( sectionTitle == 'cats' ){
					$scope.showCatEntries = true;
				} else if ( sectionTitle == 'types' ){
					$scope.showTypeEntries = true;
				} else if ( sectionTitle == 'dateFilter' ){
					$scope.dateFilter = values[0];
				} else if ( sectionTitle == 'textSearch' ){
					$scope.showTextEntries = true;
				}
				if ( $scope.textSearch.length == 5 ){
					$scope.textDisabled = true;
				}

			}
			updatePath = false;
			if ( searchBoxVals.length > 0 ){
				$("#searchBox").select2("val",searchBoxVals);
			}

			var thisIsPrepopulation = true;

		}
		$scope.prepopulated = true;


		if ( to_page_one ){
			$scope.curPage = 1;
		}


		var search = {};
		var address="";
		if ( $scope.types.length > 0 ){
			search.types = [];
			address += "types=";
			for ( var i in $scope.types ){
				search.types.push($scope.types[i])
				if ( i > 0 )
					address+=",";
				address+=$scope.types[i];
			}
		}

		if ( $scope.cats.length > 0 ){
			search.cats = [];
			catsAddress = '';
			for ( var i in $scope.cats ){
				search.cats.push($scope.cats[i])
				if ( i > 0 )
					catsAddress+=",";
				addressSplit = $location.absUrl().split("#");
				if ( addressSplit[0].indexOf($scope.cats[i]) == -1 ){
					catsAddress+=$scope.cats[i];
				}
			}

			if ( catsAddress != '' ){
				if ( address != '' )
					address += "&";
					address += "cats="+catsAddress;
			}
		}

		if ( $scope.curPage > 1 ){
			address += address!=''?'&':'';
			address += "page="+$scope.curPage;
		}

		if ( $scope.textSearch.length > 0 ){
			//if there is only one item and the item is blank, set back to empty array.  This happens when coming in with a blank text string as the value on the URL param.
			if ( $scope.textSearch.length == 1 && $scope.textSearch[0] == '' ){
				$scope.textSearch = [];
			} else {
				address += address!=''?'&':'';
				search.textSearch = $scope.textSearch;
				for ( var i in $scope.textSearch ){
					if ( i == 0 ){
						address += 'textSearch=';
					} else {
						address+=",";
					}
					address += $scope.textSearch[i];
				}
			}
		}

		// if we have text, categories, or types (basically, if the search isn't empty)
		// AND the search was NOT initiated by sort
		if ( ( $scope.textSearch.length > 0 || $scope.cats.length > 0 || $scope.types.length > 0 ) && $scope.searchInitiatedBySort == false && $scope.types.indexOf('podcasts') == -1 ){
			if ( thisIsPrepopulation && $scope.listSort ){ //if we're on the initial prepopulation AND the sort isn't blank
				//leave things as they are
			} else {
				$scope.listSort = 'date_high_to_low';
			}
		}



		//if our search is blank and we were not initiated by sort
		if ( ( $scope.textSearch.length == 0 && $scope.cats.length == 0 && $scope.types.length == 0 ) && $scope.searchInitiatedBySort == false ){
			if ( thisIsPrepopulation && $scope.listSort ){ //if we're on the initial prepopulation AND the sort isn't blank
				//leave things as they are
			} else {
				//alert($scope.listSort);
				//$scope.listSort = false; //set back to default
			}
		}

		if ( $scope.listSort != false && $scope.types.indexOf('podcasts') == -1 ){
			address += address!=''?'&':'';
			address += 'listSort='+$scope.listSort;
		} else {
			$scope.listSort = 'date_high_to_low';
		}



		$scope.searchInitiatedBySort = false; //reset for next search

		if ( $scope.dateFilter != 'all' ){
			search.dateFilter = $scope.dateFilter;
			address += address!=''?'&':'';
			address += 'dateFilter='+$scope.dateFilter;
		}

		if ( $scope.user ){
			search.user = $scope.user;
		}

		if ( updatePath ){
			$timeout(function(){
				if ( address != '' ){
					$location.path(address);
				}
			});
		}

		if ( address != '' ){
			//$("#searchContainer").ScrollTo({offset:function(){
			//	alert("HERE");
			//}} );
			//$.scrollTo($("#searchContainer"),500,{offset: -100});
		}


		$scope.fromInit = false; //reset fromInit
		//$("#articleListCurtain").css('opacity','0').show().animate({opacity: .8},500,function(){
			start = $scope.curPage > 1 ? ($scope.perPage*($scope.curPage-1)):0;

			//hack for ft news and author
			if ( search.cats != undefined ){
				if ( search.cats.indexOf('news') >= 0 ){
					search.cats.splice(search.cats.indexOf('news'),1);
					if ( search.types != undefined ){
						search.types.push('news');
					} else {
						search.types = ['news'];
					}
				}

				if ( search.cats.indexOf('ft-articles') >= 0 ){
					search.cats.splice(search.cats.indexOf('ft-articles'),1);
					search.user = '5101fbb332d9bf22060008e1';
				} else {
					delete(search.user);
				}
			}
			console.log(search);


			// DO THE SEARCH
			$scope.loading = true;
			$http.get("/articles/search/?search="+JSON.stringify(search)+"&skip="+start+"&limit="+$scope.perPage+"&sort="+$scope.listSort).success(function(data){
				console.log(data);
				$scope.loading = false;
				//pages
				$scope.count = data.count;
				pages = Math.ceil($scope.count/$scope.perPage);
				$scope.pages = [];
				$scope.totalPages = pages;
				if($scope.curPage.length){
					$scope.curPage = +$scope.curPage[0];
				}

				curPage = $scope.curPage;
				console.log(curPage);
				console.log($scope.curPage);
				for ( var page = 1; page <= pages; page++ ){
					/*if(page <= 2 || page > (pages - 2) || (page <= (curPage + 1) && page >= (curPage - 1))){*/
					if(page <= 2 || page > (pages - 1) || (page <= (curPage + 2) && page >= (curPage - 2))){
                        $scope.pages.push(page);
					}
				}
				for (var i = 1; i < $scope.pages.length; i++){
					var curNum = $scope.pages[i];
					var prevNum = $scope.pages[i-1];
					if((curNum != false && prevNum != false) && (curNum - 1 != prevNum)){
						$scope.pages.splice(i, 0, false);
                    }

				}
				console.log($scope.pages);


				$scope.curStart = (($scope.curPage-1)*$scope.perPage)+1;
				$scope.curEnd = $scope.perPage+(($scope.curPage-1)*$scope.perPage);
				if ( $scope.curEnd > $scope.count ){
					$scope.curEnd = $scope.count;
				}
				//end pages

				$scope.users = data.users;
				$scope.articles = data.articles;
				$timeout(function(){
					$scope.$apply(function (){
						$scope.curPage = $scope.curPage++;
					});

				})

				for ( var i in data.ads ){
					$(".adZone[rel="+i+"]").html(data.ads[i]);
				}

				$("#articleListCurtain").fadeOut(500);
			})
		//});
	};

	$timeout(function(){
		if ( !$scope.user && $scope.cats.length == 0 ){
			$scope.updateSearch();
		}
	})
});


$().ready(function(){
	$("#searchContainer .dropdown-menu").find("a, input, label").click(function(e){
		e.stopPropagation();
	})
})


app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
