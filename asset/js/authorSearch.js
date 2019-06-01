app.controller("authorSearchController",function($scope,$rootScope,$location,$http,$timeout){	

	//search vars
	$scope.curPage = 1;
	$scope.perPage = 8;
	$scope.pages = [];
	$scope.count = 0;
	$scope.curStart = 1;
	$scope.curEnd = 8;
	$scope.prepopulated = false;
	$scope.textSearch = '';
	$scope.listSort = 'newest_first';

	//display vars
	$scope.fromInit = false;

	$scope.showPagesStart = false;
	$scope.showPagesEnd = false;

	$scope.goToPage = function(page){
		$scope.curPage = page;
		$scope.updateSearch(false);
	}

	$scope.updateListSort = function(sort){
		$scope.listSort = sort;
		$scope.updateSearch(true);
	}

	$scope.updateSearch = function(to_page_one){		
		var updatePath = true;
		//when coming to the page, we need to repopulate the search items if there are any in the url
		if ( !$scope.prepopulated && $location.path() != '/' && $location.path() != '' ){
			sections = $location.path().replace(/\//g,'').split("&");
			for ( var i in sections ){
				section = sections[i].split('=');
				sectionTitle = section[0];
				values = section[1].split(",");	

				if ( sectionTitle == 'page' ){
					$scope.curPage = values;
					to_page_one = false;
				}

				$scope[sectionTitle] = values[0];

			}
			updatePath = false;
		}
		$scope.prepopulated = true;

		if ( to_page_one ){
			$scope.curPage = 1;
		}

		var search = {};
		var address="";
		
		if ( $scope.curPage > 1 ){
			address += address!=''?'&':'';
			address += "page="+$scope.curPage;
		}

		if ( $scope.textSearch != '' ){
			address += address!=''?'&':'';
			address += "textSearch="+$scope.textSearch;
			search.textSearch = $scope.textSearch;
			
		}


		if ( $scope.listSort != 'newest_first' ){
			address += address!=''?'&':'';
			address += 'listSort='+$scope.listSort;
		}

		if ( updatePath ){
			$timeout(function(){$location.path(address)});
		}

		
		if ( address != '' ){
			//$("#authorList").ScrollTo();
		}


		$scope.fromInit = false; //reset fromInit

		$("#authorListCurtain").css('opacity','0').show().animate({opacity: .8},500,function(){

			start = $scope.curPage > 1 ? ($scope.perPage*($scope.curPage-1)):0;
			$http.get("/authors/search/?search="+JSON.stringify(search)+"&skip="+start+"&limit="+$scope.perPage+"&sort="+$scope.listSort).success(function(data){
				//pages
				console.log(data);
				$scope.count = data.count;	
				pages = Math.ceil($scope.count/$scope.perPage);
				$scope.pages = [];
				$scope.totalPages = pages;

				if ( pages > 5 ){
					if ( $scope.curPage > 4 ){
						$scope.showPagesStart = true;
					} else {
						$scope.showPagesStart = false;
					}

					for ( var i = -2; i<=2; i++){
						index = parseInt($scope.curPage)+i;
						if ( index > 1 && index <= pages && index < pages ){
							$scope.pages.push(index);
						}
					}

					if ( $scope.curPage < (pages - 3) ){
						$scope.showPagesEnd = true;
					} else {
						$scope.showPagesEnd = false;
					}

				} else {
					$scope.showPagesStart = false;
					$scope.showPagesEnd = false;
					for ( var i = 2; i<=pages-1; i++ ){
						$scope.pages.push(i);
					}
				}

				$scope.curStart = (($scope.curPage-1)*$scope.perPage)+1;
				$scope.curEnd = $scope.perPage+(($scope.curPage-1)*$scope.perPage);
				if ( $scope.curEnd > $scope.count ){
					$scope.curEnd = $scope.count;
				}
				//end pages

				$scope.authors = data.authors;
				$("#authorListCurtain").fadeOut(500);
			})
		});
	};

	$timeout(function(){
		$scope.updateSearch();
	})
});