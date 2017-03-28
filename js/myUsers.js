// JavaScript source code
//如果数据要传输到后台，那么直接将$scope.users里面的数据传入就好，因为页面的数据都是绑定的，所以数据也是动态改变
$('#dialog').dialog({
    title:"用户操作",
    autoOpen: false,
    height: 370,
    width: 500,
    modal: true
});

angular.module('myApp', []).controller('userCtrl', function ($scope) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.passw1 = ''; 
    $scope.passw2 = '';
    $scope.sortAsc = true;
    $scope.sortShow = true;
    $scope.users = [
    { id: 1, fName: '赵', lName: "1" ,content:"忽如一夜春风来"},
    { id: 2, fName: '钱', lName: "2", content: "千树万树梨花开" },
    { id: 3, fName: '孙', lName: "3", content: "天生我材必有用" },
    { id: 4, fName: '李', lName: "4", content: "千金散尽还复来" },
    { id: 5, fName: '周', lName: "5", content: "人生得意须尽欢" },
    { id: 6, fName: '吴', lName: "6", content: "莫使金樽空对月" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

  

    $scope.editUser = function (id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.fName = '';
            $scope.lName = '';
            $scope.content = '';
        } else {
            for (i in $scope.users) {
                if (id == $scope.users[i].id) {
                    $scope.id = id;
                    $scope.edit = false;
                    $scope.fName = $scope.users[i].fName;
                    $scope.lName = $scope.users[i].lName;
                    $scope.content = $scope.users[i].content;
                }
            }
            
        }
        $('#dialog').dialog("open");
    };

    $scope.$watch('passw1', function () { $scope.test(); });
    $scope.$watch('passw2', function () { $scope.test(); });
    $scope.$watch('fName', function () { $scope.test(); });
    $scope.$watch('lName', function () { $scope.test(); });

    $scope.test = function () {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.fName.length ||
        !$scope.lName.length ||
        !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };

    $scope.commit = function () {
        $scope.users.push({
            id: $scope.users.length + 1,
            fName: $scope.fName,
            lName: $scope.lName,
            content: $scope.content
        });
        $('#dialog').dialog("close");
    }

    $scope.update = function () {
        for (i in $scope.users) {
            if (($scope.id - 1) == i) {
                $scope.users[i].content = $scope.content;
            }
        }
        $('#dialog').dialog("close");
    }

    $scope.delete = function (myId) {
        for (i in $scope.users) {
            if (myId == $scope.users[i].id) {
                $scope.users.splice(i, 1);
            }
        }
    }

    $scope.sort = function (index) {
        var name = Object.keys($scope.users[0])[index];
        $scope.users.sort(by(name));
        $scope.sortAsc = !$scope.sortAsc;
        $scope.sortShow = !$scope.sortShow;
    }

    var by = function (name) {
        return function (a, b) {
            if (typeof a === "object" && typeof b === "object" && a && b) {
                if ($scope.sortAsc) {
                    return a[name] > b[name] ? 1 : -1;
                } else {
                    return b[name] > a[name] ? 1 : -1;
                }
            } else {
                return error;
            }
        }
    }
   
});
