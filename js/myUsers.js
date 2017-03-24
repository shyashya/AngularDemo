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
    $scope.users = [
    { id: 1, fName: '赵', lName: "一" ,content:"忽如一夜春风来"},
    { id: 2, fName: '钱', lName: "二", content: "千树万树梨花开" },
    { id: 3, fName: '孙', lName: "三", content: "天生我材必有用" },
    { id: 4, fName: '李', lName: "四", content: "千金散尽还复来" },
    { id: 5, fName: '周', lName: "五", content: "人生得意须尽欢" },
    { id: 6, fName: '吴', lName: "六", content: "莫使金樽空对月" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.title = '编辑';

  

    $scope.editUser = function (id) {
        if (id == 'new') {
            $scope.title = '新建用户';
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.fName = '';
            $scope.lName = '';
            $scope.content = '';
         }else {
            $scope.title = '编辑用户';
            $scope.id = id;
            $scope.edit = false;
            $scope.fName = $scope.users[id - 1].fName;
            $scope.lName = $scope.users[id - 1].lName;
            $scope.content = $scope.users[id - 1].content;
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

});
